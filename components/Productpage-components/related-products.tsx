"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface RelatedProductsProps {
  currentProductId: number
  category: string
}

// Sample related products
const RELATED_PRODUCTS = [
  {
    id: 3,
    name: "Laptop Stand",
    price: 49.99,
    category: "Office",
    rating: 4.3,
    image: "/logo.jpeg",
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 159.99,
    category: "Electronics",
    rating: 4.7,
    image: "/logo.jpeg",
  },
  {
    id: 6,
    name: "Monitor Arm",
    price: 79.99,
    category: "Office",
    rating: 4.6,
    image: "/logo.jpeg",
  },
  {
    id: 8,
    name: "Wireless Mouse",
    price: 34.99,
    category: "Electronics",
    rating: 4.5,
    image: "/logo.jpeg",
  },
]

export function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-foreground">Related Products</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {RELATED_PRODUCTS.map((product) => (
          <Card key={product.id} className="overflow-hidden transition-all hover:shadow-lg">
            <div className="relative h-40 w-full overflow-hidden bg-muted">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground line-clamp-2">{product.name}</h3>
              <div className="mb-3 mt-2 flex items-center gap-1">
                <div className="flex text-yellow-400">{"★".repeat(Math.floor(product.rating))}</div>
                <span className="text-xs text-muted-foreground">({product.rating})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-foreground">Rs. {product.price.toFixed(2)}</span>
                <Button size="sm" variant="default" className="bg-secondary">
                  View
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
