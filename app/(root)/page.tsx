import Heading from "@/components/global/Heading";
import ProductSlider from "@/components/global/ProductSlider";
import FeatureProductsSection from "@/components/Homepage-components/FeatureProductsSection";
import HappyClientsSlider from "@/components/Homepage-components/HappyClientsSlider";
import Introduction from "@/components/Homepage-components/Introduction";
import Packages from "@/components/Homepage-components/Packages";
import Image from "next/image";

export default function Home() {
  const products = [
    {
      id: 1,
      name: "Electric Guitar",
      price: "Rs. 25,000",
      image: "/logo.jpeg",
    },
    {
      id: 2,
      name: "Drum Set",
      price: "Rs. 55,000",
      image: "/logo.jpeg",
    },
    {
      id: 3,
      name: "Keyboard",
      price: "Rs. 40,000",
      image: "/logo.jpeg",
    },
    {
      id: 4,
      name: "Violin",
      price: "Rs. 35,000",
      image: "/logo.jpeg",
    },
    {
      id: 1,
      name: "Electric Guitar",
      price: "Rs. 25,000",
      image: "/logo.jpeg",
    },
    {
      id: 2,
      name: "Drum Set",
      price: "Rs. 55,000",
      image: "/logo.jpeg",
    },
    {
      id: 3,
      name: "Keyboard",
      price: "Rs. 40,000",
      image: "/logo.jpeg",
    },
    {
      id: 4,
      name: "Violin",
      price: "Rs. 35,000",
      image: "/logo.jpeg",
    },
  ];

  const certificates = [
    {
      id: 1,
      clientName: "ABC Construction Pvt. Ltd.",
      image: "/images/certificate1.jpg",
      description: "Recognized for excellent IT infrastructure support.",
    },
    {
      id: 2,
      clientName: "Global Tech Nepal",
      image: "/images/certificate2.jpg",
      description: "Outstanding website design and performance delivery.",
    },
    {
      id: 3,
      clientName: "Himalayan Traders",
      image: "/images/certificate3.jpg",
      description: "Appreciation for developing their online platform.",
    },
    {
      id: 4,
      clientName: "Zenith Solutions",
      image: "/images/certificate4.jpg",
      description: "Awarded for digital marketing excellence.",
    },
  ];
  return (
    <>
      <Introduction />
      <FeatureProductsSection />
      <Packages />

      <div className="md:px-52 flex flex-col items-center text-white font-poppins">
        <Heading title="Our Products" />
        <ProductSlider products={products} />
      <HappyClientsSlider certificates={certificates} />
      </div>


      {/* Happy CLients */}

    </>
  );
}
