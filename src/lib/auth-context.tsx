"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { api } from "@/lib/api";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  credits?: number;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: () => {},
  refreshUser: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const fetchUser = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setUser(null);
      setLoading(false);
      if (pathname.startsWith("/dashboard")) {
        router.push("/signin/");
      }
      return;
    }

    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      setUser(null);
      localStorage.removeItem("access_token");
      if (pathname.startsWith("/dashboard")) {
        router.push("/signin/");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [pathname]);

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    router.push("/signin/");
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
