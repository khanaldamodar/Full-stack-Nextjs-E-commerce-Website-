import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/global/Navbar";
import "keen-slider/keen-slider.min.css";
import Footer from "@/components/global/Footer";
import { CartProvider } from "@/context/CartContext";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Set Nepal - One Stop All Solution",
  description: "Get All the Insturement you need!",
  icons: {
    icon: '/logo.jpeg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased bg-[#AEC958]`}
      >
        <CartProvider>
        <Navbar />
          {children}
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}
