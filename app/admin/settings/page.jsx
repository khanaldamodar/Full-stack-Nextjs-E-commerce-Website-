"use client";

import React from "react";
import {
  MdOutlineLocalPostOffice,
  MdOutlinePhone,
  MdShortText,
} from "react-icons/md";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { IoLogoFacebook } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { RiInstagramFill } from "react-icons/ri";
import { TbFavicon } from "react-icons/tb";
import { FcAbout } from "react-icons/fc";

const Page = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1">
        <div className="bg-white shadow-md rounded-xl p-6 md:p-8">
          
          <h2 className="text-lg font-semibold text-gray-700 underline mb-4">
            Company Information
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Company Name"
              icon={<HiOutlineOfficeBuilding className="text-white text-lg" />}
              placeholder="Enter company name"
            />

            <InputField
              label="E-mail"
              type="email"
              icon={<MdOutlineLocalPostOffice className="text-white text-lg" />}
              placeholder="Enter company email"
            />

            
            <InputField
              label="Phone Number 1"
              icon={<MdOutlinePhone className="text-white text-lg" />}
              placeholder="Enter primary phone number"
            />

            <InputField
              label="Phone Number 2"
              icon={<MdOutlinePhone className="text-white text-lg" />}
              placeholder="Enter secondary phone number"
            />

            <InputField
              label="Address"
              icon={<IoLocation className="text-white text-lg" />}
              placeholder="Enter company address"
            />

            <InputField
              label="Favicon"
              type="file"
              icon={<TbFavicon className="text-white text-lg" />}
            />

            
            <div className="flex flex-col gap-1.5 md:col-span-1">
              <Label
                label="About 1"
                icon={<FcAbout className="text-white text-lg" />}
              />
              <textarea
                placeholder="Write something about the company..."
                className="border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 transition resize-y h-20"
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-1">
              <Label
                label="About 2"
                icon={<FcAbout className="text-white text-lg" />}
              />
              <textarea
                placeholder="Additional information..."
                className="border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 transition resize-y h-20"
              />
            </div>

            <InputField
              label="Slogan"
              icon={<MdShortText className="text-white text-lg" />}
              placeholder="Enter company slogan"
            />
          </form>

          
          <h2 className="text-lg font-semibold text-gray-700 underline mb-6 mt-6">
            Social Media Links
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Facebook"
              icon={<IoLogoFacebook className="text-white text-lg" />}
              placeholder="Enter Facebook link"
            />

            <InputField
              label="Instagram"
              icon={<RiInstagramFill className="text-white text-lg" />}
              placeholder="Enter Instagram link"
            />
          </div>

          
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-[#aec958] hover:bg-[#9bb648] text-white px-6 py-2.5 rounded-md font-medium text-sm transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};


const InputField = ({ label, type = "text", icon, placeholder }) => (
  <div className="flex flex-col gap-1.5">
    <Label label={label} icon={icon} />
    <input
      type={type}
      placeholder={placeholder}
      className="border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 transition"
    />
  </div>
);


const Label = ({ label, icon }) => (
  <label className="text-gray-700 text-sm font-medium flex items-center gap-2.5">
    <span
      className="w-8 h-8 flex items-center justify-center rounded-full"
      style={{ backgroundColor: "#aec958" }}
    >
      {icon}
    </span>
    {label}
  </label>
);

export default Page;
