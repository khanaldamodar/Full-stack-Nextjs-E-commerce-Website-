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
    <aside
      className="w-60 p-4 flex flex-col justify-start items-start"
      style={{ backgroundColor: "#aec958" }}
    >
      {/* Menu Items as list, not buttons */}
      <ul className="flex flex-col w-full gap-4">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => handleClick(item)}
            className={`flex items-center gap-3 cursor-pointer px-2 py-2 rounded transition-colors duration-200
              ${activeView === item.id ? "bg-green-700 text-white" : "text-white hover:bg-green-600"}`}
          >
            {item.icon}
            <span className="text-base font-medium">{item.label}</span>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="mt-auto flex items-center gap-3 p-3 bg-green-700 rounded-xl w-full">
        <Image
          src="/logo.jpeg"
          alt="Shop Logo"
          width={40}
          height={40}
          className="rounded-full size-10"
        />
        <div className="text-white text-sm truncate">
          <div>
            Set <span className="text-green-200">Nepal</span>
          </div>
          <div className="text-gray-100 truncate text-xs">
            {email || "guest@example.com"}
          </div>
        </div>
      </div>
    </aside>
  );
}
