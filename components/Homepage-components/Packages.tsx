import React from 'react'
import Heading from '../global/Heading'
import Package from '../global/Package';

export interface PackageType {
    title: string;
    desc: string;
    image: string;
    price: number
}

const PackageList = [
    {
        title: "School Labrotory Instruments",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quasi reprehenderit labore mollitia optio dolorum eius incidunt! Delectus qui nisi dolorem! Officiis harum consequuntur quo impedit officia facere aperiam distinctio?",
        image: "/logo.jpeg",
        price: 500
    },
    {
        title: "School Labrotory Instruments",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quasi reprehenderit labore mollitia optio dolorum eius incidunt! Delectus qui nisi dolorem! Officiis harum consequuntur quo impedit officia facere aperiam distinctio?",
        image: "/logo.jpeg",
        price: 500
    },
    {
        title: "School Labrotory Instruments",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quasi reprehenderit labore mollitia optio dolorum eius incidunt! Delectus qui nisi dolorem! Officiis harum consequuntur quo impedit officia facere aperiam distinctio?",
        image: "/logo.jpeg",
        price: 500
    },
    {
        title: "School Labrotory Instruments",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quasi reprehenderit labore mollitia optio dolorum eius incidunt! Delectus qui nisi dolorem! Officiis harum consequuntur quo impedit officia facere aperiam distinctio?",
        image: "/logo.jpeg",
        price: 500
    },
]

const Packages = () => {
    return (
        <div className='text-white font-poppins flex flex-col items-center justify-center gap-6 md:gap-20 py-20 px-10 lg:px-40'>
            <Heading title='Our Packages' />
            {/* Mapping the Packages List Below */}

            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-10 lg:gap-20'>
                {PackageList.map((item, index) =>
                    <Package
                        key={index}
                        title={item.title}
                        image={item.image}
                        desc={item.desc}
                        price={item.price}
                    />
                )}
            </div>
        </div>
    )
}

export default Packages