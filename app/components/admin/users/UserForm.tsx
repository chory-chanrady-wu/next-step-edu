"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  Loader2,
  Camera,
  Info,
  AlertCircle,
  Eye,
  EyeOff,
  UserPlus,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";

// --- Form Sub-components ---

const FormLabel = ({
  children,
  required,
  info,
}: {
  children: React.ReactNode;
  required?: boolean;
  info?: string;
}) => (
  <div className="flex items-center justify-between mb-2 px-1">
    <label className="text-sm font-black text-gray-700 font-outfit uppercase tracking-wider flex items-center gap-1.5">
      {children}
      {required && <span className="text-red-500">*</span>}
    </label>
    {info && (
      <div className="group relative">
        <Info className="w-3.5 h-3.5 text-gray-400 cursor-help transition-colors group-hover:text-blue-500" />
        <div className="absolute bottom-full right-0 mb-3 w-56 p-3 bg-gray-900 text-white text-[10px] rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-2xl leading-relaxed">
          <div className="font-black mb-1 uppercase tracking-widest text-blue-400">
            Pro Tip
          </div>
          {info}
        </div>
      </div>
    )}
  </div>
);

const UserTextInput = ({
  error,
  icon: Icon,
  className,
  showToggle,
  ...props
}: any) => {
  const [show, setShow] = useState(false);
  const type = showToggle ? (show ? "text" : "password") : props.type;

  return (
    <div className="space-y-2">
      <div className="relative group">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
        )}
        <input
          {...props}
          type={type}
          className={cn(
            "w-full px-5 py-3.5 rounded-2xl border transition-all outline-none bg-white font-outfit text-sm placeholder:text-gray-400 font-bold",
            Icon && "pl-12",
            showToggle && "pr-12",
            error
              ? "border-red-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/5 bg-red-50/10"
              : "border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 shadow-sm hover:border-gray-300",
            className,
          )}
        />
        {showToggle && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {show ? (
              <EyeOff className="w-4.5 h-4.5" />
            ) : (
              <Eye className="w-4.5 h-4.5" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="text-[11px] font-black text-red-500 flex items-center gap-1.5 pl-2 uppercase tracking-wide">
          <AlertCircle className="w-3.5 h-3.5" /> {error}
        </p>
      )}
    </div>
  );
};

// --- Main Form Component ---

interface UserFormProps {
  initialData?: any;
  mode?: "create" | "edit";
}

const UserForm = ({ initialData, mode = "create" }: UserFormProps) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    email: initialData?.email || "",
    full_name: initialData?.full_name || "",
    phone: initialData?.phone || "",
    role: initialData?.role || "student",
    status: initialData?.status || "active",
    password: "",
    avatar_url: initialData?.avatar_url || "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        avatar_url: URL.createObjectURL(file),
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.full_name) newErrors.full_name = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (mode === "create" && !formData.password)
      newErrors.password = "Password is required";
    else if (formData.password && formData.password.length < 8)
      newErrors.password = "Min. 8 characters required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSuccess(true);

    setTimeout(() => router.push("/admin/users"), 2000);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in zoom-in duration-500">
        <div className="w-24 h-24 rounded-[2.5rem] bg-emerald-500 flex items-center justify-center mb-8 shadow-2xl shadow-emerald-500/40">
          <CheckCircle2 className="w-12 h-12 text-white animate-in slide-in-from-bottom-2 duration-700" />
        </div>
        <h2 className="text-4xl font-black text-gray-900 font-outfit mb-3">
          Account {mode === "create" ? "Registered" : "Updated"}!
        </h2>
        <p className="text-gray-500 text-center max-w-sm font-medium leading-relaxed">
          The membership record for{" "}
          <span className="text-blue-600 font-bold">
            &quot;{formData.full_name}&quot;
          </span>{" "}
          has been successfully indexed into our secure database.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Breadcrumb / Back */}
      <div className="flex items-center justify-between">
        <Link href="/admin/users" className="group">
          <div className="flex items-center gap-3 text-gray-500 hover:text-blue-600 font-bold transition-all">
            <div className="h-10 w-10 rounded-2xl border border-gray-100 flex items-center justify-center bg-white group-hover:border-blue-500 group-hover:bg-blue-50 shadow-sm transition-all">
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            </div>
            Back to User Directory
          </div>
        </Link>
        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 bg-gray-50 px-4 py-1.5 rounded-full">
          Security Context: Admin
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Profile Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-[2.5rem] overflow-hidden">
            <CardContent className="p-8 flex flex-col items-center">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative group cursor-pointer mb-6"
              >
                <div className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-white shadow-xl overflow-hidden flex items-center justify-center transition-all group-hover:scale-105 duration-300 relative">
                  {formData.avatar_url ? (
                    <Image
                      src={formData.avatar_url}
                      alt="Profile"
                      fill
                      sizes="8rem"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-gray-300" />
                  )}
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </div>

              <div className="text-center space-y-1">
                <h3 className="font-black text-gray-900 font-outfit uppercase tracking-wider">
                  {formData.full_name || "New Member"}
                </h3>
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.15em] bg-blue-50 px-3 py-1 rounded-full">
                  {formData.role}
                </p>
              </div>

              <div className="w-full mt-8 pt-8 border-t border-gray-50 space-y-4">
                <div className="p-4 bg-gray-50/50 rounded-2xl">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">
                    Member Group
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {["student", "recruiter", "admin"].map((r) => (
                      <button
                        key={r}
                        onClick={() => setFormData((p) => ({ ...p, role: r }))}
                        className={cn(
                          "text-[9px] font-black py-2 rounded-xl transition-all uppercase tracking-tighter",
                          formData.role === r
                            ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                            : "bg-white text-gray-400 hover:text-gray-600 border border-gray-100",
                        )}
                      >
                        {r[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="p-6 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2rem] text-white shadow-2xl shadow-blue-500/20">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-6 h-6 text-blue-300" />
              <h4 className="font-black font-outfit text-lg">
                Identity Security
              </h4>
            </div>
            <p className="text-xs text-blue-100/70 font-medium leading-relaxed mb-6">
              {" "}
              Ensure all identification details match official legal documents
              to maintain workspace integrity.
            </p>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-blue-400 rounded-full" />
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-[2.5rem]">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <UserPlus className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-xl font-black text-gray-900 font-outfit uppercase tracking-tight">
                  Account Essentials
                </h3>
              </div>
            </div>
            <CardContent className="p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <FormLabel
                    required
                    info="Legal name as it should appear across the organization."
                  >
                    Full Profile Name
                  </FormLabel>
                  <UserTextInput
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="e.g. Jean Smith"
                    error={errors.full_name}
                    icon={User}
                  />
                </div>
                <div className="space-y-1">
                  <FormLabel info="Personal or work contact number with country code.">
                    Contact Number
                  </FormLabel>
                  <UserTextInput
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    error={errors.phone}
                    icon={Phone}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <FormLabel
                  required
                  info="Unique identifier for authentication/communications."
                >
                  Account Email Address
                </FormLabel>
                <UserTextInput
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="member@nextstepedu.com"
                  error={errors.email}
                  icon={Mail}
                />
              </div>

              <div className="space-y-1">
                <FormLabel
                  required={mode === "create"}
                  info="Access credentials must be at least 8 characters long."
                >
                  Sensitive Access Password
                </FormLabel>
                <UserTextInput
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={
                    mode === "create"
                      ? "••••••••"
                      : "Leave blank to keep existing"
                  }
                  error={errors.password}
                  icon={Lock}
                  showToggle
                />
              </div>

              <div className="pt-8 flex flex-col sm:flex-row items-center gap-4 border-t border-gray-50">
                <div className="p-1.5 bg-gray-100 rounded-2xl flex flex-1 gap-2 w-full">
                  {["active", "inactive"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, status: s }))}
                      className={cn(
                        "flex-1 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                        formData.status === s
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-gray-400 hover:text-gray-600",
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black shadow-2xl shadow-blue-500/30 flex items-center gap-3 transition-all hover:scale-105 active:scale-95 group"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {mode === "create" ? "Onboard User" : "Save Changes"}
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
