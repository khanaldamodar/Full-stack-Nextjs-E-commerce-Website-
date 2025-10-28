"use client";

import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AutoplayPlugin } from "./SliderAutoplay";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description?: string;
}

interface ProductSliderProps {
  products: Product[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 4,
      spacing: 20,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 2, spacing: 15 },
      },
      "(max-width: 768px)": {
        slides: { perView: 1, spacing: 10 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  },
  [AutoplayPlugin(3000)]
);

  return (
    <div className="relative w-full py-10 px-8 font-poppins">
      {/* Left Arrow */}
      <button
        onClick={() => instanceRef.current?.prev()}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-lg rounded-full p-2 hover:bg-gray-100 z-10"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>

      {/* Slider */}
      <div ref={sliderRef} className="keen-slider">
        {products.map((product, index) => (
          <div
            key={index}
            className="keen-slider__slide min-w-0 bg-white rounded-2xl shadow-md overflow-hidden flex flex-col justify-between"
          >
            {/* Animate only inner content to prevent layout shift */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col h-full"
            >
              <div className="relative group overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-4 flex flex-col grow">
                <h3 className="font-semibold text-lg mb-1 text-gray-800 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                  {product.description ||
                    "High-quality musical instrument built for performance and durability."}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-semibold text-[#d86d38]">
                    {product.price}
                  </span>
                  <button className="bg-secondary text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-primary transition">
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => instanceRef.current?.next()}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-lg rounded-full p-2 hover:bg-gray-100 z-10"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {products.map((_, idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === idx
                ? "bg-green-600 scale-110"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
