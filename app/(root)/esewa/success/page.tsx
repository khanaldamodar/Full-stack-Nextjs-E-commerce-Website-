"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EsewaSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const oid = params.get("oid");
    const amt = params.get("amt");
    const refId = params.get("refId");

    console.log("eSewa Payment Success:", { oid, amt, refId });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-4xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>

      <p className="mt-4 text-lg text-gray-700">
        Your payment via eSewa has been completed successfully.
      </p>

      <button
        onClick={() => router.push("/")}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Go Home
      </button>
    </div>
  );
}
