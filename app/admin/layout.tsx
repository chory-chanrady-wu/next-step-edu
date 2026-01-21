import AdminSidebar from "../components/admin/sidebar";
import AdminTopbar from "../components/admin/admintopbar";
import "../styles/globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 flex">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminTopbar />
          <main className="flex-1 p-6">{children}</main>
      </div>
    </body>
    </html>
  );
}