"use client";

import { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import Heading from "@/components/global/Heading";

interface Category {
  id: number;
  name: string;
  description: string;
  category: string;
  productCount: number;
  imageUrl?: string; // optional
}

export function FeaturedPackages() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const autoplay = (slider: any) => {
    let timeout: any;
    let mouseOver = false;

    const clear = () => clearTimeout(timeout);

    const start = () => {
      clear();
      if (mouseOver) return;
      timeout = setTimeout(() => slider.next(), 3000);
    };

    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => {
        mouseOver = true;
        clear();
      });
      slider.container.addEventListener("mouseout", () => {
        mouseOver = false;
        start();
      });
      start();
    });

    slider.on("dragStarted", clear);
    slider.on("animationEnded", start);
    slider.on("updated", start);
  };

  // Keen Slider setup
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      mode: "free",
      slides: { perView: 1, spacing: 16 }, // default: 1 card
      breakpoints: {
        "(min-width: 768px)": { slides: { perView: 2, spacing: 20 } }, // md: 2 cards
        "(min-width: 1024px)": { slides: { perView: 4, spacing: 24 } }, // lg: 4 cards
      },
    },
    [autoplay]
  );

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");

        const data: Category[] = await res.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-8 font-poppins relative">
        <div className="flex flex-col px-6 md:px-20">
          <div className="mb-12 text-center text-white">
            <Heading title="Featured Packages" />
            <p className="mt-4 text-lg text-white">
              आफ्नो रोजाइको प्याकेज छान्नुहोस्
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-full h-48 rounded-xl bg-gray-200 animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 font-poppins relative">
      <div className="flex flex-col px-6 md:px-20">
        {/* Header */}
        <div className="mb-12 text-center text-white">
          <Heading title="Featured Packages" />
          <p className="mt-4 text-lg text-white">
            आफ्नो रोजाइको प्याकेज छान्नुहोस्
          </p>
        </div>

        {/* Prev Button */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 hidden md:flex">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Previous Package"
            className="rounded-full bg-white/20 hover:bg-white/30 text-white"
            onClick={() => instanceRef.current?.prev()}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </div>

        {/* Next Button */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden md:flex">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Next Package"
            className="rounded-full bg-white/20 hover:bg-white/30 text-white"
            onClick={() => instanceRef.current?.next()}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Slider */}
        <div ref={sliderRef} className="keen-slider">
          {categories.map((c) => (
            <div key={c.id} className="keen-slider__slide">
              <Link href={`/category/${c.id}`}>
                <div className="w-full  h-48 lg:w-48 rounded-full bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col justify-center items-center p-4">
                  {c.imageUrl && (
                    <img
                      src={c.imageUrl}
                      alt={c.name}
                      className="w-full h-24 object-cover rounded-md mb-2"
                    />
                  )}
                  <h3 className="font-semibold text-foreground text-sm text-center line-clamp-2">
                    {c.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 text-center line-clamp-2">
                    {c.description}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* View All */}
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
