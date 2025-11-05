import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

/**
 * @swagger
 * /api/payments/{id}:
 *   get:
 *     summary: Get payment details by ID
 *     description: Fetch a single payment by its ID. Only users with the `ADMIN` role can access this endpoint.
 *     operationId: getPaymentById
 *     tags:
 *       - Payments
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Numeric ID of the payment to fetch.
 *         schema:
 *           type: integer
 *           example: 7
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Payment fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 7
 *                 amount:
 *                   type: number
 *                   example: 249.99
 *                 method:
 *                   type: string
 *                   example: "Credit Card"
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-10-29T13:23:00.000Z"
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 12
 *                     totalAmount:
 *                       type: number
 *                       example: 249.99
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 5
 *                     name:
 *                       type: string
 *                       example: "Alice Johnson"
 *                     email:
 *                       type: string
 *                       example: "alice@example.com"
 *       '401':
 *         description: Unauthorized - user is not admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       '404':
 *         description: Payment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Payment not found"
 */

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = requireAuth(req); // Admin or user
    const { id } = await context.params;
    let payments;

    if (user.role === "ADMIN") {
      // Admin can see all payments
      payments = await prisma.payment.findUnique({
        where: { id: parseInt(id, 10) },
        include: { order: true, user: true },
      });

      if (!payments) {
        return NextResponse.json(
          { message: "Payment not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(payments);
    }

    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

/**
 * @swagger
 * /api/payments/{id}:
 *   put:
 *     summary: Update payment details by ID
 *     description: Only ADMIN users can update a payment record.
 *     operationId: updatePayment
 *     tags:
 *       - Payments
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Numeric ID of the payment to update.
 *         schema:
 *           type: integer
 *           example: 7
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 299.99
 *               method:
 *                 type: string
 *                 example: "Debit Card"
 *               status:
 *                 type: string
 *                 example: "success"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Payment not found
 */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = requireAuth(req);
    const { id } = await context.params;

    if (user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    const existingPayment = await prisma.payment.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!existingPayment) {
      return NextResponse.json({ message: "Payment not found" }, { status: 404 });
    }

    const updatedPayment = await prisma.payment.update({
      where: { id: parseInt(id, 10) },
      data: {
        amount: data.amount ?? existingPayment.amount,
        method: data.method ?? existingPayment.method,
        status: data.status ?? existingPayment.status,
      },
      include: { order: true, user: true },
    });

    return NextResponse.json(
      { message: "Payment updated successfully", payment: updatedPayment },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/payments/{id}:
 *   delete:
 *     summary: Delete a payment by ID
 *     description: Only ADMIN users can delete a payment record.
 *     operationId: deletePayment
 *     tags:
 *       - Payments
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Numeric ID of the payment to delete.
 *         schema:
 *           type: integer
 *           example: 7
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Payment deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Payment not found
 */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = requireAuth(req);
    const { id } = await context.params;

    if (user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const existingPayment = await prisma.payment.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!existingPayment) {
      return NextResponse.json({ message: "Payment not found" }, { status: 404 });
    }

    await prisma.payment.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json(
      { message: "Payment deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

