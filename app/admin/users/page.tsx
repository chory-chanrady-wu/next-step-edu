"use client";

import React from "react";
import UserTable from "@/app/components/admin/users/UserTable";

export default function UsersPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-8 pt-5">
        <div className="flex items-center gap-5">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-gray-900 font-outfit leading-none ml-4">
              Users
            </h1>
            <p className="text-sm font-medium text-gray-500 mt-2 flex items-center gap-1.5 capitalize tracking-wide ml-4">
              platform member management & security control
            </p>
          </div>
        </div>
      </div>

      {/* Main Content: User Table */}
      <div className="space-y-4">
        <UserTable />
      </div>
    </div>
  );
}
