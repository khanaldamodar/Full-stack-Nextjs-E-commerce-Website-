import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET: Get all products (public)
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
