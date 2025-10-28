import React from 'react'
import Heading from '../global/Heading'

const FeatureProductsSection = () => {
  return (
    <div className='flex flex-col items-center justify-center text-white font-poppins  py-5 md:py-20 gap-5 md:gap-20'>
        {/* <Heading title='Feature Product'/> */}

        {/* There are 3 different sections in this component */}
        <div className=' flex flex-col md:flex-row items-center justify-center gap-5 md:gap-40'>

        <div className='flex items-center justify-center w-50 h-50 border-2 rounded'>
            <h1>Feature Products</h1>
        </div>
        <div className='flex items-center justify-center w-50 h-50 border-2 rounded'>
            <h1>Get Quotation </h1>
        </div>
        <div className='flex items-center justify-center w-50 h-50 border-2 rounded text-center'>
            <h1>For Repair and Mantinance </h1>
        </div>
           
        </div>

    </div>
  )
}

export default FeatureProductsSection