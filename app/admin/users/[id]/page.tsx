"use client";

import React, { use } from "react";
import UserDetails from "@/app/components/admin/users/UserDetails";

// Mock data based on schema
const MOCK_USERS = [
  {
    id: "u1",
    email: "chory.chan@example.com",
    full_name: "Chory Chanrady",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chory",
    role: "admin",
    status: "active",
    phone: "+855 12 345 678",
    created_at: "2023-10-15T08:30:00Z",
  },
  {
    id: "u2",
    email: "sok.pheap@example.com",
    full_name: "Sok Pheap",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sok",
    role: "student",
    status: "active",
    phone: "+855 99 888 777",
    created_at: "2023-11-20T10:15:00Z",
  },
];

export default function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const user = MOCK_USERS.find((u) => u.id === id);

  if (!user) {
    return (
      <div className="p-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 font-outfit">
          Member Not Found
        </h1>
        <p className="text-gray-500 mt-2">
          The user profile you are trying to access does not exist or has been
          removed.
        </p>
      </div>
    );
  }

  return (
    <div className="py-2">
      <UserDetails user={user} />
    </div>
  );
}
