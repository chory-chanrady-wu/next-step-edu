"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPayload } from "@/lib/auth";
import { refreshToken } from "@/lib/api";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const token =
        localStorage.getItem("accessToken") ||
        localStorage.getItem("authToken") ||
        localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (!token || !user) {
        router.replace("/admin/login");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();

    const handleRefresh = async () => {
      const payload = getPayload();
      if (!payload?.exp) return;

      const now = Math.floor(Date.now() / 1000);
      const timeLeft = payload.exp - now;
      if (timeLeft < 120) {
        try {
          console.log("Token expiring soon, refreshing proactively...");
          await refreshToken();
        } catch (error) {
          console.error("Proactive refresh failed:", error);
        }
      }
    };

    const intervalId = setInterval(handleRefresh, 60000); 

    return () => clearInterval(intervalId);
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  if (!isAuthenticated) {
    return null;
  }
  return <>{children}</>;
}