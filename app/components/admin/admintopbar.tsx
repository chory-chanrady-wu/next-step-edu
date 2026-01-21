"use client";

import { Bell, ChevronDown, Search } from "lucide-react";

export default function AdminTopbar() {
  return (
    <header className="h-14 bg-white border-b border-gray-200 px-4 flex items-center justify-between">
      <div className="flex items-center gap-2 text-gray-600">
        <button aria-label="Back" className="p-1 hover:text-gray-800">←</button>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            className="w-full rounded-md border border-gray-200 pl-9 pr-3 py-2 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            placeholder="Search anything ..."
            type="search"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button aria-label="Notifications" className="p-2 text-gray-600 hover:text-gray-800">
          <Bell className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-teal-200 overflow-hidden">
            {/* replace with <Image /> if you have an avatar */}
          </div>
          <span className="text-sm font-medium text-gray-800">CHORY Chanrady</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    </header>
  );
}