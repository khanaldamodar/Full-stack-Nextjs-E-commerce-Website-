import React from 'react'

interface HeadingType{
    title: string;
}

const Heading = ({title}: HeadingType) => {
  return (
    <h1 className='text-4xl font-bold'>{title}</h1>
  )
}

export default Heading