"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
interface DecodedToken {
  role?: string;
  [key: string]: any;
}
import { CheckCircle, Eye, EyeOff, Lock, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/use-queries-hook";

export default function LoginForm() {
  const router = useRouter();
  const loginMutation = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginMutation.mutateAsync({ email, password });

      if (!data.accessToken) {
        throw new Error("No access token in response");
      }

      // Decode JWT to get role
      const decoded: DecodedToken = jwtDecode(data.accessToken);
      const role = decoded.role || "user";

      // Block non-admin users (case-insensitive)
      if (role.toLowerCase() !== "admin") {
        setError("Only admin accounts can login here. Redirecting...");
        setTimeout(() => {
          router.push("/client/login");
        }, 1200);
        return;
      }

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("authToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken || "");

      const userData = {
        id: data.id || "1",
        name: data.email?.split("@")[0] || "Admin User",
        email: data.email || email,
        role,
        ...decoded,
      };
      localStorage.setItem("user", JSON.stringify(userData));

      setIsRedirecting(true);
      setShowToast(true);

      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 800);
    } catch (err: any) {
      const status = err?.response?.status;
      const data = err?.response?.data;

      // Your backend now returns: { detail, status, title, instance }
      const message = data?.detail || data?.message || err?.message || "";

      if (status === 404) {
        setError("Your account doesn't exist");
        return;
      }

      if (status === 401) {
        setError("Incorrect email or password");
        return;
      }

      setError(message || "Login failed");
    }
  };

  const isLoading = loginMutation.isPending || isRedirecting;

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
      <div className="w-full max-w-md">
        {/* Toast Notification */}
        <div
          className={`fixed top-5 right-5 bg-white rounded-xl shadow-2xl border border-green-100 p-4 flex items-start gap-3 min-w-[320px] transition-all duration-500 z-50 ${
            showToast
              ? "translate-x-0 opacity-100"
              : "translate-x-125 opacity-0"
          }`}
        >
          <div className="shrink-0 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-base mb-1">
              Login Successful!
            </h3>
            <p className="text-sm text-gray-600">
              Welcome back! Redirecting to dashboard...
            </p>
          </div>
          <button
            onClick={() => setShowToast(false)}
            className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome NextStepEdu
            </h1>
            <p className="mt-2 text-gray-600">Sign in to your admin account</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:opacity-50 disabled:bg-gray-50"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:opacity-50 disabled:bg-gray-50"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5 font-medium"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
