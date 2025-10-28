"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

interface ProductImageGalleryProps {
  images: string[]
  productName: string
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <Card className="overflow-hidden bg-muted">
        <div className="relative aspect-square w-full">
          <img
            src={images[selectedImage] || "/placeholder.svg"}
            alt={productName}
            className="h-full w-full object-cover"
          />
        </div>
      </Card>

      {/* Thumbnail Gallery */}
      <div className="flex gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative h-20 w-20 overflow-hidden rounded-lg border-2 transition-all ${
              selectedImage === index ? "border-foreground" : "border-border hover:border-muted-foreground"
            }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`${productName} ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
