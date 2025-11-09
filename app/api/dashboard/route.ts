import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Fetch overall dashboard statistics
 *     description: Returns total counts of products, packages, categories, brands, orders, and payments in the system.
 *     tags:
 *       - Dashboard
 *     responses:
 *       200:
 *         description: Dashboard data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Message:
 *                   type: string
 *                   example: Dashboard Details Fetched
 *                 totalProducts:
 *                   type: integer
 *                   example: 120
 *                 totalPackages:
 *                   type: integer
 *                   example: 35
 *                 totalCategories:
 *                   type: integer
 *                   example: 12
 *                 totalBrands:
 *                   type: integer
 *                   example: 8
 *                 totalOrders:
 *                   type: integer
 *                   example: 250
 *                 totalPayments:
 *                   type: integer
 *                   example: 230
 *       500:
 *         description: Failed to fetch the dashboard data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Message:
 *                   type: string
 *                   example: Failed to Fetch the Dashboard Data
 */

export async function GET() {
  try {
    const productCount = await prisma.product.count();
    const packageCount = await prisma.package.count();
    const categoriesCount = await prisma.category.count();
    const brandsCount = await prisma.brand.count();
    const orderCount = await prisma.order.count();
    const paymentCount = await prisma.payment.count();

    return NextResponse.json(
      {
        Message: "Dashboard Details Fetched",
        totalProducts: productCount,
        totalPackages: packageCount,
        totalCategories: categoriesCount,
        totalBrands: brandsCount,
        totalOrders: orderCount,
        totalPayments: paymentCount,
      },
      { status: 200 }
    );
  } catch (ex) {
    NextResponse.json(
      {
        Message: "Failed to Fetch the Dashobard Data",
      },
      { status: 500 }
    );
  }
}
