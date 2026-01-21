import { SideBar } from '.././components/admin/layout/Sidebar';
import { Header } from '.././components/admin/layout/Header';
import "../styles/globals.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <SideBar />
      <div className="md:pl-64 transition-all duration-300">
        <Header />
        <main className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
