import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

/**
 * @swagger
 * tags:
 *   - name: Brands
 *
 * /api/brands:
 *   get:
 *     summary: Get all brands
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: List of all brands
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
 *                     example: "Apple"
 *                   products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 12
 *                         name:
 *                           type: string
 *                           example: "iPhone 15"
 *
 *   post:
 *     summary: Create a new brand
 *     description: Only admins can create a brand.
 *     security:
 *       - BearerAuth: []
 *     tags: [Brands]
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
 *                 example: "Samsung"
 *     responses:
 *       201:
 *         description: Brand created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 2
 *                 name:
 *                   type: string
 *                   example: "Samsung"
 *       400:
 *         description: Invalid input (missing name)
 *       401:
 *         description: Unauthorized (token missing or invalid)
 *       403:
 *         description: Forbidden (not an admin)
 */

// ✅ GET /api/brands
export async function GET(req: NextRequest) {
  try {
    const brands = await prisma.brand.findMany({
      include: { products: true },
    });
    return NextResponse.json(brands);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch brands" },
      { status: 500 }
    );
  }
}

// ✅ POST /api/brands
export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth(req, ["ADMIN"]);

    const body = await req.json();
    const { name } = body;

    if (!name)
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );

    const brand = await prisma.brand.create({ data: { name } });
    return NextResponse.json(brand, { status: 201 });
  } catch (err: any) {
    console.error(err);
    if (err.message === "Unauthorized") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (err.message === "Forbidden") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json(
      { message: err.message || "Failed to create brand" },
      { status: 500 }
    );
  }
}
