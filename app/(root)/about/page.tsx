"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingBag, Heart, Users, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <section className="min-h-screen py-30 px-5 md:px-10 flex flex-col items-center font-poppins ">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl w-full text-center mb-20"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          About <span className="text-secondary">Set Nepal</span>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
          We bring you the best instruments and products you love — with passion, precision, and purpose.  
          Our goal is to make quality accessible, reliable, and affordable to everyone in Nepal.
        </p>
      </motion.div>

      {/* Story Section */}
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center mb-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-[350px] md:h-[420px] rounded-3xl overflow-hidden shadow-xl"
        >
          <Image
            src="/logo.jpeg" // Replace with your own image
            alt="Our Story"
            fill
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Our Journey 🚀
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Founded with a vision to empower local buyers with access to quality instruments,
            Set Nepal started as a small online store in Kathmandu.  
            Over the years, we’ve grown into a trusted name that connects customers with authentic,
            affordable, and durable products.
          </p>
          <p className="text-gray-600 text-lg mt-4 leading-relaxed">
            Our mission is to redefine online shopping in Nepal with transparency, 
            fast delivery, and reliable customer service.
          </p>
        </motion.div>
      </div>

      {/* Values Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl w-full text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          What We Stand For
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Our core values guide everything we do — from sourcing products to delivering smiles.
        </p>
      </motion.div>

      {/* Values Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full mb-20">
        {[
          {
            icon: <ShoppingBag className="w-10 h-10 text-[#d86d38]" />,
            title: "Quality Products",
            desc: "We handpick every product to ensure durability, authenticity, and top-tier performance.",
          },
          {
            icon: <Heart className="w-10 h-10 text-[#d86d38]" />,
            title: "Customer Love",
            desc: "Every customer matters to us. Your satisfaction fuels our journey.",
          },
          {
            icon: <Users className="w-10 h-10 text-[#d86d38]" />,
            title: "Community First",
            desc: "We believe in uplifting local businesses and supporting Nepal’s digital growth.",
          },
          {
            icon: <Globe className="w-10 h-10 text-[#d86d38]" />,
            title: "Sustainability",
            desc: "We’re committed to responsible sourcing and eco-friendly packaging.",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(216,109,56,0.2)",
            }}
            className="bg-white/80 backdrop-blur-sm shadow-md rounded-2xl p-8 flex flex-col items-center text-center space-y-3"
          >
            {item.icon}
            <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Join Our Journey 💫
        </h2>
        <p className="text-gray-600 mb-8">
          Be part of a growing eCommerce community that values quality, innovation, and trust.  
          Discover new arrivals, special offers, and more — only at Set Nepal.
        </p>
        <motion.a
          href="/products"
          whileHover={{
            scale: 1.05,
            backgroundColor: "#c15a2f",
            boxShadow: "0 0 20px rgba(216,109,56,0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-secondary text-white font-semibold px-8 py-3 rounded-full transition-all duration-300"
        >
          Explore Our Products
        </motion.a>
      </motion.div>

      {/* Decorative Circles */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-[#d86d38]/10 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-orange-300/20 blur-3xl rounded-full animate-pulse" />
    </section>
  );
}
