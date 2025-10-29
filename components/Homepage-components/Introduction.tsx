import React from 'react'
import Heading from '../global/Heading'

const Introduction = () => {
  return (
    <div className='flex flex-col items-center justify-center py-30 md:py-30 font-poppins sm:px-15 lg:px-150 text-white gap-5'>
        <Heading title='Set Nepal'/>
        <p className='text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum tempora quis sed eum assumenda numquam adipisci aliquam quos, suscipit itaque, voluptas earum, fugit dolorem possimus debitis vel pariatur laborum necessitatibus?</p>
        <p className='bg-secondary p-2 rounded-xl '>Inquery Number: 1234567890</p>
    </div>
  )
}

export default Introduction