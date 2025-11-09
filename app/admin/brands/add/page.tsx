"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { usePost } from "@/services/usePost";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface BrandType {
  name: string;
}

export default function AddBrandPage() {
  const router = useRouter();
  const [brand, setBrand] = useState<BrandType>({ name: "" });

  const { postData, loading, error } = usePost<BrandType>(
    "/api/brands"
  );

  const handleAddBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = Cookies.get("token");

    try {
      const data = await postData(brand, token);
      toast.success("Brand added successfully!");
      setBrand({ name: "" });
    } catch (err) {
      console.error(err);
      toast.error(error?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center mx-auto">
      <div className="flex-col flex items-center justify-center mt-3 gap-6 w-2/5 rounded p-5 shadow-xl border-2 border-[#aec958]">
        <h1 className="text-2xl text-black font-bold text-center mb-2 pt-4">
          Add Brand
        </h1>
        <form onSubmit={handleAddBrand} className="w-full">
          <div className="rounded-xl p-2 gap-4 flex justify-center items-center mx-auto w-full">
            <div className="flex-col flex gap-4 w-full">
              <label htmlFor="name" className="text-xl text-black">
                Brand Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={brand.name}
                onChange={(e) => setBrand({ name: e.target.value })}
                className="p-3 text-black placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-[#aec958] w-full border border-[#aec958]"
                placeholder="Brand Name"
              />
            </div>
          </div>

          <div className="flex justify-center mx-auto items-center pb-2 w-full">
            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-[#4998d1] hover:bg-[#3b7aa8] text-white cursor-pointer font-bold py-3 rounded-2xl transition-all duration-200 w-full shadow-md"
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
