import { requireAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth(req, ["ADMIN"]);
    const { id } = await context.params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return NextResponse.json(
        { message: "Invalid Certificate ID" },
        { status: 400 }
      );
    }

    const deletedcerts = await prisma.certificates.delete({
      where: { id: numericId },
    });

    return NextResponse.json({
      message: "Certificate deleted successfully",
      deletedcerts,
    });
  } catch (err) {
    return NextResponse.json(
      {
        Message: "Failed to Delete Customer Certificate",
        error: err,
      },
      { status: 500 }
    );
  }
}
