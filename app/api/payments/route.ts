import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET: fetch payments
/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Get all payments
 *     tags:
 *       - Payments
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of payments. Admin sees all payments; regular users see only their own payments.
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
 *                   amount:
 *                     type: number
 *                     example: 500
 *                   method:
 *                     type: string
 *                     example: "ONLINE"
 *                   status:
 *                     type: string
 *                     example: "SUCCESS"
 *                   transactionId:
 *                     type: string
 *                     example: "TX123456"
 *                   paymentData:
 *                     type: object
 *                   order:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       total:
 *                         type: number
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *
 *   post:
 *     summary: Create a new payment
 *     tags:
 *       - Payments
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [orderId, amount, method]
 *             properties:
 *               orderId:
 *                 type: integer
 *                 example: 1
 *               amount:
 *                 type: number
 *                 example: 500
 *               method:
 *                 type: string
 *                 example: "ONLINE"
 *               transactionId:
 *                 type: string
 *                 example: "TX123456"
 *               paymentData:
 *                 type: object
 *                 description: Optional extra payment data
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       400:
 *         description: Validation error or missing fields
 *       403:
 *         description: Forbidden (non-admin paying someone else's order)
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 *
 *   patch:
 *     summary: Update a payment (ADMIN only)
 *     tags:
 *       - Payments
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id]
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               status:
 *                 type: string
 *                 example: "FAILED"
 *               method:
 *                 type: string
 *                 example: "COD"
 *               transactionId:
 *                 type: string
 *                 example: "TX654321"
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *       400:
 *         description: Payment ID required
 *       403:
 *         description: Forbidden (non-admin)
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Delete a payment (ADMIN only)
 *     tags:
 *       - Payments
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Payment ID to delete
 *     responses:
 *       200:
 *         description: Payment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Payment deleted"
 *       400:
 *         description: Payment ID required
 *       403:
 *         description: Forbidden (non-admin)
 *       500:
 *         description: Server error
 */

export async function GET(req: NextRequest) {
  try {
    const user = requireAuth(req); // Admin or user
    let payments;

    if (user.role === "ADMIN") {
      // Admin can see all payments
      payments = await prisma.payment.findMany({
        include: { order: true, user: true },
      });
    } else {
      // Regular user sees only their payments
      payments = await prisma.payment.findMany({
        where: { userId: user.userId },
        include: { order: true },
      });
    }

    return NextResponse.json(payments);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

// POST: create payment
export async function POST(req: NextRequest) {
  try {
    const user = requireAuth(req);
    const body = await req.json();
    const { orderId, amount, method, transactionId, paymentData } = body;

    if (!orderId || !amount || !method) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) return NextResponse.json({ message: "Order not found" }, { status: 404 });

    // Optional: Only allow user to pay for their own order unless ADMIN
    if (user.role !== "ADMIN" && order.userId !== user.userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const payment = await prisma.payment.create({
      data: {
        orderId,
        userId: user.userId,
        amount,
        method,
        transactionId,
        paymentData,
      },
      include: { order: true, user: true },
    });

    // Update order payment status if successful
    if (method === "ONLINE") {
      await prisma.order.update({
        where: { id: orderId },
        data: { paymentStatus: "SUCCESS" },
      });
    }

    return NextResponse.json(payment, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to create payment" }, { status: 500 });
  }
}

// PATCH: update payment (ADMIN only)
export async function PATCH(req: NextRequest) {
  try {
    const user = requireAuth(req);
    if (user.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { id, status, method, transactionId } = body;
    if (!id) return NextResponse.json({ message: "Payment ID required" }, { status: 400 });

    const payment = await prisma.payment.update({
      where: { id },
      data: { status, method, transactionId },
      include: { order: true, user: true },
    });

    return NextResponse.json(payment);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to update payment" }, { status: 500 });
  }
}

// DELETE: delete payment (ADMIN only)
export async function DELETE(req: NextRequest) {
  try {
    const user = requireAuth(req);
    if (user.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ message: "Payment ID required" }, { status: 400 });

    await prisma.payment.delete({ where: { id: parseInt(id) } });

    return NextResponse.json({ message: "Payment deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to delete payment" }, { status: 500 });
  }
}
