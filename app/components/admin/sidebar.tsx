"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "../../lib/routes";

const navItems = [
  { label: "Dashboard", href: routes.admin.dashboard },
  { label: "Universities", href: routes.admin.university },
  { label: "Scholarships", href: routes.admin.scholarship },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 px-4 py-6">

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
        <p className="text-sm text-gray-500">Manage platform content</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const isRoot = item.href === routes.admin.dashboard; // "/admin"
          const active =
            pathname === item.href ||
            (!isRoot && pathname.startsWith(item.href + "/"));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition
                ${active ? "bg-green-500 text-white" : "text-gray-700 hover:bg-gray-100"}
              `}
            >
              <span className="text-lg"></span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
