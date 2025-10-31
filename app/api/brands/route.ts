import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const brands = await prisma.brand.findMany({
      include: { products: true }, // optional: include products
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

// POST: Create a brand (auth required)
/**
 * @swagger
 * /api/brands:
 *   get:
 *     summary: Get all brands
 *     tags:
 *       - Brands
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
 *                         name:
 *                           type: string
 *
 *   post:
 *     summary: Create a new brand
 *     tags:
 *       - Brands
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
 *
 *   patch:
 *     summary: Update a brand
 *     tags:
 *       - Brands
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id, name]
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: "Updated Brand Name"
 *     responses:
 *       200:
 *         description: Brand updated successfully
 *       400:
 *         description: Missing ID or name
 *       401:
 *         description: Unauthorized
 *
 *   delete:
 *     summary: Delete a brand
 *     tags:
 *       - Brands
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID of the brand to delete
 *     responses:
 *       200:
 *         description: Brand deleted successfully
 *       400:
 *         description: ID is required
 *       401:
 *         description: Unauthorized
 */

export async function POST(req: NextRequest) {
  try {
    const user = requireAuth(req);

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
    return NextResponse.json(
      { message: err.message || "Failed to create brand" },
      { status: 401 }
    );
  }
}

// PATCH: Update a brand (auth required)
export async function PATCH(req: NextRequest) {
  try {
    const user = requireAuth(req);

    const body = await req.json();
    const { id, name } = body;

    if (!id || !name)
      return NextResponse.json(
        { message: "ID and name required" },
        { status: 400 }
      );

    const brand = await prisma.brand.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json(brand);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: err.message || "Failed to update brand" },
      { status: 401 }
    );
  }
}

// DELETE: Delete a brand (auth required)
export async function DELETE(req: NextRequest) {
  try {
    const user = requireAuth(req);

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({ message: "ID is required" }, { status: 400 });

    const brand = await prisma.brand.delete({ where: { id: parseInt(id) } });

    return NextResponse.json({ message: "Brand deleted", brand });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: err.message || "Failed to delete brand" },
      { status: 401 }
    );
  }
}
