import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET: Get all categories (no auth)
export async function GET(req: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      include: { products: true },
    });
    return NextResponse.json(categories);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to fetch categories" }, { status: 500 });
  }
}

// POST: Create a new category (auth required)
export async function POST(req: NextRequest) {
  try {
    const user = requireAuth(req); // throws if unauthorized

    const body = await req.json();
    const { name } = body;

    if (!name) return NextResponse.json({ message: "Name is required" }, { status: 400 });

    const category = await prisma.category.create({ data: { name } });

    return NextResponse.json(category, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message || "Failed to create category" }, { status: 401 });
  }
}

// PATCH: Update a category (auth required)
export async function PATCH(req: NextRequest) {
  try {
    const user = requireAuth(req); // throws if unauthorized

    const body = await req.json();
    const { id, name } = body;

    if (!id || !name) return NextResponse.json({ message: "ID and name required" }, { status: 400 });

    const category = await prisma.category.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json(category);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message || "Failed to update category" }, { status: 401 });
  }
}

// DELETE: Delete a category (auth required)
export async function DELETE(req: NextRequest) {
  try {
    const user = requireAuth(req); // throws if unauthorized

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ message: "ID is required" }, { status: 400 });

    const category = await prisma.category.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Category deleted", category });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message || "Failed to delete category" }, { status: 401 });
  }
}
