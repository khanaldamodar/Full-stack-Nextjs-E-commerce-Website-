import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Category fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Electronics"
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Category not found
 *
 *   put:
 *     summary: Update a category by ID
 *     description: Only admins can update a category.
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
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
 *                 example: "Updated Category Name"
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Invalid ID or missing name
 *       401:
 *         description: Unauthorized (invalid token)
 *       403:
 *         description: Forbidden (not admin)
 *
 *   delete:
 *     summary: Delete a category by ID
 *     description: Only admins can delete a category.
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       400:
 *         description: Invalid category ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return NextResponse.json({ message: "Invalid Category ID" }, { status: 400 });
    }

    const category = await prisma.category.findUnique({
      where: { id: numericId },
      include: { products: true },
    });

    if (!category) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (err) {
    console.error("Error fetching category:", err);
    return NextResponse.json(
      { message: "Failed to fetch category" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth(req, ["ADMIN"]);

    const { id } = await context.params;
    const numericId = parseInt(id, 10);
    const body = await req.json();
    const { name } = body;

    if (!name || isNaN(numericId)) {
      return NextResponse.json(
        { message: "Invalid ID or missing name" },
        { status: 400 }
      );
    }

    const category = await prisma.category.update({
      where: { id: numericId },
      data: { name },
    });

    return NextResponse.json(category);
  } catch (err: any) {
    console.error("Error updating category:", err);
    if (err.message === "Unauthorized") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (err.message === "Forbidden") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json(
      { message: "Failed to update category" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth(req, ["ADMIN"]);

    const { id } = await context.params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return NextResponse.json({ message: "Invalid Category ID" }, { status: 400 });
    }

    const deletedCategory = await prisma.category.delete({
      where: { id: numericId },
    });

    return NextResponse.json({
      message: "Category deleted successfully",
      deletedCategory,
    });
  } catch (err: any) {
    console.error("Error deleting category:", err);
    if (err.message === "Unauthorized") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (err.message === "Forbidden") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json(
      { message: "Failed to delete category" },
      { status: 500 }
    );
  }
}
