"use client";

import React from 'react'
import { useRouter } from "next/navigation";
import CRUDTable from "@/components/admin-components/CRUDTable";

const page = () => {
      const router = useRouter();

  return (
    <div className='h-screen bg-red-500 '>
        {/* header */}
        <div className='w-full bg-zinc-700 flex items-center p-4 shadow-md justify-between '>
            <h3 className='text-2xl text-white font-bold'>Packages</h3>
            <button onClick={() => router.push("/admin/packages/add")} className='bg-zinc-600 text-white px-4 py-2  hover:bg-zinc-700 transition '>Add Package</button>
        </div>
        
        <div>
          <div>
                      <CRUDTable endpoint="packages" columns={["id"]} />
                   </div>
        </div>
    </div>
  )
}

export default page;