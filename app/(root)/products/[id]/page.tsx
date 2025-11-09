"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RelatedProducts } from "@/components/Productpage-components/related-products";
import { ProductReviews } from "@/components/Productpage-components/product-reviews";
import { ProductImageGallery } from "@/components/Productpage-components/product-image-gallery";
import { useCart } from "@/hooks/use-cart";

interface Product {
  id: number;
  name: string;
  description?: string;
  longDescription?: string;
  price: number;
  originalPrice?: number;
  category?: { id: number; name: string } | null;
  brand?: { id: number; name: string } | null;
  stock?: number;
  sku?: string;
  images?: string[];
  specifications?: { label: string; value: string }[];
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
}

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();

        if (data.product) {
          const p: Product = {
            id: data.product.id,
            name: data.product.name,
            description: data.product.description,
            longDescription: data.product.description,
            price: data.product.price,
            originalPrice: data.product.originalPrice,
            category: data.product.category
              ? {
                  id: data.product.categoryId,
                  name: data.product.category.name,
                }
              : null,
            brand: data.product.brand
              ? { id: data.product.brandId, name: data.product.brand.name }
              : null,
            stock: data.product.stock,
            sku: data.product.sku,

            images: [
              ...(data.product.imageUrl ? [data.product.imageUrl] : []),
              ...(Array.isArray(data.product.gallery)
                ? data.product.gallery
                : []),
            ].filter(Boolean),
            specifications: [
              { label: "Weight", value: data.product.weight + " kg" },
              { label: "SKU", value: data.product.sku || "N/A" },
            ],
            rating: data.product.rating || 0,
            reviewCount: 0,
            inStock: data.product.stock && data.product.stock > 0,
          };
          setProduct(p);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found</p>;

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || "",
        category: product.category?.name || "",
      },
      quantity
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <main className="min-h-screen font-poppins py-15">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <a href="/products" className="hover:text-foreground">
            Products
          </a>
          <span>/</span>
          <a
            href={`/products?category=${product.category?.name}`}
            className="hover:text-foreground"
          >
            {product.category?.name || "N/A"}
          </a>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {product.images && product.images.length > 0 ? (
            <ProductImageGallery
              images={product.images}
              productName={product.name}
            />
          ) : (
            <div className="flex items-center justify-center h-96 w-full rounded-lg border border-dashed border-gray-300 bg-gray-50 text-gray-500 text-sm">
              {product.name}
            </div>
          )}

          <div className="flex flex-col justify-between">
            <div>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {product.category?.name || "N/A"}
                  </p>
                  <h1 className="mt-2 text-3xl font-bold text-foreground">
                    {product.name}
                  </h1>
                </div>
                {discount > 0 && (
                  <div className="rounded-lg bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                    -{discount}%
                  </div>
                )}
              </div>

              <div className="mb-6 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {"★".repeat(Math.floor(product.rating || 0))}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {product.rating}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              <div className="mb-6 flex items-baseline gap-3">
                <span className="text-4xl font-bold text-foreground">
                  Rs. {product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    Rs. {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <p className="mb-6 text-muted-foreground">
                {product.longDescription}
              </p>

              <div className="mb-6">
                {product.inStock ? (
                  <p className="text-sm font-medium text-green-600">
                    ✓ In Stock
                  </p>
                ) : (
                  <p className="text-sm font-medium text-red-600">
                    Out of Stock
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  Total:{" "}
                  <span className="font-bold text-foreground">
                    Rs. {(product.price * quantity).toFixed(2)}
                  </span>
                </span>
              </div>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 bg-secondary"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
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

        {product.specifications && product.specifications.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              Specifications
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {product.specifications.map((spec, index) => (
                <Card key={index} className="p-4">
                  <p className="text-sm text-muted-foreground">{spec.label}</p>
                  <p className="mt-1 font-medium text-foreground">
                    {spec.value}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12">
          <RelatedProducts
            currentProductId={product.id}
            category={product.category?.name || ""}
          />
        </div>
      </div>
    </main>
  );
}
