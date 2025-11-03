"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  MdSpaceDashboard,
  MdOutlineProductionQuantityLimits,
  MdOutlineBrandingWatermark,
  MdOutlinePayments,
} from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { PiPackageFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";

export default function Sidebar() {
  const [activeView, setActiveView] = useState("dashboard");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const savedEmail = Cookies.get("email");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  type MenuItem = {
    id: string;
    label: string;
    icon: React.ReactNode;
    path?: string;
  };

  const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Dashboard", icon: <MdSpaceDashboard />, path: "/admin" },
    { id: "brands", label: "Brands", icon: <MdOutlineBrandingWatermark />, path: "/admin/brands" },
    { id: "category", label: "Categories", icon: <BiSolidCategoryAlt />, path: "/admin/categories" },
    { id: "orders", label: "Orders", icon: <TbTruckDelivery />, path: "/admin/orders" },
    { id: "package", label: "Packages", icon: <PiPackageFill />, path: "/admin/packages" },
    { id: "payments", label: "Payments", icon: <MdOutlinePayments />, path: "/admin/payments" },
    { id: "products", label: "Products", icon: <MdOutlineProductionQuantityLimits />, path: "/admin/products" },
    { id: "settings", label: "Settings", icon: <IoMdSettings />, path: "/admin/settings" },
  ];

  const handleClick = (item: MenuItem) => {
    setActiveView(item.id);
    if (item.path) router.push(item.path);
  };

  return (
    <aside className="w-60 bg-green-100 p-4 flex flex-col justify-start items-center">
      {/* Menu Buttons */}
      <div className="flex flex-col w-full gap-3"> 
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item)}
            className={`w-full text-white flex items-center justify-start gap-2
            rounded-md transition-all duration-200 py-2 px-3
            ${
              activeView === item.id
                ? "bg-green-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center gap-3 p-3 bg-green-600 rounded-xl w-full">
        <Image
          src="/logo.jpeg"
          alt="Shop Logo"
          width={40}
          height={40}
          className="rounded-full size-10"
        />
        <div className="text-white text-sm truncate">
          <div>
            Set <span className="text-green-400">Nepal</span>
          </div>
          <div className="text-gray-300 truncate text-xs">
            {email || "guest@example.com"}
          </div>
        </div>
      </div>
    </aside>
  );
}
