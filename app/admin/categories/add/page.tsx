"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { usePost } from "@/services/usePost";

interface CategoryType {
  name: string;
}

export default function Page() {
   const router = useRouter();
    const [category, setCategory] = useState<CategoryType>({ name: "" });
  
    const { postData, loading, error } = usePost<CategoryType>("http://localhost:3000/api/categories");
  
    const handleAddCategory = async (e: React.FormEvent) => {
      e.preventDefault();
      const token = Cookies.get("token");
  
      try {
        const data = await postData(category, token);
        alert("Category added successfully!");
        setCategory({ name: "" });
              } catch (err) {
        console.error(err);
        alert(error?.message || "Something went wrong. Please try again.");
      }
  };

  return (
    <div className="flex items-center justify-center mx-auto ">
        <div className="flex-col flex items-center justify-center mt-3 gap-6 bg-linear-to-t from-green-700 to-green-400 w-2/5 rounded p-5">
      <h1 className="text-2xl text-white font-bold text-center mb-2 pt-4">Add Categories</h1>
      <form onSubmit={handleAddCategory}>
        <div className="rounded-xl p-2 gap-4 shadow-lg flex justify-center items-center mx-auto ">
          
                <div className="flex-col flex gap-4">
                <label htmlFor="name" className="text-xl text-white">Category Name</label>
                <input 
                type="text" 
                id="name" 
                name="name" 
                required
                value={category.name}
                onChange={(e) => setCategory({ name: e.target.value })} 
                className="p-3 bg-green-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-green-700 w-full"
                placeholder="Category Name"
                />
                </div>


        </div>
        <div className="flex justify-center mx-auto items-center pb-2">
         <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-white hover:bg-zinc-100 text-black cursor-pointer font-bold py-3 rounded-2xl transition-all duration-200 w-full"
            >
              {loading ? "Adding..." : "Add"}
            </button>
        </div>
        
      </form>
    </div>
    </div>
  );
}
