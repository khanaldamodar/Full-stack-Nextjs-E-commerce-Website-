import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET: Get all packages (public)
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
    return NextResponse.json({ message: "Failed to fetch packages" }, { status: 500 });
  }
}

// POST: Create a package (auth required)
export async function POST(req: NextRequest) {
  try {
    const user = requireAuth(req);

    const body = await req.json();
    const { name, description, price, discount, stock, imageUrl, isFeatured, isActive, productIds } = body;

    if (!name || !price) {
      return NextResponse.json({ message: "Name and price are required" }, { status: 400 });
    }

    // Validate productIds
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

    const pkg = await prisma.package.create({
      data: {
        name,
        description,
        price,
        discount: discount || 0,
        stock: stock || 0,
        imageUrl,
        isFeatured: !!isFeatured,
        isActive: isActive !== undefined ? isActive : true,
        createdById: user.userId,
        products: connectProducts,
      },
      include: { products: true },
    });

    return NextResponse.json(pkg, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message || "Failed to create package" }, { status: 401 });
  }
}

// PATCH: Update a package (auth required)
export async function PATCH(req: NextRequest) {
  try {
    const user = requireAuth(req);

    const body = await req.json();
    const { id, name, description, price, discount, stock, imageUrl, isFeatured, isActive, productIds } = body;

    if (!id) return NextResponse.json({ message: "Package ID is required" }, { status: 400 });

    // Validate productIds
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
        set: [], // remove old relations
        connect: existingProducts.map((p) => ({ id: p.id })),
      };
    }

    const pkg = await prisma.package.update({
      where: { id },
      data: {
        name,
        description,
        price,
        discount,
        stock,
        imageUrl,
        isFeatured,
        isActive,
        products: connectProducts,
      },
      include: { products: true },
    });

    return NextResponse.json(pkg);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message || "Failed to update package" }, { status: 401 });
  }
}

// DELETE: Delete a package (auth required)
export async function DELETE(req: NextRequest) {
  try {
    const user = requireAuth(req);

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ message: "Package ID is required" }, { status: 400 });

    const pkg = await prisma.package.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Package deleted", package: pkg });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message || "Failed to delete package" }, { status: 401 });
  }
}
