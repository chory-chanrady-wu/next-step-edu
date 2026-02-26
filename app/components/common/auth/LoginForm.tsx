"use client";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { Label, PrimaryButton, TextInput } from "./ui";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
interface DecodedToken {
  role?: string;
  [key: string]: any;
}
import { authenticate } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  onSubmit: () => void;
};

export default function LoginForm({ onSubmit }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authenticate({ email, password });

      // Decode JWT to get role
      const decoded: DecodedToken = jwtDecode(response.accessToken);
      const role = decoded.role || "user";

      // Check if user is admin (case-insensitive)
      if (role && role.toLowerCase() === "admin") {
        toast.error("Admin accounts must login via the admin portal");
        setIsLoading(false);
        setTimeout(() => {
          router.push("/admin/login");
        }, 1000);
        return;
      }

      // Store tokens and user info
      if (response.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("authToken", response.accessToken);
      }
      if (response.refreshToken) {
        localStorage.setItem("refreshToken", response.refreshToken);
      }
      // Save user object to localStorage
      const user = {
        ...decoded,
        accessToken: response.accessToken,
        role,
      };
      localStorage.setItem("user", JSON.stringify(user));
      // Close modal immediately
      onSubmit();
      
      // Dispatch custom event so Header updates profile immediately
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("user-logged-in"));
      }
      router.push("/client");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Label>Email</Label>
        <TextInput
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail className="h-4 w-4" />}
        />
      </div>

      <div>
        <Label>Password</Label>
        <div className="relative">
          <TextInput
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock className="h-4 w-4" />}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-200"
          />
          Remember me
        </label>

        <button
          type="button"
          className="text-sm font-semibold text-red-500 hover:underline"
          onClick={() => alert("Forgot password")}
        >
          Forgot password?
        </button>
      </div>

      <PrimaryButton>{isLoading ? "Logging in..." : "Login"}</PrimaryButton>

      <p className="pt-2 text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={() => (window.location.href = "/client/register")}
          className="font-semibold text-blue-600 hover:underline"
        >
          Register
        </button>
      </p>
    </form>
  );
}
