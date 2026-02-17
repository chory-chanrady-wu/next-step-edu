"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";

export default function CreateUserPage() {
  const router = useRouter();

  return (
    <div className="py-8">
      <div className="max-w-md mx-auto text-center space-y-4 p-8 border border-yellow-200 bg-yellow-50 rounded-lg">
        <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto" />
        <h2 className="text-xl font-bold text-gray-900">Create User</h2>
        <p className="text-gray-600">
          New users are created through the registration system. Users can
          register themselves to gain access to the platform.
        </p>
        <Button
          onClick={() => router.push("/admin/users")}
          className="bg-blue-600 hover:bg-blue-700 w-full"
        >
          Back to Users
        </Button>
      </div>
    </div>
  );
}
