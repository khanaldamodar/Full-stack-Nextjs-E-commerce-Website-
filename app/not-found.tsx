import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='font-poppins flex justify-center items-center w-auto h-screen'>
        <div className='bg-white p-10 rounded-2xl flex flex-col items-center justify-center gap-6'>
            <h1 className='text-6xl font-bold text-secondary '>404 -  Page Not Found !</h1>
            <p>Go to the Home page</p>
            <Link href={'/'}>
            
            <button className='bg-secondary text-white p-2 rounded-xl cursor-pointer'>Home</button>
            </Link>

        </div>
    </div>
  )
}

export default page