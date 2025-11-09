"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useCartContext } from "@/context/CartContext";

const SAMPLE_DATA = [
  {
    id: 1,
    benefits: [
      "Save 25% compared to buying individually",
      "Everything you need to start working from home",
      "Ergonomic setup for better productivity",
      "Professional appearance for video calls",
    ],
    specifications: {
      "Total Items": "5 products",
      Compatibility: "Universal",
      Warranty: "1 year",
      Shipping: "Free worldwide",
    },
    products: [
      {
        id: 1,
        name: "Wireless Headphones",
        price: 129.99,
        description: "High-quality audio for calls and music",
      },
      {
        id: 3,
        name: "Laptop Stand",
        price: 49.99,
        description: "Ergonomic stand for better posture",
      },
      {
        id: 5,
        name: "Mouse Pad",
        price: 24.99,
        description: "Smooth surface for precise mouse control",
      },
      {
        id: 7,
        name: "Desk Lamp",
        price: 39.99,
        description: "LED lamp with adjustable brightness",
      },
      {
        id: 9,
        name: "Phone Stand",
        price: 14.99,
        description: "Convenient phone holder for desk",
      },
    ],
  },
  {
    id: 2,
    benefits: [
      "Save 25% compared to buying individually",
      "Professional-grade equipment",
      "Perfect for remote work and streaming",
      "Extended warranty coverage",
    ],
    specifications: {
      "Total Items": "7 products",
      Compatibility: "Universal",
      Warranty: "2 years",
      Shipping: "Free worldwide",
    },
    products: [
      {
        id: 1,
        name: "Wireless Headphones",
        price: 129.99,
        description: "Premium audio quality",
      },
      {
        id: 4,
        name: "Mechanical Keyboard",
        price: 159.99,
        description: "Professional-grade keyboard",
      },
      {
        id: 6,
        name: "Monitor Arm",
        price: 79.99,
        description: "Adjustable monitor mount",
      },
      {
        id: 8,
        name: "Wireless Mouse",
        price: 34.99,
        description: "Precision mouse",
      },
      {
        id: 11,
        name: "Webcam",
        price: 89.99,
        description: "4K webcam for video calls",
      },
    ],
  },
];

export default function PackageDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCartContext();

  const [pkg, setPkg] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    async function fetchPackage() {
      try {
        const res = await fetch(`/api/packages/${id}`);
        if (!res.ok) throw new Error("Failed to fetch package");
        const data = await res.json();
        setPkg(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchPackage();
  }, [id]);

  const handleAddToCart = () => {
    if (!pkg) return;
    addToCart(
      {
        id: pkg.id,
        name: pkg.name,
        price: pkg.price,
        image: pkg.imageUrl,
        category: "Package",
      },
      quantity
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (loading)
    return (
      <main className="min-h-screen flex justify-center items-center">
        <p className="text-muted-foreground text-lg">Loading package...</p>
      </main>
    );

  if (error)
    return (
      <main className="min-h-screen flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </main>
    );

  if (!pkg)
    return (
      <main className="min-h-screen flex justify-center items-center">
        <p className="text-muted-foreground">Package not found</p>
      </main>
    );

  const sampleData = SAMPLE_DATA.find((p) => p.id === Number(id));

  const originalPrice = pkg.price + (pkg.discount || 0);
  const discount = pkg.discount
    ? Math.round(((originalPrice - pkg.price) / originalPrice) * 100)
    : 0;

  return (
    <main className="min-h-screen font-poppins">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Link
          href="/packages"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Packages
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <Card className="overflow-hidden">
              <div className="relative h-96 w-full bg-muted">
                <img
                  src={pkg.imageUrl || "/placeholder.svg"}
                  alt={pkg.name}
                  className="h-full w-full object-cover"
                />
                {discount > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg text-lg font-bold">
                    -{discount}%
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div>
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">
                {pkg.category || "Package"}
              </p>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {pkg.name}
              </h1>
              <p className="text-lg text-muted-foreground">{pkg.description}</p>
            </div>

            <Card className="p-4 mb-6 bg-muted">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-foreground">
                  Rs. {pkg.price.toFixed(2)}
                </span>
                {pkg.discount > 0 && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      Rs. {originalPrice.toFixed(2)}
                    </span>
                    <span className="text-sm font-semibold text-green-600">
                      Save Rs. {pkg.discount.toFixed(2)}
                    </span>
                  </>
                )}
              </div>
            </Card>

            <p className="text-sm text-muted-foreground mb-2">
              Stock: {pkg.stock || "N/A"} items
            </p>
            {pkg.createdBy && (
              <p className="text-sm text-muted-foreground mb-4">
                Created By:{" "}
                <span className="font-semibold">{pkg.createdBy.name}</span>
              </p>
            )}

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
              <Button
                size="lg"
                onClick={handleAddToCart}
                className={
                  isAdded ? "bg-green-600 hover:bg-green-700" : "bg-secondary"
                }
              >
                {isAdded ? "✓ Added to Cart" : "Add to Cart"}
              </Button>
            </div>
          </div>
        </div>

        {/* Benefits */}
        {sampleData?.benefits && (
          <Card className="p-4 mt-12 mb-6">
            <h3 className="font-semibold text-foreground mb-3">
              Package Benefits
            </h3>
            <ul className="space-y-2">
              {sampleData.benefits.map((benefit, idx) => (
                <li
                  key={idx}
                  className="flex gap-2 text-sm text-muted-foreground"
                >
                  <span className="text-green-600 font-bold">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Specifications */}
        {sampleData?.specifications && (
          <Card className="p-4 mb-12">
            <h3 className="font-semibold text-foreground mb-3">
              Specifications
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(sampleData.specifications).map(([key, value]) => (
                <div key={key}>
                  <p className="text-xs text-muted-foreground">{key}</p>
                  <p className="font-semibold text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Included Products */}
        {sampleData?.products && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Included Products ({sampleData.products.length})
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sampleData.products.map((product) => (
                <Card
                  key={product.id}
                  className="p-4 hover:shadow-lg transition-shadow rounded-xl border border-gray-200 flex flex-col justify-between"
                >
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-foreground mb-1">
                      {product.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {product.description}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-bold text-foreground">
                      Rs. {product.price.toFixed(2)}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => addToCart(product, 1)}
                    >
                      Add
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12"></div>
      </div>
    </main>
  );
}
