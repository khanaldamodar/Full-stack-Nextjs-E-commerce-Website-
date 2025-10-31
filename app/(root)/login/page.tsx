"use client";
import Image from "next/image";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface LoginDetailsType {
  email: string;
  password: string;
}

export default function Page() {
  const router = useRouter();

  const [logindetails, setLoginDetails] = useState<LoginDetailsType>({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logindetails),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        Cookies.set("token", data.token, { expires: 7 });
        console.log("Token saved:", data.token);
        router.push("/admin"); 
      } else {
        alert(`Login failed: ${data.message || "Invalid credentials"}`);
        console.error("Login error:", data);
      }
    } catch (error) {
      alert(" Something went wrong! Please try again later.");
      console.error("Network error:", error);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-linear-to-b from-green-500 to-blue-500">
      <div className=" mt-23 w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center">
          <Image
            src="/logo.jpeg"
            alt="Shop Logo"
            width={80}
            height={80}
            className="rounded-full h-auto w-auto mb-4"
          />
          <h3 className="text-2xl font-bold text-zinc-800">
            Admin <span className="text-blue-600">Log-In</span>
          </h3>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5 mt-8">
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-semibold text-blue-600 mb-2"
            >
              Email
            </label>
            <input
              value={logindetails.email}
              onChange={(e) =>
                setLoginDetails({ ...logindetails, email: e.target.value })
              }
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-green-500 rounded-lg outline-none focus:ring-2 focus:ring-green-400 transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-lg font-semibold text-blue-600 mb-2"
            >
              Password
            </label>
            <input
              value={logindetails.password}
              onChange={(e) =>
                setLoginDetails({ ...logindetails, password: e.target.value })
              }
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 border border-green-500 rounded-lg outline-none focus:ring-2 focus:ring-green-400 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-linear-to-r from-green-500 to-blue-500 text-white font-semibold py-3 rounded-lg shadow-md hover:opacity-90 transition-all"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
