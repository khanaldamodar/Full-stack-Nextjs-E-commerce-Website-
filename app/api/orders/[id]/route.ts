import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order details by ID
 *     description: Fetch a single order by its unique identifier, including user information, order items (with product details), and payment records. Requires ADMIN role.
 *     operationId: getOrderById
 *     tags:
 *       - Orders
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Numeric ID of the order to fetch.
 *         schema:
 *           type: integer
 *           example: 12
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Order fetched successfully
 *       '401':
 *         description: Unauthorized - user not logged in
 *       '403':
 *         description: Forbidden - user lacks required role
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Server error
 */


export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ Require authentication and role check
    const user = await requireAuth(req, ["ADMIN"]);

    // If `requireAuth` returns null or throws for unauthorized, handle it here
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // (Optional) if requireAuth doesn’t throw but returns user with roles:
    if (!user.role?.includes("ADMIN")) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // ✅ Await context.params for Next.js 15+
    const { id } = await context.params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return NextResponse.json({ message: "Invalid Order ID" }, { status: 400 });
    }

    // ✅ Fetch order with related entities
    const order = await prisma.order.findUnique({
      where: { id: numericId },
      include: {
        user: true,
        items: { include: { product: true } },
        payments: true,
      },
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (err: any) {
    // If your requireAuth throws on invalid token, handle it cleanly
    if (err.message === "Unauthorized") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (err.message === "Forbidden") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    console.error("Error fetching order:", err);
    return NextResponse.json(
      { message: "Failed to fetch order" },
      { status: 500 }
    );
  }
}
