"use client";

import React from 'react'
import { useRouter } from "next/navigation";
import CRUDTable from "@/components/admin-components/CRUDTable";

const page = () => {
      const router = useRouter();

  return (
    <div className='h-screen'>
        {/* header */}
        <div className='w-full bg-zinc-700 flex items-center p-4 shadow-md justify-between '>
            <h3 className='text-2xl text-white font-bold'>Category</h3>
            <button onClick={() => router.push("/admin/categories/add")} className='bg-zinc-600 text-white px-4 py-2  hover:bg-zinc-700 transition '>Add Category</button>
        </div>

        <div>
      <CRUDTable endpoint="Categories" columns={["name"]} />
        </div>
        
    </div>
  )
}

export default page