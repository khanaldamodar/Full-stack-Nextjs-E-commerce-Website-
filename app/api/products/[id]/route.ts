import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product details by ID
 *     description: Fetch a single product by its unique identifier. The response includes related category, brand, and package information.
 *     operationId: getProductById
 *     tags:
 *       - Products
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Numeric ID of the product to fetch.
 *         schema:
 *           type: integer
 *           example: 123
 *     security:
 *       - bearerAuth: []   # Only if authentication is required
 *     responses:
 *       '200':
 *         description: Product fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product fetched successfully
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 123
 *                     name:
 *                       type: string
 *                       example: "Travel Backpack"
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 79.99
 *                     category:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 5
 *                         name:
 *                           type: string
 *                           example: "Luggage"
 *                     brand:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 3
 *                         name:
 *                           type: string
 *                           example: "GoWorld"
 *                     packages:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 22
 *                           name:
 *                             type: string
 *                             example: "Holiday Combo"
 *                           price:
 *                             type: number
 *                             example: 199.99
 *       '404':
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product not found
 *       '500':
 *         description: Server error when fetching product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to fetch product
 */






export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ Unwrap the params properly (new Next.js 15+ syntax)
    const { id } = await context.params;

    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id: numericId },
      include: {
        category: true,
        brand: true,
        packages: true,
      },
    });

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Product fetched successfully", product },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching product:", err);
    return NextResponse.json({ message: "Failed to fetch product" }, { status: 500 });
  }
}



