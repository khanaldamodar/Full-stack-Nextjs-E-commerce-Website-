import Image from "next/image";

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center mx-auto mt-24">
      {/* Left Section */}
      <div className="w-1/2 h-full bg-green-100">
        <div className="pt-10">
          <Image
            src="/logo.jpeg"
            alt="Shop Logo"
            width={80}
            height={80}
            className="mx-auto rounded-full"
          />
        </div>

        <h3 className="flex justify-center items-center pt-4 text-2xl font-bold text-zinc-800">
          Admin <span className="ml-2 text-blue-600">Log-In</span>
        </h3>

        <div className="mx-auto flex w-2/4 flex-col justify-center items-start pt-5">
          <div className="w-full">
            <label
              htmlFor="Email"
              className="mb-2 block text-lg font-bold text-blue-500"
            >
              Email:
            </label>
            <input
              type="text"
              id="Email"
              placeholder="Email"
              className="w-full p-2 border border-green-500 rounded outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="mt-5 w-full">
            <label
              htmlFor="password"
              className="mb-2 block text-lg font-bold text-blue-500"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full p-2 border border-green-500 rounded outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button className="mt-6 w-full rounded bg-gradient-to-r from-green-500 to-blue-500 p-2 text-white font-semibold transition hover:opacity-90">
            Log In
          </button>
        </div>
      </div>

      {/* Right Section with Gradient */}
      <div className="relative w-1/2 h-full bg-gradient-to-b from-green-500 to-blue-500 flex items-center justify-center">
        {/* Semi-circle */}
        <div className="absolute w-3/4 h-3/4 bg-white rounded-l-full flex flex-col items-center justify-center shadow-lg p-6">
          <h2 className="text-3xl font-bold text-red-500 mb-4">Admin Panel</h2>
          <p className="text-gray-600 text-center">
            Welcome to the admin dashboard. You can manage users, view
            statistics, and configure settings from here.
          </p>
        </div>
      </div>
    </div>
  );
}
