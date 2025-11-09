"use client";

import { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import Heading from "../global/Heading";

interface Package {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  rating: number;
  imageUrl: string;
  productCount: number;
}

export function FeaturedPackages() {
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState<Set<number>>(new Set());
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free",
    slides: { perView: 1.2, spacing: 16 },
    breakpoints: {
      "(min-width: 640px)": { slides: { perView: 2, spacing: 20 } },
      "(min-width: 1024px)": { slides: { perView: 4, spacing: 24 } },
    },
  });

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch("/api/packages");
        if (!res.ok) throw new Error("Failed to fetch packages");
        const data: Package[] = await res.json();
        setPackages(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, pkg: Package) => {
    e.preventDefault();
    addToCart(
      {
        id: pkg.id,
        name: pkg.name,
        price: pkg.price,
        image: pkg.imageUrl,
        category: pkg.category,
      },
      1
    );
    setAddedItems((prev) => new Set(prev).add(pkg.id));
    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(pkg.id);
        return newSet;
      });
    }, 2000);
  };

  if (loading)
    return (
      <p className="text-center text-white py-8">
        Loading featured packages...
      </p>
    );

  return (
    <section className="py-8 font-poppins relative">
      <div className="flex flex-col px-6 md:px-20">
        <div className="mb-12 text-center text-white">
          <Heading title="Featured Packages" />
          <p className="mt-4 text-lg text-white">
            आफ्नोे रोजाईको प्याकेज छान्नुहोस
          </p>
        </div>

        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 hidden md:flex">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/20 hover:bg-white/30 text-white"
            onClick={() => instanceRef.current?.prev()}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </div>

        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden md:flex">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/20 hover:bg-white/30 text-white"
            onClick={() => instanceRef.current?.next()}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        <div ref={sliderRef} className="keen-slider">
          {packages.map((pkg) => {
            const discount = Math.round(
              ((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100
            );
            return (
              <div key={pkg.id} className="keen-slider__slide">
                <Link href={`/packages/${pkg.id}`}>
                  <Card className="overflow-hidden transition-all hover:shadow-lg cursor-pointer h-full flex flex-col">
                    <div className="relative h-40 w-full overflow-hidden bg-muted">
                      <img
                        src={pkg.imageUrl || "/placeholder.svg"}
                        alt={pkg.name}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                      {discount > 0 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                          -{discount}%
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-semibold text-foreground text-sm line-clamp-2">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {pkg.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto gap-2 pt-3">
                        <div className="flex flex-col">
                          <span className="text-base font-bold text-foreground">
                            Rs. {pkg.price}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="default"
                          onClick={(e) => handleAddToCart(e, pkg)}
                          className={
                            addedItems.has(pkg.id)
                              ? "bg-green-600 hover:bg-green-700"
                              : ""
                          }
                        >
                          {addedItems.has(pkg.id) ? "✓" : "+"}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/packages">
            <Button
              size="lg"
              className="bg-secondary hover:text-primary hover:bg-blue-900"
            >
              View All Packages
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
