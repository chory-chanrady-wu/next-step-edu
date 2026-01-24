"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Eye, EyeOff, Lock, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const DEMO_CREDENTIALS = {
  email: "admin@nextstep.edu",
  password: "admin123",
};

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      if (
        email === DEMO_CREDENTIALS.email &&
        password === DEMO_CREDENTIALS.password
      ) {
        const userData = {
          id: "1",
          name: "Admin User",
          email: email,
          role: "admin",
        };
        localStorage.setItem("authToken", "demo-token-" + Date.now());
        localStorage.setItem("user", JSON.stringify(userData));
        setShowToast(true);
        router.push("/admin/dashboard");
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
      <div className="w-full max-w-md">
        {/* Toast Notification */}
        <div
          className={`fixed top-5 right-5 bg-white rounded-xl shadow-2xl border border-green-100 p-4 flex items-start gap-3 min-w-[320px] transition-all duration-500 z-50 ${
            showToast
              ? "translate-x-0 opacity-100"
              : "translate-x-[500px] opacity-0"
          }`}
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
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
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
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
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
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
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
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
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5 font-medium"
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

          {/* Footer */}
          <div className="text-center text-sm text-gray-600">
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
