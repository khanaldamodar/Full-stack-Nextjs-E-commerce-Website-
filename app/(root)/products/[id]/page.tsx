"use client"
import React from 'react'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RelatedProducts } from "@/components/Productpage-components/related-products"
import { ProductReviews } from "@/components/Productpage-components/product-reviews"
import { ProductImageGallery } from "@/components/Productpage-components/product-image-gallery"
import { useCart } from "@/hooks/use-cart"


// Sample product data - in a real app, this would come from a database
const PRODUCTS_DATA: Record<
  string,
  {
    id: number
    name: string
    price: number
    originalPrice?: number
    category: string
    rating: number
    reviewCount: number
    description: string
    longDescription: string
    images: string[]
    specifications: { label: string; value: string }[]
    inStock: boolean
    sku: string
  }
> = {
  "1": {
    id: 1,
    name: "Wireless Headphones",
    price: 129.99,
    originalPrice: 179.99,
    category: "Electronics",
    rating: 4.5,
    reviewCount: 328,
    description: "Premium wireless headphones with active noise cancellation",
    longDescription:
      "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation technology, 30-hour battery life, and premium comfort padding for all-day wear. Perfect for music lovers, professionals, and travelers.",
    images: ["/logo.jpeg", "/logo.jpeg", "/logo.jpeg"],
    specifications: [
      { label: "Driver Size", value: "40mm" },
      { label: "Frequency Response", value: "20Hz - 20kHz" },
      { label: "Battery Life", value: "30 hours" },
      { label: "Charging Time", value: "2 hours" },
      { label: "Weight", value: "250g" },
      { label: "Connectivity", value: "Bluetooth 5.0" },
    ],
    inStock: true,
    sku: "WH-1000XM4",
  },
  "2": {
    id: 2,
    name: "USB-C Cable",
    price: 19.99,
    category: "Accessories",
    rating: 4.8,
    reviewCount: 1205,
    description: "Durable USB-C charging and data transfer cable",
    longDescription:
      "High-quality USB-C cable with reinforced connectors and braided nylon exterior. Supports fast charging up to 100W and high-speed data transfer. Compatible with all USB-C devices.",
    images: ["/usb-c-cable.jpg", "/usb-c-cable.jpg", "/usb-c-cable.jpg"],
    specifications: [
      { label: "Length", value: "2 meters" },
      { label: "Max Power", value: "100W" },
      { label: "Data Speed", value: "480 Mbps" },
      { label: "Material", value: "Nylon Braided" },
      { label: "Connector Type", value: "USB-C to USB-C" },
    ],
    inStock: true,
    sku: "USB-C-2M",
  },
}

export default function ProductPage({ params }: { params: { id: string } }) {
    const {id} = React.use(params)
  const product = PRODUCTS_DATA[id]
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addToCart } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    if (product) {
      addToCart(
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          category: product.category,
        },
        quantity,
      )
      setIsAdded(true)
      setTimeout(() => setIsAdded(false), 2000)
    }
  }

  if (!product) {
    return (
      <main className="min-h-screen font-poppins">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex h-96 items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
              <p className="mt-2 text-muted-foreground">The product you're looking for doesn't exist.</p>
              <Button className="mt-4" onClick={() => window.history.back()}>
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <main className="min-h-screen font-poppins py-15">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <a href="/products" className="hover:text-foreground">
            Products
          </a>
          <span>/</span>
          <a href={`/products?category=${product.category}`} className="hover:text-foreground">
            {product.category}
          </a>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Gallery */}
          <ProductImageGallery images={product.images} productName={product.name} />

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            {/* Header */}
            <div>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{product.category}</p>
                  <h1 className="mt-2 text-3xl font-bold text-foreground">{product.name}</h1>
                </div>
                {discount > 0 && (
                  <div className="rounded-lg bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">-{discount}%</div>
                )}
              </div>

              {/* Rating */}
              <div className="mb-6 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">{"★".repeat(Math.floor(product.rating))}</div>
                  <span className="text-sm font-medium text-foreground">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-6 flex items-baseline gap-3">
                <span className="text-4xl font-bold text-foreground">Rs. {product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mb-6 text-muted-foreground">{product.longDescription}</p>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <p className="text-sm font-medium text-green-600">✓ In Stock</p>
                ) : (
                  <p className="text-sm font-medium text-red-600">Out of Stock</p>
                )}
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  Total: <span className="font-bold text-foreground">Rs. {(product.price * quantity).toFixed(2)}</span>
                </span>
              </div>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 bg-secondary"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                  variant={isAdded ? "default" : "default"}
                >
                  {isAdded ? "✓ Added to Cart" : "Add to Cart"}
                </Button>
               
              </div>

              <div className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
                <p>
                  <strong>SKU:</strong> {product.sku}
                </p>
                <p className="mt-2">Free shipping on orders over Rs. 5000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Specifications</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {product.specifications.map((spec, index) => (
              <Card key={index} className="p-4">
                <p className="text-sm text-muted-foreground">{spec.label}</p>
                <p className="mt-1 font-medium text-foreground">{spec.value}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <ProductReviews productId={product.id} rating={product.rating} reviewCount={product.reviewCount} />
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <RelatedProducts currentProductId={product.id} category={product.category} />
        </div>
      </div>
    </main>
  )
}
