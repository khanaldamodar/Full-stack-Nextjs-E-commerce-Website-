import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import formidable from "formidable";
// import { v2 as cloudinary } from 'cloudinary';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import cloudinary from "@/lib/cloudinary";



// GET: Get all products (public)

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: List of all products with their category, brand, and packages
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
 *                   name:
 *                     type: string
 *                     example: "iPhone 15"
 *                   description:
 *                     type: string
 *                     example: "Latest Apple iPhone"
 *                   price:
 *                     type: number
 *                     example: 1200
 *                   stock:
 *                     type: integer
 *                     example: 50
 *                   sku:
 *                     type: string
 *                     example: "IP15-128GB"
 *                   weight:
 *                     type: number
 *                     example: 0.2
 *                   imageUrl:
 *                     type: string
 *                     example: "https://example.com/product.jpg"
 *                   gallery:
 *                     type: array
 *                     items:
 *                       type: string
 *                   isFeatured:
 *                     type: boolean
 *                     example: true
 *                   isActive:
 *                     type: boolean
 *                     example: true
 *                   category:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                   brand:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                   packages:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         name:
 *                           type: string
 *
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Samsung Galaxy S23"
 *               description:
 *                 type: string
 *                 example: "Latest Samsung flagship phone"
 *               price:
 *                 type: number
 *                 example: 999
 *               stock:
 *                 type: integer
 *                 example: 100
 *               sku:
 *                 type: string
 *                 example: "SGS23-256GB"
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *               brandId:
 *                 type: integer
 *                 example: 1
 *               weight:
 *                 type: number
 *                 example: 0.25
 *               imageUrl:
 *                 type: string
 *                 example: "https://example.com/sgs23.jpg"
 *               gallery:
 *                 type: array
 *                 items:
 *                   type: string
 *               isFeatured:
 *                 type: boolean
 *                 example: true
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Name and price are required
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *
 *   patch:
 *     summary: Update an existing product
 *     tags:
 *       - Products
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               sku:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *               brandId:
 *                 type: integer
 *               weight:
 *                 type: number
 *               imageUrl:
 *                 type: string
 *               gallery:
 *                 type: array
 *                 items:
 *                   type: string
 *               isFeatured:
 *                 type: boolean
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Product ID is required
 *       401:
 *         description: Unauthorized
 *
 *   delete:
 *     summary: Delete a product
 *     tags:
 *       - Products
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       400:
 *         description: Product ID is required
 *       401:
 *         description: Unauthorized
 */

export async function GET(req: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        brand: true,
        packages: true,
      },
    });
    return NextResponse.json(products);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 });
  }
}



// PATCH: Update a product (auth required)
export async function PATCH(req: NextRequest) {
  try {
    const user = requireAuth(req);

    const body = await req.json();
    const {
      id,
      name,
      description,
      price,
      stock,
      sku,
      categoryId,
      brandId,
      weight,
      imageUrl,
      gallery,
      isFeatured,
      isActive,
    } = body;

    if (!id) return NextResponse.json({ message: "Product ID is required" }, { status: 400 });

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        stock,
        sku,
        categoryId,
        brandId,
        weight,
        imageUrl,
        gallery,
        isFeatured,
        isActive,
      },
    });

    return NextResponse.json(product);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message || "Failed to update product" }, { status: 401 });
  }
}

// DELETE: Delete a product (auth required)
export async function DELETE(req: NextRequest) {
  try {
    const user = requireAuth(req);

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ message: "Product ID is required" }, { status: 400 });

    const product = await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Product deleted", product });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message || "Failed to delete product" }, { status: 401 });
  }
}







export async function POST(req: NextRequest) {
  try {
    const user = requireAuth(req);
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      return await handleFormDataUpload(req, user);
    } else {
      return await handleJsonUpload(req, user);
    }
  } catch (err: any) {
    console.error('POST Error:', err);
    return NextResponse.json(
      { message: err.message || "Failed to create product" }, 
      { status: err.message?.includes('Unauthorized') ? 401 : 500 }
    );
  }
}

async function handleFormDataUpload(req: NextRequest, user: any) {
  try {
    const formData = await req.formData();
    
    // Debug: Log all form data
    console.log('=== FORM DATA FROM POSTMAN ===');
    const formEntries: any = {};
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        formEntries[key] = {
          type: 'File',
          name: value.name,
          size: value.size,
          type: value.type
        };
      } else {
        formEntries[key] = value;
      }
    }
    console.log('Form entries:', JSON.stringify(formEntries, null, 2));
    
    // Extract fields
    const name = formData.get('name') as string;
    const price = formData.get('price') as string;
    const description = formData.get('description') as string;
    const stock = formData.get('stock') as string;
    const categoryId = formData.get('categoryId') as string;
    const brandId = formData.get('brandId') as string;
    const weight = formData.get('weight') as string;
    const sku = formData.get('sku') as string;

    if (!name || !price) {
      return NextResponse.json(
        { message: "Name and price are required", received: { name, price } }, 
        { status: 400 }
      );
    }

    // Handle main image upload
    const imageFile = formData.get('image') as File;
    let imageUrl = null;

    if (imageFile && imageFile.size > 0) {
      console.log('Processing main image file:', imageFile.name);
      
      try {
        imageUrl = await uploadFileToCloudinary(imageFile, 'products');
        console.log('Main image uploaded successfully:', imageUrl);
      } catch (uploadError) {
        console.error('Main image upload failed:', uploadError);
      }
    }

    // Handle gallery images - MULTIPLE WAYS
    const galleryUrls: string[] = [];

    // Method 1: Support array notation (gallery[], gallery[0], gallery[1])
    const galleryFields = [
      ...formData.getAll('gallery[]'), // Array notation
      ...formData.getAll('gallery[0]'), // Indexed notation
      ...formData.getAll('gallery[1]'), // Indexed notation
      ...formData.getAll('gallery[2]'), // Indexed notation
      ...formData.getAll('gallery'), // Single field
    ].filter((value, index, self) => 
      value instanceof File && 
      value.size > 0 && 
      self.findIndex(v => v instanceof File && v.name === value.name) === index
    );

    console.log(`Found ${galleryFields.length} gallery files:`, 
      galleryFields.map((f: File) => f.name));

    // Upload all gallery images
    for (const galleryFile of galleryFields) {
      if (galleryFile instanceof File && galleryFile.size > 0) {
        try {
          const galleryUrl = await uploadFileToCloudinary(galleryFile, 'products/gallery');
          galleryUrls.push(galleryUrl);
          console.log('Gallery image uploaded:', galleryUrl);
        } catch (uploadError) {
          console.error('Gallery image upload failed:', uploadError);
        }
      }
    }

    // Method 2: Also check for any additional file fields that might be gallery images
    // This handles cases where files are uploaded with different field names
    for (const [key, value] of formData.entries()) {
      if (value instanceof File && 
          value.size > 0 && 
          key !== 'image' && 
          !key.startsWith('gallery') &&
          !galleryFields.includes(value)) {
        try {
          const additionalImageUrl = await uploadFileToCloudinary(value, 'products/gallery');
          galleryUrls.push(additionalImageUrl);
          console.log('Additional image uploaded from field:', key, additionalImageUrl);
        } catch (uploadError) {
          console.error('Additional image upload failed:', uploadError);
        }
      }
    }

    // Prepare product data
    const productData = {
      name: name.trim(),
      description: (description || '').trim(),
      price: parseFloat(price),
      stock: stock ? parseInt(stock) : 0,
      sku: sku || null,
      categoryId: categoryId ? parseInt(categoryId) : null,
      brandId: brandId ? parseInt(brandId) : null,
      weight: weight ? parseFloat(weight) : 0,
      imageUrl,
      gallery: galleryUrls.length > 0 ? JSON.stringify(galleryUrls) : null,
      isFeatured: formData.get('isFeatured') === 'true',
      isActive: formData.get('isActive') !== 'false',
      createdById: user.userId,
    };

    console.log('Creating product with data:', {
      ...productData,
      gallery: galleryUrls // Show actual URLs instead of stringified version
    });

    const product = await prisma.product.create({
      data: productData,
    });

    return NextResponse.json({
      ...product,
      gallery: galleryUrls // Return parsed gallery for response
    }, { status: 201 });

  } catch (error: any) {
    console.error('Form data handling error:', error);
    return NextResponse.json(
      { message: "Failed to process form data: " + error.message }, 
      { status: 500 }
    );
  }
}

// Helper function for Cloudinary uploads
async function uploadFileToCloudinary(file: File, folder: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result!.secure_url);
        }
      }
    );

    // Convert file to buffer and upload
    file.arrayBuffer()
      .then(arrayBuffer => {
        const buffer = Buffer.from(arrayBuffer);
        uploadStream.end(buffer);
      })
      .catch(reject);
  });
}

async function handleJsonUpload(req: NextRequest, user: any) {
  // ... keep your existing JSON handling code ...
}
