"use client";

import React from "react";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="bg-secondary text-black pt-5 px-8 mt-16 font-poppins">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo & About */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
          <Image
          src={"/transparent.png"}
          width={80}
          height={50}
          alt="Logo"
          className="bg-white"
          />
          <h2 className="text-2xl font-bold text-white mb-4"><span className="text-primary">Set</span> Nepal</h2>

          </div>
          <p className="text-sm leading-relaxed text-black">
            Your trusted destination to get all the instruments you need.
            Providing high-quality, affordable products and services to bring
            creativity to life.
          </p>

          {/* Socials */}
          {/* <div className="flex gap-4 mt-5">
            <Link
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-green-600 transition"
            >
              <Facebook className="w-5 h-5 text-white" />
            </Link>
            <Link
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-pink-600 transition"
            >
              <Instagram className="w-5 h-5 text-white" />
            </Link>
            <Link
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-blue-500 transition"
            >
              <Twitter className="w-5 h-5 text-white" />
            </Link>
          </div> */}
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="hover:text-green-500 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="hover:text-green-500 transition-colors"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-green-500 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-green-500 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/faq"
                className="hover:text-green-500 transition-colors"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="hover:text-green-500 transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="hover:text-green-500 transition-colors"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-3 text-black">
          <h4 className="text-3xl font-bold text-white ml-7"><span className="text-primary">Set</span>Nepal</h4>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-green-500" />
              <span>01-5312298, 9851331773</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-green-500" />
              <span> info.setnepal@gmail.com</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-green-500" />
              <span>Kathmandu, Nepal</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-5   text-center text-sm text-black-500">
        <p>
          © {new Date().getFullYear()} <span className="text-green-500 font-medium">Set Nepal</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
