import React from 'react'
import Image from "next/image";
const page = () => {
  return (
    <div>
      {/* Sidebar */}
      <div className='flex h-screen'>
        <div className='w-2/10 bg-zinc-800 h-full flex flex-col mx-auto justify-start items-start pt-10 text-center relative'>
        
          {/* Sidebar Content */}
          <a href="#" className='text-white pt-4 font-medium text border-b border-zinc-700 w-full'>DashBoard</a>
          <a  href="#" className='text-white pt-4 font-medium text border-b border-zinc-700 w-full'>Category</a>
          <a  href="#" className='text-white pt-4 font-medium text border-b border-zinc-700 w-full'>Products</a>
          <a  href="#" className='text-white pt-4 font-medium text border-b border-zinc-700 w-full'>Brands</a>
          <a  href="#" className='text-white pt-4 font-medium text border-b border-zinc-700 w-full'>Package</a>
          <a  href="#" className='text-white pt-4 font-medium text border-b border-zinc-700 w-full'>Setting</a>
          <a  href="#" className='text-white pt-4 font-medium text border-b border-zinc-700 w-full'>Gallery</a>

        {/* bottom content */}
        <div className='absolute left-0 bottom-0 bg-zinc-900 p-4 w-full flex gap-5 items-center justify-start'>
          <div>
            <Image
                          src="/logo.jpeg"
                          alt="Shop Logo"
                          width={32}
                          height={32}
                          className="size-12 rounded-full"
                        />
          </div>

          <div className='text-white '>
            <span className='text-green-400'>Set </span> Nepal
            </div>
        </div>
        </div>

        {/* Main Content Area */}
        <div className='bg-red-900 h-full w-8/10'></div>
      </div>
    </div>
  )
}

export default page
