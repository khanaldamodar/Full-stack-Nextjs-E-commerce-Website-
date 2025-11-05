import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import cloudinary from "@/lib/cloudinary"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * @swagger
 * /api/settings:
 *   get:
 *     summary: Get website settings
 *     description: Fetches the current website or company settings (e.g., company name, social links, contact info).
 *     tags:
 *       - Settings
 *     responses:
 *       200:
 *         description: Successfully fetched settings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Internal server error
 */
export async function GET() {
  try {
    const settings = await prisma.settings.findFirst()
    return NextResponse.json(settings ?? { message: "No settings found" }, { status: 200 })
  } catch (error: any) {
    console.error("GET /api/settings error:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

/**
 * @swagger
 * /api/settings:
 *   put:
 *     summary: Update or create website settings (supports image upload)
 *     description: Accepts `multipart/form-data` (for logo and favicon uploads) or `application/json` (for text-only updates).
 *     tags:
 *       - Settings
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *               slogan:
 *                 type: string
 *               aboutShort:
 *                 type: string
 *               about:
 *                 type: string
 *               logo:
 *                 type: string
 *                 format: binary
 *               favicon:
 *                 type: string
 *                 format: binary
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *               slogan:
 *                 type: string
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *       500:
 *         description: Internal server error
 */
export async function PUT(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || ""

    let data: any = {}

    if (contentType.includes("multipart/form-data")) {
      // --- Handle FormData Upload ---
      const formData = await req.formData()

      // Extract fields
      for (const [key, value] of formData.entries()) {
        if (typeof value === "string") data[key] = value
      }

      // Handle logo upload
      const logoFile = formData.get("logo") as File | null
      if (logoFile && logoFile.size > 0) {
        const logoUrl = await uploadFileToCloudinary(logoFile, "settings")
        data.logo = logoUrl
      }

      // Handle favicon upload
      const faviconFile = formData.get("favicon") as File | null
      if (faviconFile && faviconFile.size > 0) {
        const faviconUrl = await uploadFileToCloudinary(faviconFile, "settings")
        data.favicon = faviconUrl
      }
    } else {
      // --- Handle JSON Update ---
      data = await req.json()
    }

    // --- Update or Create Settings Record ---
    let settings = await prisma.settings.findFirst()
    if (settings) {
      settings = await prisma.settings.update({
        where: { id: settings.id },
        data,
      })
    } else {
      settings = await prisma.settings.create({ data })
    }

    return NextResponse.json(settings, { status: 200 })
  } catch (error: any) {
    console.error("PUT /api/settings error:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}

/**
 * Uploads a file to Cloudinary and returns the secure URL
 */
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
