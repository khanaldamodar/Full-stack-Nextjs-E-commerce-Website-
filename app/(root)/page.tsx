"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ComingSoonPage() {
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  // 🧠 Step 1: Cache or load target date using sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem("setNepalLaunchDate");
    let target: Date;

    if (saved) {
      target = new Date(saved);
    } else {
      target = new Date();
      target.setDate(target.getDate() + 10); // 10 days countdown
      sessionStorage.setItem("setNepalLaunchDate", target.toISOString());
    }

    setTargetDate(target);
  }, []);

  // ⏳ Step 2: Countdown logic
  useEffect(() => {
    if (!targetDate) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;

      if (diff <= 0) {
        setTimeLeft(null);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  // 🎉 Step 3: When countdown ends
  if (!timeLeft) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-linear-to-br from-blue-100 via-white to-blue-50 text-center">
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-gray-800"
        >
          We Are Live 🎉
        </motion.h1>
        <p className="text-gray-500 mt-4 text-lg">
          Thank you for waiting — Set Nepal is now open!
        </p>
      </div>
    );
  }

  // 💅 Step 4: UI
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-100 text-gray-800 text-center overflow-hidden relative">
      {/* Floating background animation */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 9 }}
      />

      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
      >
        Coming Soon 🚀
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg md:text-xl text-gray-600 mb-10 max-w-md"
      >
        Set Nepal is getting ready to bring you all school, college, and lab
        products in one place. Stay tuned!
      </motion.p>

      <motion.div
        className="flex gap-4 md:gap-6 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        {Object.entries(timeLeft).map(([label, value]) => (
          <div
            key={label}
            className="bg-white/60 backdrop-blur-md shadow-lg rounded-2xl p-4 md:p-6 w-20 md:w-24"
          >
            <p className="text-2xl md:text-3xl font-bold text-gray-800">
              {value.toString().padStart(2, "0")}
            </p>
            <p className="text-xs md:text-sm uppercase text-gray-500">
              {label}
            </p>
          </div>
        ))}
      </motion.div>

      <motion.footer
        className="absolute bottom-6 text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        © {new Date().getFullYear()} Set Nepal. All rights reserved.
      </motion.footer>
    </div>
  );
}
