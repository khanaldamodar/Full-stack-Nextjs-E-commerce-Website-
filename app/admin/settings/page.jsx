"use client";

import React, { useState } from "react";
import {
  MdSpaceDashboard,
  MdOutlineProductionQuantityLimits,
  MdOutlineBrandingWatermark,
  MdOutlinePayments,
} from "react-icons/md";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoFacebook } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { MdOutlinePhone } from "react-icons/md";

const Page = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1">
        <div className="bg-white shadow-lg rounded-2xl p-8">
          {/* Company Info Section */}
          <h2 className="text-xl font-bold text-gray-700 underline mb-5">
            Company Information
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Company Name */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-medium flex items-center gap-3">
                <span
                  className="w-10 h-10 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: "#aec958" }}
                >
                  <HiOutlineOfficeBuilding className="text-white text-xl" />
                </span>
                Company Name
              </label>
              <input
                type="text"
                placeholder="Enter company name"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-lime-500 transition"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-medium flex items-center gap-3">
                <span
                  className="w-10 h-10 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: "#aec958" }}
                >
                  <MdOutlineLocalPostOffice className="text-white text-xl" />
                </span>
                E-mail
              </label>
              <input
                type="email"
                placeholder="Enter company email"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-lime-500 transition"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-medium flex items-center gap-3">
                <span
                  className="w-10 h-10 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: "#aec958" }}
                >
                  <MdOutlinePhone className="text-white text-xl" />
                </span>
                Phone Number
              </label>
              <input
                type="text"
                placeholder="Enter phone number"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-lime-500 transition"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-medium flex items-center gap-3">
                <span
                  className="w-10 h-10 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: "#aec958" }}
                >
                  <IoLocation className="text-white text-xl" />
                </span>
                Address
              </label>
              <input
                type="text"
                placeholder="Enter company address"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-lime-500 transition"
              />
            </div>
          </form>

          {/* Social Media Section */}
          <h2 className="text-xl font-bold text-gray-700 underline mb-8 mt-6">
            Social Media Links
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Facebook */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-medium flex items-center gap-3">
                <span
                  className="w-10 h-10 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: "#aec958" }}
                >
                  <IoLogoFacebook className="text-white text-xl" />
                </span>
                Facebook
              </label>
              <input
                type="text"
                placeholder="Enter Facebook's Link"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-lime-500 transition"
              />
            </div>

            {/* Instagram */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-medium flex items-center gap-3">
                <span
                  className="w-10 h-10 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: "#aec958" }}
                >
                  <RiInstagramFill className="text-white text-xl" />
                </span>
                Instagram
              </label>
              <input
                type="text"
                placeholder="Enter Instagram's Link"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-lime-500 transition"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className="bg-[#aec958] hover:bg-[#9bb648] text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
