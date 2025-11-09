"use client";
import React, { useEffect, useState } from "react";
import { ProductGrid } from "@/components/Productpage-components/product-grid";
import { ProductPagination } from "@/components/Productpage-components/product-pagination";

const ITEMS_PER_PAGE = 8;

const FeaturedProductsPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/products");
        const data = await res.json();

        // Filter featured and normalize product data
        const featured = data
          .filter((product: any) => product.isFeatured === true)
          .map((p: any) => ({
            ...p,
            images: p.images || [], // ensure images array exists
            name: p.name || p.title || "Unnamed Product",
            price: p.price || 0,
            categoryName: p.category?.name || "Unknown",
            brandName: p.brand?.name || "Unknown",
            rating: p.rating || 0,
          }));

        setProducts(featured);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  return (
    <main className="min-h-screen font-poppins py-30 md:py-30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Featured Products
          </h1>
          <p className="mt-2 text-muted-foreground">
            Browse our collection of {products.length} featured products
          </p>
        </div>

        <div className="flex-1">
          {loading ? (
            <div className="flex h-96 items-center justify-center">
              <p className="text-lg text-muted-foreground">Loading...</p>
            </div>
          ) : paginatedProducts.length > 0 ? (
            <>
              <ProductGrid products={paginatedProducts} />
              <div className="mt-8">
                <ProductPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          ) : (
            <div className="flex h-96 items-center justify-center rounded-lg border border-border bg-card">
              <div className="text-center">
                <p className="text-lg font-medium text-foreground">
                  No featured products found
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your filters
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default FeaturedProductsPage;
