'use client';

import { SideBar } from '.././components/admin/layout/Sidebar';
import { Header } from '.././components/admin/layout/Header';
import { AuthGuard } from '.././components/admin/auth/AuthGuard';
import { usePathname } from 'next/navigation';
import "../styles/globals.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login' || pathname === '/admin';
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        <SideBar />
        <div className="md:pl-66 p-2  transition-all duration-300">
          <Header />
          <main className="py-2">
            <div className="mx-auto ">
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
