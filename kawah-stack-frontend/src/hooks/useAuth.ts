// src/hooks/useAuth.ts
import { useState, useCallback, useEffect } from "react";
import apiClient from "@/services/apiClientWithAuth";
import { useRouter } from "next/navigation";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
}

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await apiClient.post("/auth/login", { email, password });
      
      const { user: userDataFromServer, tokens } = res.data; 
      const { access, refresh } = tokens;

      if (typeof window !== "undefined") {
        localStorage.setItem("token", access.token);
        localStorage.setItem("refreshToken", refresh.token);
        localStorage.setItem("user", JSON.stringify(userDataFromServer)); 
      }
      setUser(userDataFromServer); 
      setError("");
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const res = await apiClient.post("/auth/register", { name, email, password });
      setError("");
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Registrasi gagal");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;
      if (refreshToken) {
        await apiClient.post("/auth/logout", { refreshToken });
      }
    } catch (err: any) {
      console.error("Logout failed on backend:", err.response?.data || err);
      setError(err.response?.data?.message || "Logout failed");
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      }
      setUser(null);
      setLoading(false);
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser: User = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (e) {
          console.error("Failed to parse user from localStorage", e);
          localStorage.removeItem("user");
        }
      }
    }
  }, []);

  return {
    loading,
    error,
    user,
    login,
    register,
    logout,
  };
}