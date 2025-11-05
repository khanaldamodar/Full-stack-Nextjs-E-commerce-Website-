import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import cloudinary from "@/lib/cloudinary"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * @swagger
 * /api/gallery:
 *   get:
 *     summary: Get all gallery items
 *     tags:
 *       - Gallery
 *     responses:
 *       200:
 *         description: List of gallery items
 */
export async function GET() {
  try {
    const galleries = await prisma.gallery.findMany({
      include: { images: true },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(galleries, { status: 200 })
  } catch (error: any) {
    console.error("GET /api/gallery error:", error)
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 })
  }
}

/**
 * @swagger
 * /api/gallery:
 *   post:
 *     summary: Create new gallery item
 *     description: Upload multiple images and save gallery details
 *     tags:
 *       - Gallery
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Gallery created successfully
 */
export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const imageFiles = formData.getAll("images") as File[]

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    const uploadedUrls: string[] = []

    // Upload all images to Cloudinary
    for (const file of imageFiles) {
      if (file && file.size > 0) {
        const url = await uploadFileToCloudinary(file, "gallery")
        uploadedUrls.push(url)
      }
    }

    // Create Gallery and related images
    const newGallery = await prisma.gallery.create({
      data: {
        title,
        description,
        images: {
          create: uploadedUrls.map((url) => ({ url })),
        },
      },
      include: { images: true },
    })

    return NextResponse.json(newGallery, { status: 201 })
  } catch (error: any) {
    console.error("POST /api/gallery error:", error)
    return NextResponse.json({ error: "Failed to create gallery" }, { status: 500 })
  }
}

// Helper: upload a single file to Cloudinary
async function uploadFileToCloudinary(file: File, folder: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto" },
      (error, result) => {
        if (error) reject(error)
        else resolve(result!.secure_url)
      }
    )

    file
      .arrayBuffer()
      .then((arrayBuffer) => {
        const buffer = Buffer.from(arrayBuffer)
        uploadStream.end(buffer)
      })
      .catch(reject)
  })
}
