"use client";

import Image from "next/image";
import { useState } from "react";
import { 
  MdSpaceDashboard, 
  MdOutlineProductionQuantityLimits, 
  MdOutlineBrandingWatermark 
} from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { PiPackageFill } from "react-icons/pi";
import { TfiGallery } from "react-icons/tfi";
import { IoMdSettings } from "react-icons/io";

export default function Page() {
  const [activeView, setActiveView] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <MdSpaceDashboard /> },
    { id: "category", label: "Category", icon: <BiSolidCategoryAlt /> },
    { id: "products", label: "Products", icon: <MdOutlineProductionQuantityLimits /> },
    { id: "brands", label: "Brands", icon: <MdOutlineBrandingWatermark /> },
    { id: "package", label: "Package", icon: <PiPackageFill /> },
    { id: "gallery", label: "Gallery", icon: <TfiGallery /> },
    { id: "settings", label: "Settings", icon: <IoMdSettings /> },
  ];

  return (
    <div className="flex h-screen">
      
      <aside className="w-60 bg-zinc-800 p-6 flex flex-col justify-center items-center ">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`text-white w-full py-3 px-2 flex items-center justify-center gap-2 transition ${
              activeView === item.id ? "bg-zinc-600" : "hover:bg-zinc-700"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}

        
        <div className="mt-auto flex items-center  gap-3 p-4 bg-zinc-900 rounded-xl">
          <Image
            src="/logo.jpeg"
            alt="Shop Logo"
            width={40}
            height={40}
            className="rounded-full size-10"
          />
          <span className="text-white">
            Set <span className="text-green-400">Nepal</span>
          </span>
        </div>
      </aside>

      
      <main className="flex-1 bg-zinc-700 p-6 text-white">
        <h2 className="text-2xl mb-4 capitalize">
          {activeView}
        </h2>

        
        {activeView === "dashboard" && <p>Welcome to Dashboard</p>}
        {activeView === "category" && <p>Category Section</p>}
        {activeView === "products" && <p>Products Section</p>}
        {activeView === "brands" && <p>Brands Section</p>}
        {activeView === "package" && <p>Package Section</p>}
        {activeView === "gallery" && <p>Gallery Section</p>}
        {activeView === "settings" && <p>Settings Section</p>}
      </main>
    </div>
  );
}
