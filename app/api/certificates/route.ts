import { NextResponse } from "next/server";


export async function GET() {
  try {
 
  } catch (err) {
    NextResponse.json(
      {message: "Failed to Fetch the Certificates"},
      { status: 500 }
    );
  }
}
