"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EsewaFailurePage() {
  const router = useRouter();

  useEffect(() => {
    // Extract eSewa returned parameters (if any)
    const params = new URLSearchParams(window.location.search);

    const oid = params.get("oid");
    const amt = params.get("amt");
    const refId = params.get("refId");

    console.log("eSewa Payment Failed:", { oid, amt, refId });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-4xl font-bold text-red-600">Payment Failed ❌</h1>

      <p className="mt-4 text-lg text-gray-700">
        Your eSewa payment was not completed or was cancelled.
      </p>

      <p className="mt-2 text-sm text-gray-500">
        Please try again or choose a different payment method.
      </p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => router.push("/checkout")}
          className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
        >
          Back to Checkout
        </button>

        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
