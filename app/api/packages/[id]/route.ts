import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


/**
 * @swagger
 * /api/packages/{id}:
 *   get:
 *     summary: Get package details by ID
 *     description: Fetch a single package by its unique identifier, including associated products and creator information.
 *     operationId: getPackageById
 *     tags:
 *       - Packages
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Numeric ID of the package to fetch.
 *         schema:
 *           type: integer
 *           example: 2
 *     security:
 *       - bearerAuth: []   # Remove if authentication is not required
 *     responses:
 *       '200':
 *         description: Package fetched successfully
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
 *                   example: "Adventure Starter Pack"
 *                 description:
 *                   type: string
 *                   example: "Includes gear and essentials for new adventurers."
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-10-18T15:32:45.123Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-11-02T10:15:00.000Z"
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 101
 *                       name:
 *                         type: string
 *                         example: "Travel Backpack"
 *                       price:
 *                         type: number
 *                         example: 89.99
 *                 createdBy:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john@example.com"
 *       '400':
 *         description: Invalid package ID provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid Package ID
 *       '404':
 *         description: Package not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Package not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to fetch packages
 */



export async function GET(req: NextRequest , context: { params: Promise<{ id: string }> }) {
  try {
    const {id} = await context.params;

    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return NextResponse.json({ message: "Invalid Package ID" }, { status: 400 });
    }

    const pkg = await prisma.package.findUnique({
      where: { id: numericId },
      include: {
        products: true,
        createdBy: true,
      },
    });
    if (!pkg) {
      return NextResponse.json({ message: "Package not found" }, { status: 404 });
    }
    return NextResponse.json(pkg, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to fetch packages" }, { status: 500 });
  }
}