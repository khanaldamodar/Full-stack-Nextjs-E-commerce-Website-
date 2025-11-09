"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PackageType } from "@/components/Homepage-components/Packages";

const Package = ({ title, desc, imageUrl, price }: PackageType) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-white shadow-xl rounded-2xl flex flex-col items-center justify-between p-4 text-center w-full max-w-sm hover:shadow-2xl transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative w-full h-48 rounded-xl overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-3 mt-4">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800">
          {title}
        </h3>
        <p className="text-gray-500 text-sm md:text-base px-3">
          {desc.length > 60 ? desc.slice(0, 60) + "..." : desc}
        </p>

        {/* Price & Button Section */}
        <div className="flex items-center justify-between px-3 mt-4">
          <p className="text-[#d86d38] text-lg md:text-xl font-bold">
            Rs. {price}
          </p>
          <motion.button
            whileHover={{
              scale: 1.1,
              backgroundColor: "#c85a2e",
              boxShadow: "0 0 15px rgba(216,109,56,0.5)",
            }}
            transition={{ duration: 0.3 }}
            className="bg-secondary text-white px-4 py-2 rounded-md font-medium shadow-md hover:shadow-lg"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Package;
