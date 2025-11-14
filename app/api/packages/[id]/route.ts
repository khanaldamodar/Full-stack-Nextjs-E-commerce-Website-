import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { uploadFileToCloudinary } from "../../products/route";

/**
 * @swagger
 * /api/packages/{id}:
 *   get:
 *     summary: Get package details by ID
 *     description: Fetch a single package by its ID including products, category, and creator information.
 *     tags:
 *       - Packages
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Numeric ID of the package
 *         schema:
 *           type: integer
 *           example: 3
 *     responses:
 *       200:
 *         description: Package fetched successfully
 *       400:
 *         description: Invalid package ID
 *       404:
 *         description: Package not found
 *       500:
 *         description: Failed to fetch package
 *
 *   put:
 *     summary: Update an existing package
 *     description: Update package fields including name, description, price, stock, category, product list, and image.
 *     tags:
 *       - Packages
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Numeric ID of the package to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Package Name"
 *               description:
 *                 type: string
 *                 example: "This is an updated description."
 *               price:
 *                 type: number
 *                 example: 199.99
 *               discount:
 *                 type: number
 *                 example: 10
 *               stock:
 *                 type: integer
 *                 example: 50
 *               isFeatured:
 *                 type: boolean
 *                 example: true
 *               isActive:
 *                 type: boolean
 *                 example: true
 *               categoryId:
 *                 type: integer
 *                 nullable: true
 *                 example: 2
 *               productIds[]:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 4, 7]
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Package updated successfully
 *       400:
 *         description: Invalid input or category/product errors
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Package not found
 *       500:
 *         description: Failed to update package
 *
 *   delete:
 *     summary: Delete a package by ID
 *     description: Permanently delete a package from the system.
 *     tags:
 *       - Packages
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Numeric ID of the package to delete
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Package deleted successfully
 *       400:
 *         description: Invalid package ID
 *       404:
 *         description: Package not found
 *       500:
 *         description: Failed to delete package
 */

// ✅ GET /api/packages/[id]
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return NextResponse.json({ message: "Invalid Package ID" }, { status: 400 });
    }

    const pkg = await prisma.package.findUnique({
      where: { id: numericId },
      include: {
        products: true,
        createdBy: true,
      },
    });

    if (!pkg) {
      return NextResponse.json({ message: "Package not found" }, { status: 404 });
    }

    return NextResponse.json(pkg, { status: 200 });
  } catch (err) {
    console.error("Error fetching package:", err);
    return NextResponse.json({ message: "Failed to fetch package" }, { status: 500 });
  }
}


export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = requireAuth(req);
    const { id } = await context.params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return NextResponse.json(
        { message: "Invalid Package ID" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    // Extract fields
    const name = formData.get("name") as string | null;
    const description = formData.get("description") as string | null;
    const price = formData.get("price") ? Number(formData.get("price")) : null;
    const discount = formData.get("discount")
      ? Number(formData.get("discount"))
      : null;
    const stock = formData.get("stock")
      ? Number(formData.get("stock"))
      : null;
    const isFeatured =
      formData.get("isFeatured") !== null
        ? formData.get("isFeatured") === "true"
        : null;
    const isActive =
      formData.get("isActive") !== null
        ? formData.get("isActive") === "true"
        : null;

    const categoryIdRaw = formData.get("categoryId");
    const categoryId =
      categoryIdRaw && categoryIdRaw !== "null" && categoryIdRaw !== ""
        ? Number(categoryIdRaw)
        : null;

    const imageFile = formData.get("image") as File | null;

    const productIdsRaw = formData.getAll("productIds[]");
    const productIds =
      productIdsRaw.length > 0
        ? productIdsRaw.map((id) => Number(id))
        : null;

    // Ensure package exists
    const existingPackage = await prisma.package.findUnique({
      where: { id: numericId },
    });

    if (!existingPackage) {
      return NextResponse.json(
        { message: "Package not found" },
        { status: 404 }
      );
    }

    // Validate category
    if (categoryId !== null) {
      const categoryExists = await prisma.category.findUnique({
        where: { id: categoryId },
      });

      if (!categoryExists) {
        return NextResponse.json(
          { message: "Invalid categoryId — category does not exist" },
          { status: 400 }
        );
      }
    }

    // Validate products
    let connectProducts: any = undefined;
    if (productIds) {
      const existingProducts = await prisma.product.findMany({
        where: { id: { in: productIds } },
      });

      if (existingProducts.length !== productIds.length) {
        return NextResponse.json(
          { message: "One or more productIds are invalid" },
          { status: 400 }
        );
      }

      connectProducts = {
        set: [], // clear old
        connect: existingProducts.map((p) => ({ id: p.id })),
      };
    }

    // Upload new image if provided
    let imageUrl = existingPackage.imageUrl;
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadFileToCloudinary(imageFile, "packages");
    }

    // Update package
    const updatedPackage = await prisma.package.update({
      where: { id: numericId },
      data: {
        name: name ?? undefined,
        description: description ?? undefined,
        price: price ?? undefined,
        discount: discount ?? undefined,
        stock: stock ?? undefined,
        isFeatured: isFeatured ?? undefined,
        isActive: isActive ?? undefined,
        categoryId,
        imageUrl,
        products: connectProducts,
      },
      include: {
        products: true,
        createdBy: true,
      },
    });

    return NextResponse.json(
      {
        message: "Package updated successfully",
        package: updatedPackage,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("PUT /api/packages error:", err);
    return NextResponse.json(
      { message: "Failed to update package" },
      { status: 500 }
    );
  }
}


// ✅ DELETE /api/packages/[id]
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return NextResponse.json({ message: "Invalid Package ID" }, { status: 400 });
    }

    const existingPackage = await prisma.package.findUnique({
      where: { id: numericId },
    });

    if (!existingPackage) {
      return NextResponse.json({ message: "Package not found" }, { status: 404 });
    }

    // Delete the package (if product relationships exist, they’ll be handled by Prisma)
    await prisma.package.delete({ where: { id: numericId } });

    return NextResponse.json({ message: "Package deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("Error deleting package:", err);
    return NextResponse.json({ message: "Failed to delete package" }, { status: 500 });
  }
}
