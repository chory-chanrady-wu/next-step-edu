"use client";
import { useEffect } from "react";
import { toast } from "sonner";
import LoginForm from "@/app/components/common/auth/LoginForm";

export default function ClientLoginPage() {
  // Show toast if redirected due to SUSPENDED/INACTIVE
  useEffect(() => {
    const loginError = localStorage.getItem("loginError");
    console.log("[LoginPage] loginError flag:", loginError);
    if (loginError === "SUSPENDED") {
      console.log("[LoginPage] Showing suspended toast");
      toast.error(
        "Your account has been suspended, please contact to support for activating",
      );
      localStorage.removeItem("loginError");
    } else if (loginError === "INACTIVE") {
      console.log("[LoginPage] Showing inactive toast");
      toast.error("Your account is not active. Please contact support.");
      localStorage.removeItem("loginError");
    }
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl text-center mb-10 font-bold text-teal-700">
          Login
        </h1>
        <LoginForm onSubmit={() => {}} />
      </div>
    </div>
  );
}
