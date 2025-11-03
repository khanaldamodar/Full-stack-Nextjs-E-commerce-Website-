"use client";

import React from 'react'
import { useRouter } from "next/navigation";
import CRUDTable from "@/components/admin-components/CRUDTable";

const page = () => {
      const router = useRouter();

  return (
    <div className='h-screen'>
        {/* header */}
        <div className="w-full bg-white flex items-center p-4 shadow-md justify-between">
            <h3 className='text-2xl text-zinc-800 font-bold'>Category</h3>
            <button onClick={() => router.push("/admin/categories/add")} className="bg-green-600 text-white px-4 py-2 hover:bg-green-100 transition">Add Category</button>
        </div>

        <div>
          
        </div>
        
    </div>
  )
}

export default page