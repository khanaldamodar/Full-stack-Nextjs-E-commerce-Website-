"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { usePost } from "@/services/usePost";

interface PackageType {
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
}

export default function Page() {
  const router = useRouter();
  const { postData, loading, error } = usePost<PackageType>("http://localhost:3000/api/packages");

  const [packageData, setPackageData] = useState({
    name: "",
    description: "",
    price: "",       // 👈 make these empty strings
    discount: "",
    stock: "",
    isActive: true,
    isFeatured: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    const parsedValue =
      type === "radio"
        ? value === "true"
        : value;

    setPackageData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleAddBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = Cookies.get("token");

    // Convert string numbers back to numbers before sending
    const formattedData: PackageType = {
      ...packageData,
      price: Number(packageData.price),
      discount: Number(packageData.discount),
      stock: Number(packageData.stock),
    };

    try {
      const data = await postData(formattedData, token);
      alert("Package added successfully!");

      setPackageData({
        name: "",
        description: "",
        price: "",
        discount: "",
        stock: "",
        isActive: true,
        isFeatured: false,
      });

      // Optional: router.push("/packages");
    } catch (err) {
      console.error(err);
      alert(error?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-3 gap-6 bg-gradient-to-t from-green-700 to-green-400 w-full rounded p-5">
      <h1 className="text-2xl text-white font-bold text-center mb-2 pt-2">Add Packages</h1>

      <form className="w-full" onSubmit={handleAddBrand}>
        <div className="rounded-xl p-4 gap-4 shadow-lg grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">

          {/* Package Name */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="name" className="text-xl text-white">Package Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={packageData.name}
              onChange={handleChange}
              placeholder="Package Name"
              className="p-3 bg-green-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-green-700 w-full"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="description" className="text-xl text-white">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={packageData.description}
              onChange={handleChange}
              placeholder="Package Description"
              className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900 w-full"
              required
            />
          </div>

          {/* Price */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="price" className="text-xl text-white">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={packageData.price}
              onChange={handleChange}
              placeholder="Price"
              min="0"
              className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900 w-full"
              required
            />
          </div>

          {/* Discount */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="discount" className="text-xl text-white">Discount</label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={packageData.discount}
              onChange={handleChange}
              placeholder="Discount"
              min="0"
              className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900 w-full"
            />
          </div>

          {/* Stock */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="stock" className="text-xl text-white">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={packageData.stock}
              onChange={handleChange}
              placeholder="Stock"
              min="0"
              className="p-3 bg-zinc-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-zinc-900 w-full"
            />
          </div>

          {/* Featured */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-xl text-white">Featured</label>
            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="isFeatured"
                  value="true"
                  checked={packageData.isFeatured === true}
                  onChange={handleChange}
                  className="w-4 h-4 accent-zinc-900"
                /> Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="isFeatured"
                  value="false"
                  checked={packageData.isFeatured === false}
                  onChange={handleChange}
                  className="w-4 h-4 accent-zinc-900"
                /> No
              </label>
            </div>
          </div>

          {/* Active */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-xl text-white">Active</label>
            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="isActive"
                  value="true"
                  checked={packageData.isActive === true}
                  onChange={handleChange}
                  className="w-4 h-4 accent-zinc-900"
                /> Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="isActive"
                  value="false"
                  checked={packageData.isActive === false}
                  onChange={handleChange}
                  className="w-4 h-4 accent-zinc-900"
                /> No
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="col-span-full flex justify-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-white hover:bg-green-300 text-black cursor-pointer font-bold py-3 rounded-2xl transition-all duration-200 w-full max-w-md"
            >
              {loading ? "Submitting..." : "Add Package"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
