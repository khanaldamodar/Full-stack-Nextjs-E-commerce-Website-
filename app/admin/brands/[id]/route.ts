import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    const deletedBrand = await prisma.brand.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, deletedBrand });
  } catch (error) {
    console.error("Error deleting brand:", error);
    return NextResponse.json(
      { message: "Failed to delete brand", error: String(error) },
      { status: 500 }
    );
  }
}
