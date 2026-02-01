"use client";

import { SideBar } from ".././components/admin/layout/Sidebar";
import { Header } from ".././components/admin/layout/Header";
import { AuthGuard } from ".././components/admin/auth/AuthGuard";
import { usePathname } from "next/navigation";
import "../styles/globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login" || pathname === "/admin";
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 flex">
        {/* <AdminSidebar /> */}
        <div className="flex-1 flex flex-col">
          {/* <AdminTopbar /> */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
