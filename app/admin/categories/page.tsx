import React from 'react'

const page = () => {
  return (
    <div className='h-screen bg-red-500 '>
        {/* header */}
        <div className='w-full bg-zinc-700 flex items-center p-4 shadow-md justify-between '>
            <h3 className='text-2xl text-white font-bold'>Categories</h3>
            <button className='bg-zinc-600 text-white px-4 py-2  hover:bg-zinc-700 transition '>Add Category</button>
        </div>
        
    </div>
  )
}

export default page