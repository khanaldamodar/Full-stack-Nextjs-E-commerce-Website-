import { useState } from "react";
import Cookies from "js-cookie";

interface UseUpdateResult<T> {
  updateData: (
    endpoint: string,
    body?: any,
    method?: string,
    isFileUpload?: boolean
  ) => Promise<T | null>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export function useUpdate<T = any>(): UseUpdateResult<T> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateData = async (
    endpoint: string,
    body?: any,
    method: string = "PUT",
    isFileUpload: boolean = false
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = Cookies.get("token");

      const headers: Record<string, string> = {};
      if (!isFileUpload) {
        headers["Content-Type"] = "application/json";
      }
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`/api/${endpoint}`, {
        method,
        headers,
        body: isFileUpload ? body : body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Request failed (${response.status}): ${text}`);
      }

      const data: T = await response.json();
      setSuccess(true);
      return data;
    } catch (err: any) {
      setError(err.message || "Unknown error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateData, loading, error, success };
}
