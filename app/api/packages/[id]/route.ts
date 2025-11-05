import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * @swagger
 * /api/packages/{id}:
 *   get:
 *     summary: Get package details by ID
 *     description: Fetch a single package by its unique identifier, including associated products and creator information.
 *     operationId: getPackageById
 *     tags:
 *       - Packages
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Numeric ID of the package to fetch.
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       '200':
 *         description: Package fetched successfully
 *       '400':
 *         description: Invalid package ID provided
 *       '404':
 *         description: Package not found
 *       '500':
 *         description: Internal server error
 *
 *   put:
 *     summary: Update an existing package
 *     description: Update package name, description, or associated products.
 *     operationId: updatePackage
 *     tags:
 *       - Packages
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Numeric ID of the package to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Adventure Pack"
 *               description:
 *                 type: string
 *                 example: "Updated description for adventure items."
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   example: 5
 *     responses:
 *       '200':
 *         description: Package updated successfully
 *       '400':
 *         description: Invalid input or Package ID
 *       '404':
 *         description: Package not found
 *       '500':
 *         description: Failed to update package
 *
 *   delete:
 *     summary: Delete a package by ID
 *     description: Permanently remove a package and its associations.
 *     operationId: deletePackage
 *     tags:
 *       - Packages
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Numeric ID of the package to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Package deleted successfully
 *       '400':
 *         description: Invalid Package ID
 *       '404':
 *         description: Package not found
 *       '500':
 *         description: Internal server error
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

// ✅ PUT /api/packages/[id]
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return NextResponse.json({ message: "Invalid Package ID" }, { status: 400 });
    }

    const body = await req.json();
    const { name, description, productIds } = body;

    const existingPackage = await prisma.package.findUnique({
      where: { id: numericId },
    });

    if (!existingPackage) {
      return NextResponse.json({ message: "Package not found" }, { status: 404 });
    }

    const updatedPackage = await prisma.package.update({
      where: { id: numericId },
      data: {
        name: name ?? existingPackage.name,
        description: description ?? existingPackage.description,
        products: productIds
          ? {
              set: [], // remove all existing
              connect: productIds.map((pid: number) => ({ id: pid })),
            }
          : undefined,
      },
      include: {
        products: true,
        createdBy: true,
      },
    });

    return NextResponse.json(
      { message: "Package updated successfully", package: updatedPackage },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating package:", err);
    return NextResponse.json({ message: "Failed to update package" }, { status: 500 });
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
