import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

/**
 * @swagger
 * /api/packages:
 *   get:
 *     summary: Get all packages
 *     tags:
 *       - Packages
 *     responses:
 *       200:
 *         description: List of all packages with their products and creator
 *
 *   post:
 *     summary: Create a new package
 *     tags:
 *       - Packages
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, price]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               discount:
 *                 type: number
 *               stock:
 *                 type: integer
 *               isFeatured:
 *                 type: boolean
 *               isActive:
 *                 type: boolean
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Package created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

// ✅ GET all packages
export async function GET(req: NextRequest) {
  try {
    const packages = await prisma.package.findMany({
      include: {
        products: true,
        createdBy: true,
      },
    });
    return NextResponse.json(packages);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch packages" },
      { status: 500 }
    );
  }
}

// ✅ POST: Create a new package (with Cloudinary image upload)
export async function POST(req: NextRequest) {
  try {
    const user = requireAuth(req);
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const discount = Number(formData.get("discount") || 0);
    const stock = Number(formData.get("stock") || 0);
    const isFeatured = formData.get("isFeatured") === "true";
    const isActive = formData.get("isActive") !== "false";
    const imageFile = formData.get("image") as File | null;
    const productIds = formData.getAll("productIds[]").map((id) => Number(id));

    if (!name || !price) {
      return NextResponse.json(
        { message: "Name and price are required" },
        { status: 400 }
      );
    }

    // 🔹 Upload image to Cloudinary
    let imageUrl: string | null = null;
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadFileToCloudinary(imageFile, "packages");
    }

    // 🔹 Validate product IDs
    let connectProducts = undefined;
    if (productIds && productIds.length > 0) {
      const existingProducts = await prisma.product.findMany({
        where: { id: { in: productIds } },
      });

      if (existingProducts.length !== productIds.length) {
        return NextResponse.json(
          { message: "One or more products do not exist" },
          { status: 400 }
        );
      }

      connectProducts = {
        connect: existingProducts.map((p) => ({ id: p.id })),
      };
    }

    // 🔹 Create package
    const pkg = await prisma.package.create({
      data: {
        name,
        description,
        price,
        discount,
        stock,
        imageUrl,
        isFeatured,
        isActive,
        createdById: user.userId,
        products: connectProducts,
      },
      include: { products: true },
    });

    return NextResponse.json(pkg, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/packages error:", err);
    return NextResponse.json(
      { message: err.message || "Failed to create package" },
      { status: 500 }
    );
  }
}

// ✅ Helper function to upload file to Cloudinary
async function uploadFileToCloudinary(
  file: File,
  folder: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result!.secure_url);
      }
    );

    file
      .arrayBuffer()
      .then((buffer) => uploadStream.end(Buffer.from(buffer)))
      .catch(reject);
  });
}
