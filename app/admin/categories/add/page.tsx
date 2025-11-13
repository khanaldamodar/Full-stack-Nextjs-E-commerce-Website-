"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { usePost } from "@/services/usePost";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CategoryType {
  name: string;
}

export default function AddCategoryPage() {
  const router = useRouter();
  const [category, setCategory] = useState<CategoryType>({ name: "" });

  const { postData, loading, error } = usePost<CategoryType>("/api/categories");

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = Cookies.get("token");

    try {
      await postData(category, token);
      toast.success("Category added successfully!");
      setCategory({ name: "" });
    } catch (err) {
      console.error(err);
      toast.error(error?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#eaf2e3] via-[#f5f7fa] to-[#dfe9f3] font-poppins">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 border border-[#e1e8ed] transition-all duration-300 hover:shadow-[#aec958]/40">
        <h1 className="text-3xl font-bold text-center text-[#2d3748] mb-6">
          Add New Category
        </h1>

        <form onSubmit={handleAddCategory} className="space-y-6">
          {/* Input Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Category Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={category.name}
              onChange={(e) => setCategory({ name: e.target.value })}
              placeholder="Enter category name..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#aec958] focus:border-[#aec958] outline-none transition-all duration-200 text-gray-800"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 shadow-md ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#aec958] hover:bg-[#99b84f] text-white"
              }`}
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
        </form>

        {/* Back to Dashboard */}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.back()}
            className="text-[#4998d1] hover:text-[#3b7aa8] font-medium transition-colors"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
