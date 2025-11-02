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

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logindetails),
      });

      const data = await response.json();

      if (data.token) {
        // ✅ Save token and email in cookies
        Cookies.set("token", data.token, { expires: 7 });
        Cookies.set("email", logindetails.email, { expires: 7 });

        alert("Login Successful!");
        router.push("/admin");
      } else {
        alert("Invalid Email or Password!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center mx-auto mt-2">
      {/* Left Section */}
      <div className="sm:w-2/5 w-full bg-green-100 rounded-xl shadow-lg p-6">
        <div className="pt-1">
          <Image
            src="/logo.jpeg"
            alt="Shop Logo"
            width={80}
            height={80}
            className="mx-auto rounded-full h-auto w-auto"
          />
        </div>

        <h3 className="flex justify-center items-center pt-4 text-2xl font-bold text-zinc-800">
          Admin <span className="ml-2 text-blue-600">Log-In</span>
        </h3>

        <div className="mx-auto flex w-2/4 flex-col justify-center items-start pt-5">
          {/* Email Field */}
          <div className="w-full">
            <label
              htmlFor="Email"
              className="mb-2 block text-lg font-bold text-blue-500"
            >
              Email:
            </label>
            <input
              value={logindetails.email}
              onChange={(e) =>
                setLoginDetails({ ...logindetails, email: e.target.value })
              }
              type="text"
              id="Email"
              placeholder="Email"
              className="w-full p-2 border border-green-500 rounded outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Password Field */}
          <div className="mt-5 w-full">
            <label
              htmlFor="password"
              className="mb-2 block text-lg font-bold text-blue-500"
            >
              Password:
            </label>
            <input
              value={logindetails.password}
              onChange={(e) =>
                setLoginDetails({ ...logindetails, password: e.target.value })
              }
              type="password"
              id="password"
              placeholder="Password"
              className="w-full p-2 border border-green-500 rounded outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="mt-6 w-full rounded bg-gradient-to-r from-green-500 to-blue-500 p-2 text-white font-semibold transition hover:opacity-90"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
