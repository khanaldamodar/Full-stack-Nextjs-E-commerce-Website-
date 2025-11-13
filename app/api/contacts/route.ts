import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// To get the Contacts of the website
export async function GET() {
  try {
    const contacts = await prisma.contacts.findMany();
    if (contacts.length === 0) {
      return NextResponse.json(
        {
          Message: "No Contacts Found!",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Contacts Fetched SucessFully",
        contacts: contacts,
      },
      { status: 200 }
    );
  } catch (ex) {
    return NextResponse.json(
      {
        Message: "Failed to fetch the data",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await  req.json();
    const {name, phone, message} = body;

    if(!phone){
        return NextResponse.json({"Message": "Phone Number is required"}, {status: 400})
    }
     const contact = await prisma.contacts.create({
      data: {
        name,
        phone,
        message,
      },
    });

    return NextResponse.json({
        "message": "Submitted Successfully!!",
        "contact": contact
    },
    {status: 202})


  } catch (ex) {
    return NextResponse.json(
      {
        Message: "Failed to submit, Try again Later!",
      },
      { status: 500 }
    );
  }
}
