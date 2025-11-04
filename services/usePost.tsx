"use client";
import { useState } from "react";

export function usePost<T>(url: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const postData = async (body: any, token?: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(body),
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json.message || "Failed to post data");

      setData(json);
      return json;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { postData, data, loading, error };
}
