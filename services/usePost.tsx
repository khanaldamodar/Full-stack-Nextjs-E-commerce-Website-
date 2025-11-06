"use client";
import { useState } from "react";

export function usePost<T>(url: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  /**
   * @param body - The data to post. Can be JSON or FormData.
   * @param token - Optional auth token.
   * @param isFormData - If true, send as multipart/form-data (for files).
   */
  const postData = async (body: any, token?: string, isFormData: boolean = false) => {
    setLoading(true);
    setError(null);
    try {
      const headers: HeadersInit = {};

      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      }

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(url, {
        method: "POST",
        headers,
        body: isFormData ? body : JSON.stringify(body),
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
