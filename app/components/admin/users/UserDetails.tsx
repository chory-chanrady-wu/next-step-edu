"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ArrowLeft,
  Settings,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import DeleteConfirmationModal from "../universities/DeleteConfirmationModal";

interface UserDetailsProps {
  user: any;
}

const UserDetails = ({ user }: UserDetailsProps) => {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!user) return null;

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsDeleting(false);
    setIsDeleteModalOpen(false);
    router.push("/admin/users");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete User Account"
        description={`This will permanently delete the account of "${user.full_name}". All personal data, activity records, and saved scholarships will be erased.`}
        isLoading={isDeleting}
      />

      {/* Header Navigation */}
      <div className="flex items-center justify-between">
        <Link href="/admin/users" className="group">
          <div className="flex items-center gap-3 text-gray-500 hover:text-blue-600 font-bold transition-all transition-colors">
            <div className="h-10 w-10 rounded-2xl border border-gray-100 flex items-center justify-center bg-white group-hover:border-blue-500 group-hover:bg-blue-50 transition-all shadow-sm">
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            </div>
            Back to Users List
          </div>
        </Link>
      </div>

      {/* Hero Profile Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-[2.5rem] overflow-hidden">
            <CardContent className="p-10 flex flex-col items-center text-center">
              <div className="relative mb-6 group">
                <div className="w-40 h-40 rounded-[2.5rem] bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-50 flex items-center justify-center p-1 border-2 border-white shadow-2xl overflow-hidden relative">
                  <Image
                    src={user.avatar_url}
                    alt={user.full_name}
                    fill
                    sizes="10rem"
                    className="w-full h-full object-cover rounded-[2rem] transition-transform group-hover:scale-110 duration-500"
                  />
                </div>
                <button className="absolute -bottom-2 -right-2 h-12 w-12 rounded-2xl bg-white border border-gray-100 shadow-xl flex items-center justify-center text-blue-600 hover:text-blue-700 transition-all active:scale-90">
                  <Camera className="w-6 h-6" />
                </button>
              </div>

              <h2 className="text-3xl font-black text-gray-900 font-outfit leading-tight mb-2">
                {user.full_name}
              </h2>

              <div className="w-full space-y-3 pt-6 border-t border-gray-50">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 font-bold">
                    Account Status
                  </span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-lg font-bold border-none",
                      user.status === "active"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700",
                    )}
                  >
                    {user.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 font-bold">Member Since</span>
                  <span className="text-gray-900 font-black font-outfit">
                    {new Date(user.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
          {/* Detailed Info Card */}
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-[2.5rem]">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-black text-gray-900 font-outfit">
                  Identity & Contact
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl hover:bg-gray-50"
              >
                <Settings className="w-5 h-5 text-gray-400" />
              </Button>
            </div>
            <CardContent className="p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-50 rounded-2xl flex items-center justify-center">
                      <Mail className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1.5">
                        Email Address
                      </p>
                      <p className="text-base font-bold text-gray-900">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-50 rounded-2xl flex items-center justify-center">
                      <Phone className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1.5">
                        Phone Number
                      </p>
                      <p className="text-base font-bold text-gray-900">
                        {user.phone}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-50 rounded-2xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1.5">
                        Location
                      </p>
                      <p className="text-base font-bold text-gray-900">
                        Phnom Penh, Cambodia
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
