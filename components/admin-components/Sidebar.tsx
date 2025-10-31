// Sidebar.jsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdSpaceDashboard, MdOutlineProductionQuantityLimits, MdOutlineBrandingWatermark } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { PiPackageFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { MdOutlinePayments } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";


export default function Sidebar() {
  const [activeView, setActiveView] = useState("dashboard");
  const router = useRouter();

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

  const handleClick = (item:MenuItem) => {
    setActiveView(item.id);
    if (item.path) router.push(item.path);
  };

  return (
    <aside className="w-60 bg-zinc-800 p-6 flex flex-col justify-start items-center">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item)}
          className={`text-white w-full py-3 px-2 flex items-center justify-start gap-2 transition ${
            activeView === item.id ? "bg-zinc-600" : "hover:bg-zinc-700"
          }`}
        >
          {item.icon}
          {item.label}
        </button>
      ))}

      {/* Footer */}
      <div className="mt-auto flex items-center gap-3 p-4 bg-zinc-900 rounded-xl">
        <Image src="/logo.jpeg" alt="Shop Logo" width={40} height={40} className="rounded-full size-10" />
        <span className="text-white">
          Set <span className="text-green-400">Nepal</span>
        </span>
      </div>
    </aside>
  );
}
