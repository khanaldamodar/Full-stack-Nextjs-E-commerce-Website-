"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, User, Menu, X, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { useCartContext } from "@/context/CartContext";
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCartContext();

  // ✅ Menu items
  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Galleries", href: "/galleries" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full font-poppins fixed top-0 left-0 z-50">
      {/* 🔹 Top Info Bar */}
      <div className="text-black bg-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex  md:flex-row items-center justify-between gap-2 md:gap-0">
          {/* Contact Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>+977 9866437014</span>
            </div>
            <div className="hidden md:flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>info@setnepal.com</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="#" target="_blank" className="hover:text-blue-500 transition">
              <FaFacebookF size={14} />
            </a>
            <a href="#" target="_blank" className="hover:text-red-700 transition">
              <FaInstagram size={14} />
            </a>
            <a href="#" target="_blank" className="hover:text-blue-600 transition">
              <FaTwitter size={14} />
            </a>
            <a href="#" target="_blank" className="hover:text-black-600 transition">
              <FaTiktok size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* 🔹 Main Navbar */}
      <div className="bg-secondary shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.jpeg"
              alt="Shop Logo"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full"
            />
            <span className="text-xl font-bold tracking-tight text-white">
              <span className="text-primary">Set</span> Nepal
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-black hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Icons & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5 text-white hover:text-primary" />
              <span className="absolute -right-2 -top-2 h-4 w-4 text-[10px] flex items-center justify-center rounded-full bg-black text-white">
                {itemCount}
              </span>
            </Link>

            <Link href="/account">
              <User className="h-5 w-5 text-white hover:text-primary" />
            </Link>

            {/* Hamburger Button */}
            <button
              className="block md:hidden text-white"
              aria-label="Toggle Menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Mobile Nav */}
      {isMenuOpen && (
        <div className="border-t bg-primary md:hidden animate-slide-down">
          <nav className="flex flex-col space-y-1 p-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="py-2 px-2 rounded hover:bg-gray-50 text-white hover:text-black"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
