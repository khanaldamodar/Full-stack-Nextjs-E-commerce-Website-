"use client"
import React from 'react'
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
// import { useCart } from "@/hooks/use-cart"

import { ChevronLeft } from "lucide-react"
import { useCartContext } from '@/context/CartContext'
import { RelatedProducts } from '@/components/Productpage-components/related-products'

// Sample package data
const SAMPLE_PACKAGES = [
    {
        id: 1,
        name: "Home Office Starter",
        description: "Perfect for beginners setting up a home office",
        price: 299.99,
        originalPrice: 399.99,
        category: "Office Setup",
        rating: 4.6,
        image: "/logo.jpeg",
        productCount: 5,
        products: [
            { id: 1, name: "Wireless Headphones", price: 129.99, description: "High-quality audio for calls and music" },
            { id: 3, name: "Laptop Stand", price: 49.99, description: "Ergonomic stand for better posture" },
            { id: 5, name: "Mouse Pad", price: 24.99, description: "Smooth surface for precise mouse control" },
            { id: 7, name: "Desk Lamp", price: 39.99, description: "LED lamp with adjustable brightness" },
            { id: 9, name: "Phone Stand", price: 14.99, description: "Convenient phone holder for desk" },
        ],
        specifications: {
            "Total Items": "5 products",
            Compatibility: "Universal",
            Warranty: "1 year",
            Shipping: "Free worldwide",
        },
        benefits: [
            "Save 25% compared to buying individually",
            "Everything you need to start working from home",
            "Ergonomic setup for better productivity",
            "Professional appearance for video calls",
        ],
    },
    {
        id: 2,
        name: "Professional Setup",
        description: "Complete professional workstation package",
        price: 599.99,
        originalPrice: 799.99,
        category: "Professional",
        rating: 4.8,
        image: "/logo.jpeg",
        productCount: 7,
        products: [
            { id: 1, name: "Wireless Headphones", price: 129.99, description: "Premium audio quality" },
            { id: 4, name: "Mechanical Keyboard", price: 159.99, description: "Professional-grade keyboard" },
            { id: 6, name: "Monitor Arm", price: 79.99, description: "Adjustable monitor mount" },
            { id: 8, name: "Wireless Mouse", price: 34.99, description: "Precision mouse" },
            { id: 11, name: "Webcam", price: 89.99, description: "4K webcam for video calls" },
            { id: 2, name: "USB-C Cable", price: 19.99, description: "Fast charging cable" },
            { id: 10, name: "USB Hub", price: 44.99, description: "Multi-port connectivity" },
        ],
        specifications: {
            "Total Items": "7 products",
            Compatibility: "Universal",
            Warranty: "2 years",
            Shipping: "Free worldwide",
        },
        benefits: [
            "Save 25% compared to buying individually",
            "Professional-grade equipment",
            "Perfect for remote work and streaming",
            "Extended warranty coverage",
        ],
    },
    {
        id: 3,
        name: "Desk Essentials",
        description: "Must-have items for any desk",
        price: 149.99,
        originalPrice: 199.99,
        category: "Accessories",
        rating: 4.4,
        image: "/desk-essentials-collection.jpg",
        productCount: 4,
        products: [
            { id: 5, name: "Mouse Pad", price: 24.99, description: "Smooth surface for precise mouse control" },
            { id: 7, name: "Desk Lamp", price: 39.99, description: "LED lamp with adjustable brightness" },
            { id: 12, name: "Desk Organizer", price: 29.99, description: "Keep your desk organized" },
            { id: 9, name: "Phone Stand", price: 14.99, description: "Convenient phone holder for desk" },
        ],
        specifications: {
            "Total Items": "4 products",
            Compatibility: "Universal",
            Warranty: "1 year",
            Shipping: "Free worldwide",
        },
        benefits: [
            "Save 25% compared to buying individually",
            "Keep your desk organized and clean",
            "Improve workspace aesthetics",
            "Essential items for productivity",
        ],
    },
    {
        id: 4,
        name: "Cable & Connectivity",
        description: "All cables and connectivity solutions",
        price: 99.99,
        originalPrice: 149.99,
        category: "Accessories",
        rating: 4.5,
        image: "/cables-connectivity-bundle.jpg",
        productCount: 3,
        products: [
            { id: 2, name: "USB-C Cable", price: 19.99, description: "Fast charging cable" },
            { id: 10, name: "USB Hub", price: 44.99, description: "Multi-port connectivity" },
            { id: 9, name: "Phone Stand", price: 14.99, description: "Convenient phone holder for desk" },
        ],
        specifications: {
            "Total Items": "3 products",
            Compatibility: "Universal",
            Warranty: "1 year",
            Shipping: "Free worldwide",
        },
        benefits: [
            "Save 33% compared to buying individually",
            "All connectivity solutions in one bundle",
            "High-quality cables and connectors",
            "Perfect for tech enthusiasts",
        ],
    },
    {
        id: 5,
        name: "Gaming Setup",
        description: "Everything you need for gaming",
        price: 449.99,
        originalPrice: 599.99,
        category: "Gaming",
        rating: 4.7,
        image: "/gaming-setup-bundle.jpg",
        productCount: 5,
        products: [
            { id: 1, name: "Wireless Headphones", price: 129.99, description: "Low-latency gaming headphones" },
            { id: 4, name: "Mechanical Keyboard", price: 159.99, description: "Gaming-grade mechanical keyboard" },
            { id: 8, name: "Wireless Mouse", price: 34.99, description: "High-precision gaming mouse" },
            { id: 5, name: "Mouse Pad", price: 24.99, description: "Large gaming mouse pad" },
            { id: 6, name: "Monitor Arm", price: 79.99, description: "Adjustable monitor mount" },
        ],
        specifications: {
            "Total Items": "5 products",
            Compatibility: "Universal",
            Warranty: "1 year",
            Shipping: "Free worldwide",
        },
        benefits: [
            "Save 25% compared to buying individually",
            "Gaming-grade equipment",
            "Optimized for competitive gaming",
            "Professional esports setup",
        ],
    },
    {
        id: 6,
        name: "Streaming Bundle",
        description: "Complete streaming setup for content creators",
        price: 699.99,
        originalPrice: 899.99,
        category: "Professional",
        rating: 4.9,
        image: "/streaming-setup-bundle.jpg",
        productCount: 6,
        products: [
            { id: 1, name: "Wireless Headphones", price: 129.99, description: "Studio-quality headphones" },
            { id: 11, name: "Webcam", price: 89.99, description: "4K webcam for streaming" },
            { id: 4, name: "Mechanical Keyboard", price: 159.99, description: "RGB mechanical keyboard" },
            { id: 8, name: "Wireless Mouse", price: 34.99, description: "Precision mouse" },
            { id: 7, name: "Desk Lamp", price: 39.99, description: "Ring light for streaming" },
            { id: 2, name: "USB-C Cable", price: 19.99, description: "Fast charging cable" },
        ],
        specifications: {
            "Total Items": "6 products",
            Compatibility: "Universal",
            Warranty: "2 years",
            Shipping: "Free worldwide",
        },
        benefits: [
            "Save 22% compared to buying individually",
            "Professional streaming setup",
            "Perfect for content creators",
            "Extended warranty coverage",
        ],
    },
]

export default function PackageDetailPage({ params }: { params: { id: string } }) {
    const { id } = React.use(params)
    const packageId = Number.parseInt(id)
    const pkg = SAMPLE_PACKAGES.find((p) => p.id === packageId)
      const { addToCart } = useCartContext();
    const [quantity, setQuantity] = useState(1)
    const [isAdded, setIsAdded] = useState(false)

    if (!pkg) {
        return (
            <main className="min-h-screen">
                <div className="mx-auto max-w-7xl px-4 py-8">
                    <p className="text-center text-muted-foreground">Package not found</p>
                </div>
            </main>
        )
    }

    const discount = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)

    const handleAddToCart = () => {
        addToCart(
            {
                id: pkg.id,
                name: pkg.name,
                price: pkg.price,
                image: pkg.image,
                category: pkg.category,
            },
            quantity,
        )
        setIsAdded(true)
        setTimeout(() => setIsAdded(false), 2000)
    }

    return (
        <main className="min-h-screen font-poppins ">
            <div className="mx-auto max-w-7xl px-4 py-30 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <Link
                    href="/packages"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Packages
                </Link>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Left: Image */}
                    <div>
                        <Card className="overflow-hidden">
                            <div className="relative h-96 w-full bg-muted">
                                <img src={pkg.image || "/placeholder.svg"} alt={pkg.name} className="h-full w-full object-cover" />
                                {discount > 0 && (
                                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg text-lg font-bold">
                                        -{discount}%
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>

                    {/* Right: Details */}
                    <div>
                        {/* Header */}
                        <div className="mb-6">
                            <p className="text-sm text-muted-foreground mb-2">{pkg.category}</p>
                            <h1 className="text-3xl font-bold text-foreground mb-2">{pkg.name}</h1>
                            <p className="text-lg text-muted-foreground">{pkg.description}</p>
                        </div>

                        {/* Rating */}
                        <div className="mb-6 flex items-center gap-2">
                            <div className="flex text-yellow-400">{"★".repeat(Math.floor(pkg.rating))}</div>
                            <span className="text-sm text-muted-foreground">({pkg.rating} rating)</span>
                        </div>

                        {/* Price */}
                        <Card className="p-4 mb-6 bg-muted">
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-bold text-foreground">Rs. {pkg.price.toFixed(2)}</span>
                                <span className="text-lg text-muted-foreground line-through">Rs. {pkg.originalPrice.toFixed(2)}</span>
                                <span className="text-sm font-semibold text-green-600">
                                    Save Rs. {(pkg.originalPrice - pkg.price).toFixed(2)}
                                </span>
                            </div>
                        </Card>

                        {/* Quantity and Add to Cart */}
                        <div className="mb-6 flex gap-4">
                            <div className="flex items-center border border-border rounded-lg">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    −
                                </button>
                                <span className="px-4 py-2 font-semibold">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    +
                                </button>
                            </div>
                            <Button size="lg" onClick={handleAddToCart} className={isAdded ? "bg-green-600 hover:bg-green-700" : "bg-secondary"}>
                                {isAdded ? "✓ Added to Cart" : "Add to Cart"}
                            </Button>
                        </div>

                        {/* Benefits */}
                        <Card className="p-4 mb-6">
                            <h3 className="font-semibold text-foreground mb-3">Package Benefits</h3>
                            <ul className="space-y-2">
                                {pkg.benefits.map((benefit, idx) => (
                                    <li key={idx} className="flex gap-2 text-sm text-muted-foreground">
                                        <span className="text-green-600 font-bold">✓</span>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        {/* Specifications */}
                        <Card className="p-4">
                            <h3 className="font-semibold text-foreground mb-3">Specifications</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(pkg.specifications).map(([key, value]) => (
                                    <div key={key}>
                                        <p className="text-xs text-muted-foreground">{key}</p>
                                        <p className="font-semibold text-foreground">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Included Products */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Included Products ({pkg.productCount})</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {pkg.products.map((product) => (
                            <Card key={product.id} className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h4 className="font-semibold text-foreground">{product.name}</h4>
                                        <p className="text-sm text-muted-foreground">{product.description}</p>
                                    </div>
                                </div>
                                <p className="text-lg font-bold text-foreground">Rs. {product.price.toFixed(2)}</p>
                            </Card>
                        ))}
                    </div>
                </div>
                {/* Related Products */}
                <div className='mt-12'>
                </div>
            </div>
        </main>
    )
}
