"use client";

import { useState } from "react";
import Image from "next/image";
import { MdSpaceDashboard, MdOutlineProductionQuantityLimits, MdOutlineBrandingWatermark } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { PiPackageFill } from "react-icons/pi";
import { TfiGallery } from "react-icons/tfi";
import { IoMdSettings } from "react-icons/io";

export default function Page() {
  const [activeMenu, setActiveMenu] = useState<string | null>("category");
  const [activeView, setActiveView] = useState<string>("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <MdSpaceDashboard /> },
    { id: "category", label: "Category", icon: <BiSolidCategoryAlt />, children: ["create", "view"] },
    { id: "products", label: "Products", icon: <MdOutlineProductionQuantityLimits />, children: ["create", "view"] },
    { id: "brands", label: "Brands", icon: <MdOutlineBrandingWatermark />, children: ["create", "view"] },
    { id: "package", label: "Package", icon: <PiPackageFill />, children: ["create", "view"] },
    { id: "gallery", label: "Gallery", icon: <TfiGallery />, children: ["create", "view"] },
    { id: "settings", label: "Settings", icon: <IoMdSettings /> },
  ];

  return (
    <div className="flex h-screen">
      <aside className="w-60 bg-zinc-800 p-6 flex flex-col">
        {menuItems.map((item) => (
          <div key={item.id} className="mb-1">
            <button
              onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)}
              className={`text-white w-full py-3 px-2 flex justify-between items-center rounded-xl ${activeMenu === item.id ? "bg-zinc-600" : "hover:bg-zinc-700"}`}
            >
              <span className="flex items-center gap-2">{item.icon} {item.label}</span>
              {item.children && <span>{activeMenu === item.id ? "▴" : "▾"}</span>}
            </button>

            {item.children && activeMenu === item.id && (
              <div className="ml-6 mt-1 flex flex-col gap-2">
                {item.children.map((child) => (
                  <button
                    key={child}
                    onClick={() => setActiveView(`${item.id}-${child}`)}
                    className={`text-white text-sm p-2 rounded-lg text-left w-full hover:bg-zinc-700 ${activeView === `${item.id}-${child}` ? "bg-zinc-600" : ""}`}
                  >
                    {child === "create" ? "➕" : "📄"} {child.charAt(0).toUpperCase() + child.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="mt-auto flex items-center gap-3 p-4 bg-zinc-900 rounded-xl">
          <Image src="/logo.jpeg" alt="Shop Logo" width={40} height={40} className="rounded-full size-10" />
          <span className="text-white">Set <span className="text-green-400">Nepal</span></span>
        </div>
      </aside>

      <main className="flex-1 bg-zinc-700 p-6 text-white">
        <h2 className="text-2xl mb-4">
          {activeView === "dashboard" ? "Dashboard" : activeView.replace('-', ' ').replace(/^\w/, (c) => c.toUpperCase())}
        </h2>
        <div>
          {activeView === "category-view" && (
          <div>
            <h2 className="text-2xl mb-4">Category — View</h2>
            {/* Replace with your table/list */}
            <ul className="space-y-2">
              <li className="p-3 bg-zinc-800 rounded-md">Category 1</li>
              <li className="p-3 bg-zinc-800 rounded-md">Category 2</li>
            </ul>
          </div>
        )}

        {activeView === "products-create" && (
          <div>
            <h2 className="text-2xl mb-4">Products — Create</h2>
            <div>Product form here</div>
          </div>
        )}

        {activeView === "products-view" && (
          <div>
            <h2 className="text-2xl mb-4">Products — View</h2>
            <div>Product list here</div>
          </div>
        )}

        {activeView === "brands-create" && (
          <div>
            <h2 className="text-2xl mb-4">Brands — Create</h2>
            <div>Brand form here</div>
          </div>
        )}

        {activeView === "brands-view" && (
          <div>
            <h2 className="text-2xl mb-4">Brands — View</h2>
            <div>Brand list here</div>
          </div>
        )}

        </div>
      </main>
    </div>
  );
}