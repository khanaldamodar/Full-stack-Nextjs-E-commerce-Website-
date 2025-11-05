import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET: Get all packages (public)
/**
 * @swagger
 * /api/packages:
 *   get:
 *     summary: Get all packages
 *     tags:
 *       - Packages
 *     responses:
 *       200:
 *         description: List of all packages with their products and creator
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
 *                     example: "Starter Pack"
 *                   description:
 *                     type: string
 *                     example: "A basic starter package"
 *                   price:
 *                     type: number
 *                     example: 100
 *                   discount:
 *                     type: number
 *                     example: 10
 *                   stock:
 *                     type: integer
 *                     example: 50
 *                   imageUrl:
 *                     type: string
 *                     example: "https://example.com/package.jpg"
 *                   isFeatured:
 *                     type: boolean
 *                     example: true
 *                   isActive:
 *                     type: boolean
 *                     example: true
 *                   createdBy:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
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
 *     summary: Create a new package
 *     tags:
 *       - Packages
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
 *                 example: "Pro Pack"
 *               description:
 *                 type: string
 *                 example: "Advanced package with premium products"
 *               price:
 *                 type: number
 *                 example: 200
 *               discount:
 *                 type: number
 *                 example: 20
 *               stock:
 *                 type: integer
 *                 example: 30
 *               imageUrl:
 *                 type: string
 *                 example: "https://example.com/pro-pack.jpg"
 *               isFeatured:
 *                 type: boolean
 *                 example: true
 *               isActive:
 *                 type: boolean
 *                 example: true
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1,2,3]
 *     responses:
 *       201:
 *         description: Package created successfully
 *       400:
 *         description: Name and price required or invalid product IDs
 *       401:
 *         description: Unauthorized
 *
 */

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

// // PATCH: Update a package (auth required)
// export async function PATCH(req: NextRequest) {
//   try {
//     const user = requireAuth(req);

//     const body = await req.json();
//     const { id, name, description, price, discount, stock, imageUrl, isFeatured, isActive, productIds } = body;

//     if (!id) return NextResponse.json({ message: "Package ID is required" }, { status: 400 });

//     // Validate productIds
//     let connectProducts = undefined;
//     if (productIds && productIds.length > 0) {
//       const existingProducts = await prisma.product.findMany({
//         where: { id: { in: productIds } },
//       });

//       if (existingProducts.length !== productIds.length) {
//         return NextResponse.json(
//           { message: "One or more products do not exist" },
//           { status: 400 }
//         );
//       }

//       connectProducts = {
//         set: [], // remove old relations
//         connect: existingProducts.map((p) => ({ id: p.id })),
//       };
//     }

//     const pkg = await prisma.package.update({
//       where: { id },
//       data: {
//         name,
//         description,
//         price,
//         discount,
//         stock,
//         imageUrl,
//         isFeatured,
//         isActive,
//         products: connectProducts,
//       },
//       include: { products: true },
//     });

//     return NextResponse.json(pkg);
//   } catch (err: any) {
//     console.error(err);
//     return NextResponse.json({ message: err.message || "Failed to update package" }, { status: 401 });
//   }
// }

// // DELETE: Delete a package (auth required)
// export async function DELETE(req: NextRequest) {
//   try {
//     const user = requireAuth(req);

//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");

//     if (!id) return NextResponse.json({ message: "Package ID is required" }, { status: 400 });

//     const pkg = await prisma.package.delete({
//       where: { id: parseInt(id) },
//     });

//     return NextResponse.json({ message: "Package deleted", package: pkg });
//   } catch (err: any) {
//     console.error(err);
//     return NextResponse.json({ message: err.message || "Failed to delete package" }, { status: 401 });
//   }
// }
