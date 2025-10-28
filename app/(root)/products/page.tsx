"use client"

import { ProductFilters } from "@/components/Productpage-components/product-filters"
import { ProductGrid } from "@/components/Productpage-components/product-grid"
import { ProductPagination } from "@/components/Productpage-components/product-pagination"
import { useState, useMemo } from "react"


// Sample product data
const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 129.99,
    originalPrice: 300,
    category: "Electronics",
    rating: 4.5,
    image: "/logo.jpeg",
  },
  {
    id: 2,
    name: "USB-C Cable",
    price: 19.99,
    originalPrice: 300,
    category: "Accessories",
    rating: 4.8,
    image: "/logo.jpeg",
  },
  { id: 3, name: "Laptop Stand", price: 49.99, category: "Office", rating: 4.3, image: "/logo.jpeg" },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 159.99,
    originalPrice: 300,
    category: "Electronics",
    rating: 4.7,
    image: "/logo.jpeg",
  },
  { id: 5, name: "Mouse Pad", price: 24.99, originalPrice: 300, category: "Accessories", rating: 4.2, image: "/logo.jpeg" },
  { id: 6, name: "Monitor Arm", price: 79.99, originalPrice: 300, category: "Office", rating: 4.6, image: "/logo.jpeg" },
  { id: 7, name: "Desk Lamp", price: 39.99, originalPrice: 300, category: "Office", rating: 4.4, image: "/logo.jpeg" },
  {
    id: 8,
    name: "Wireless Mouse",
    price: 34.99,
    originalPrice: 300,
    category: "Electronics",
    rating: 4.5,
    image: "/logo.jpeg",
  },
  {
    id: 9,
    name: "Phone Stand",
    price: 14.99,
    originalPrice: 300,
    category: "Accessories",
    rating: 4.1,
    image: "/logo.jpeg",
  },
  { id: 10, name: "USB Hub", price: 44.99, originalPrice: 300, category: "Accessories", rating: 4.6, image: "/logo.jpeg" },
  { id: 11, name: "Webcam", price: 89.99, originalPrice: 300, category: "Electronics", rating: 4.4, image: "/logo.jpeg" },
  {
    id: 12,
    name: "Desk Organizer",
    price: 29.99,
    originalPrice: 300,
    category: "Office",
    rating: 4.3,
    image: "/logo.jpeg",
  },
]

const ITEMS_PER_PAGE = 6

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<{
    categories: string[]
    priceRange: [number, number]
    minRating: number
  }>({
    categories: [],
    priceRange: [0, 200],
    minRating: 0,
  })

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((product) => {
      const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category)
      const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      const ratingMatch = product.rating >= filters.minRating

      return categoryMatch && priceMatch && ratingMatch
    })
  }, [filters])

  // Paginate filtered products
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredProducts, currentPage])

  // Reset to page 1 when filters change
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  return (
    <main className="min-h-screen font-poppins py-10 md:py-30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="mt-2 text-muted-foreground">Browse our collection of {filteredProducts.length} products</p>
        </div>

        {/* Main Content */}
        <div className="flex gap-8 flex-col md:flex-row">
          {/* Sidebar Filters */}
          <aside className="w-full shrink-0 md:w-64">
            <ProductFilters filters={filters} onFilterChange={handleFilterChange} />
          </aside>

          {/* Products Section */}
          <div className="flex-1">
            {paginatedProducts.length > 0 ? (
              <>
                <ProductGrid products={paginatedProducts} />
                <div className="mt-8">
                  <ProductPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
              </>
            ) : (
              <div className="flex h-96 items-center justify-center rounded-lg border border-border bg-card">
                <div className="text-center">
                  <p className="text-lg font-medium text-foreground">No products found</p>
                  <p className="mt-2 text-sm text-muted-foreground">Try adjusting your filters</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
