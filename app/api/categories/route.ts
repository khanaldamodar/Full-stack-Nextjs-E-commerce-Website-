import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: API for managing product categories
 *
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of all categories with products
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
 *                     example: "Electronics"
 *                   products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 5
 *                         name:
 *                           type: string
 *                           example: "Smartphone"
 *
 *   post:
 *     summary: Create a new category
 *     description: Only admins can create a category.
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Furniture"
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Missing name
 *       401:
 *         description: Unauthorized (invalid token)
 *       403:
 *         description: Forbidden (not admin)
 */

export async function GET(req: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      include: { products: true },
    });
    return NextResponse.json(categories);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth(req, ["ADMIN"]);

    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({ data: { name } });
    return NextResponse.json(category, { status: 201 });
  } catch (err: any) {
    console.error(err);
    if (err.message === "Unauthorized") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (err.message === "Forbidden") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json(
      { message: err.message || "Failed to create category" },
      { status: 500 }
    );
  }
}
