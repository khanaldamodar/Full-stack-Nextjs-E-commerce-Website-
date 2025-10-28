"use client";

import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Heading from "../global/Heading";
import { AutoplayPlugin } from "../global/SliderAutoplay";

interface Certificate {
  id: number;
  clientName: string;
  image: string;
  description?: string;
}

interface HappyClientsSliderProps {
  certificates: Certificate[];
}


const HappyClientsSlider: React.FC<HappyClientsSliderProps> = ({ certificates }) => {



  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
  {
    loop: true,
    slides: {
      perView: 3,
      spacing: 24,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 2, spacing: 16 },
      },
      "(max-width: 768px)": {
        slides: { perView: 1, spacing: 12 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  },
  [AutoplayPlugin(3000)] // 👈 autoplay every 3s
);


  return (
    <div className="relative w-full py-16 px-6 md:px-12 flex flex-col items-center gap-12 ">
      <Heading title="Our Happy Clients" />

      {/* Arrows */}
      <button
        onClick={() => instanceRef.current?.prev()}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/90 shadow-lg rounded-full p-2 hover:bg-gray-100 z-10"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>

      <div ref={sliderRef} className="keen-slider w-full max-w-7xl">
        {certificates.map((item) => (
          <div
            key={item.id}
            className="keen-slider__slide flex justify-center items-center p-2"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 250, damping: 15 }}
              className="bg-white w-full h-full rounded-2xl shadow-md overflow-hidden flex flex-col items-center p-6 hover:shadow-xl transition-all duration-300 min-h-[400px]"
            >
              <div className="relative w-full flex justify-center">
                <Image
                  src={item.image}
                  alt={item.clientName}
                  width={400}
                  height={280}
                  className="rounded-lg object-contain transition-transform duration-300"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                {item.clientName}
              </h3>
              <p className="text-sm text-gray-500 text-center mt-2">
                {item.description ||
                  "We are proud to collaborate with amazing clients around the world."}
              </p>
            </motion.div>
          </div>
        ))}
      </div>

      <button
        onClick={() => instanceRef.current?.next()}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/90 shadow-lg rounded-full p-2 hover:bg-gray-100 z-10"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {certificates.map((_, idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === idx ? "bg-green-600 scale-125" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HappyClientsSlider;
