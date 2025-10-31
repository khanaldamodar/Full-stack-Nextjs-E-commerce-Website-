import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET: Get all products (public)

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: List of all products with their category, brand, and packages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "iPhone 15"
 *                   description:
 *                     type: string
 *                     example: "Latest Apple iPhone"
 *                   price:
 *                     type: number
 *                     example: 1200
 *                   stock:
 *                     type: integer
 *                     example: 50
 *                   sku:
 *                     type: string
 *                     example: "IP15-128GB"
 *                   weight:
 *                     type: number
 *                     example: 0.2
 *                   imageUrl:
 *                     type: string
 *                     example: "https://example.com/product.jpg"
 *                   gallery:
 *                     type: array
 *                     items:
 *                       type: string
 *                   isFeatured:
 *                     type: boolean
 *                     example: true
 *                   isActive:
 *                     type: boolean
 *                     example: true
 *                   category:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                   brand:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                   packages:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         name:
 *                           type: string
 *
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Samsung Galaxy S23"
 *               description:
 *                 type: string
 *                 example: "Latest Samsung flagship phone"
 *               price:
 *                 type: number
 *                 example: 999
 *               stock:
 *                 type: integer
 *                 example: 100
 *               sku:
 *                 type: string
 *                 example: "SGS23-256GB"
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *               brandId:
 *                 type: integer
 *                 example: 1
 *               weight:
 *                 type: number
 *                 example: 0.25
 *               imageUrl:
 *                 type: string
 *                 example: "https://example.com/sgs23.jpg"
 *               gallery:
 *                 type: array
 *                 items:
 *                   type: string
 *               isFeatured:
 *                 type: boolean
 *                 example: true
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Name and price are required
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *
 *   patch:
 *     summary: Update an existing product
 *     tags:
 *       - Products
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id]
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               sku:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *               brandId:
 *                 type: integer
 *               weight:
 *                 type: number
 *               imageUrl:
 *                 type: string
 *               gallery:
 *                 type: array
 *                 items:
 *                   type: string
 *               isFeatured:
 *                 type: boolean
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Product ID is required
 *       401:
 *         description: Unauthorized
 *
 *   delete:
 *     summary: Delete a product
 *     tags:
 *       - Products
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       400:
 *         description: Product ID is required
 *       401:
 *         description: Unauthorized
 */

export async function GET(req: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        brand: true,
        packages: true,
      },
    });
    return NextResponse.json(products);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 });
  }
}

// POST: Create a product (auth required)
export async function POST(req: NextRequest) {
  try {
    const user = requireAuth(req);

    const body = await req.json();
    const {
      name,
      description,
      price,
      stock,
      sku,
      categoryId,
      brandId,
      weight,
      imageUrl,
      gallery,
      isFeatured,
      isActive,
    } = body;

    if (!name || !price) return NextResponse.json({ message: "Name and price are required" }, { status: 400 });

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock: stock || 0,
        sku,
        categoryId,
        brandId,
        weight,
        imageUrl,
        gallery,
        isFeatured: !!isFeatured,
        isActive: isActive !== undefined ? isActive : true,
        createdById: user.userId,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message || "Failed to create product" }, { status: 401 });
  }
}

// PATCH: Update a product (auth required)
export async function PATCH(req: NextRequest) {
  try {
    const user = requireAuth(req);

    const body = await req.json();
    const {
      id,
      name,
      description,
      price,
      stock,
      sku,
      categoryId,
      brandId,
      weight,
      imageUrl,
      gallery,
      isFeatured,
      isActive,
    } = body;

    if (!id) return NextResponse.json({ message: "Product ID is required" }, { status: 400 });

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        stock,
        sku,
        categoryId,
        brandId,
        weight,
        imageUrl,
        gallery,
        isFeatured,
        isActive,
      },
    });

    return NextResponse.json(product);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message || "Failed to update product" }, { status: 401 });
  }
}

// DELETE: Delete a product (auth required)
export async function DELETE(req: NextRequest) {
  try {
    const user = requireAuth(req);

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ message: "Product ID is required" }, { status: 400 });

    const product = await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Product deleted", product });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message || "Failed to delete product" }, { status: 401 });
  }
}
