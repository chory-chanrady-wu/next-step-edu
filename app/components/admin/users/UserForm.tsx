"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  User,
  Phone,
  Loader2,
  X,
  CheckCircle2,
  UserCircle,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useUpdateProfile } from "@/hooks/use-queries-hook";
import { UserProfileResponse } from "@/types/nextstepedu";
import { toast } from "sonner";

interface UserFormProps {
  user: UserProfileResponse;
  onClose: () => void;
}

const UserForm = ({ user, onClose }: UserFormProps) => {
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const [imagePreview, setImagePreview] = useState<string | null>(
    user.image || null,
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    firstname: user.firstname || "",
    lastname: user.lastname || "",
    phone: user.phone || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(
      {
        userId: user.id,
        firstname: formData.firstname,
        lastname: formData.lastname,
        phone: formData.phone,
        image: selectedFile || undefined,
      },
      {
        onSuccess: () => {
          toast.success("Profile updated successfully");
          onClose();
        },
        onError: (err: any) => {
          toast.error(err.response?.data || "Failed to update profile");
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-all duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
      >
        {/* Clean Header */}
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 font-outfit">
              Edit Profile
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Avatar Upload Container */}
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden transition-all shadow-sm relative">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="User"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <UserCircle className="w-12 h-12 text-gray-300" />
                )}
              </div>
              <label className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl bg-blue-600 border-4 border-white flex items-center justify-center cursor-pointer shadow-lg hover:bg-blue-700 transition-all">
                <Camera className="w-4 h-4 text-white" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">
                Profile Picture
              </h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Upload a high-resolution image.
                <br />
                Supports JPG, PNG or WebP.
              </p>
            </div>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 rounded-xl text-sm font-medium transition-all outline-none font-outfit"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 rounded-xl text-sm font-medium transition-all outline-none font-outfit"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 rounded-xl text-sm font-medium transition-all outline-none font-outfit"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-bold text-gray-400 hover:text-gray-600 px-4 py-2 transition-colors"
            >
              Cancel
            </button>

            <Button
              type="submit"
              disabled={isPending}
              className="h-12 rounded-xl px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 border-none font-bold text-sm transition-all active:scale-95"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Save Profile
                </div>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UserForm;
