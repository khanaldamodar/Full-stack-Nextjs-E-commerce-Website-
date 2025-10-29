import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET: Get all brands (public)
export async function GET(req: NextRequest) {
  try {
    const brands = await prisma.brand.findMany({
      include: { products: true }, // optional: include products
    });
    return NextResponse.json(brands);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to fetch brands" }, { status: 500 });
  }
}

// POST: Create a brand (auth required)
export async function POST(req: NextRequest) {
  try {
    const user = requireAuth(req);

    const body = await req.json();
    const { name } = body;

    if (!name) return NextResponse.json({ message: "Name is required" }, { status: 400 });

    const brand = await prisma.brand.create({ data: { name } });
    return NextResponse.json(brand, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message || "Failed to create brand" }, { status: 401 });
  }
}

// PATCH: Update a brand (auth required)
export async function PATCH(req: NextRequest) {
  try {
    const user = requireAuth(req);

    const body = await req.json();
    const { id, name } = body;

    if (!id || !name) return NextResponse.json({ message: "ID and name required" }, { status: 400 });

    const brand = await prisma.brand.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json(brand);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message || "Failed to update brand" }, { status: 401 });
  }
}

// DELETE: Delete a brand (auth required)
export async function DELETE(req: NextRequest) {
  try {
    const user = requireAuth(req);

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ message: "ID is required" }, { status: 400 });

    const brand = await prisma.brand.delete({ where: { id: parseInt(id) } });

    return NextResponse.json({ message: "Brand deleted", brand });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message || "Failed to delete brand" }, { status: 401 });
  }
}
