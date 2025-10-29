import { NextRequest, NextResponse } from "next/server";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "@/lib/swagger";

// Next.js App Router doesn’t directly support Express, but we can return the JSON spec
export async function GET(req: NextRequest) {
  return NextResponse.json(swaggerSpec);
}
