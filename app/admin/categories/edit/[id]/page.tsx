'use client'
import React from 'react'
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUpdate } from "@/services/useUpdate";

interface CategoryType {
  id: number;
  name: string;
}
export default function EditCategoryPage() {

    const params = useParams();
      const router = useRouter();
      const categoryId = Number(params?.id);
    
      const [category, setCategory] = useState<CategoryType | null>(null);
      const [name, setName] = useState("");
    
      const { updateData, loading: updating, error: updateError } = useUpdate<CategoryType>();

    useEffect(() => {
        const fetchCategory = async () => {
          try {
            const res = await fetch('/api/categories');
            const data: CategoryType[] = await res.json();
            const matchingCategory = data.find(b => b.id === categoryId);
            if (matchingCategory) {
              setCategory(matchingCategory);
              setName(matchingCategory.name);
            }
          } catch (err) {
            console.error(err);
          }
        };
    
        fetchCategory();
      }, [categoryId]);

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return;

    const updateCategory: any = { ...category, name};
    const result = await updateData(`categories`, updateCategory, "PATCH");
      if (result) {
      alert("Category updated successfully!");
      router.push("/admin/categories"); 
    }
  };
      if (!category) return <div className="p-6 text-white">Loading category...</div>;
  return (
    <div className="flex items-center justify-center mx-auto">
      <div className="flex-col flex items-center justify-center mt-3 gap-6 bg-linear-to-t from-green-700 to-green-400 w-2/5 rounded p-5">
        <h1 className="text-2xl text-white font-bold text-center mb-2 pt-4">Update Category</h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="rounded-xl p-2 gap-4 shadow-lg flex justify-center items-center mx-auto w-full">
            <div className="flex-col flex gap-4 w-full">
              <label htmlFor="name" className="text-xl text-white">Category Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="p-3 bg-green-900 text-white placeholder-zinc-400 rounded-2xl outline-none focus:ring-2 focus:ring-green-700 w-full"
              />
            </div>
          </div>

          <div className="flex justify-center mx-auto items-center pb-2 w-full">
            <button
              type="submit"
              disabled={updating}
              className="mt-4 bg-white hover:bg-green-300 text-black cursor-pointer font-bold py-3 rounded-2xl transition-all duration-200 w-full"
            >
              {updating ? "Updating..." : "Update"}
            </button>
          </div>
          {updateError && <div className="text-red-500 mt-2">{updateError}</div>}
        </form>
      </div>
    </div>
  )
}