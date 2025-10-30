import { getApiDocs } from "@/lib/swagger";
import { NextRequest, NextResponse } from "next/server";
import swaggerUi from "swagger-ui-express";


// Next.js App Router doesn’t directly support Express, but we can return the JSON spec
export async function GET(req: NextRequest) {
  const spec = await getApiDocs();
  return NextResponse.json(spec);
}
