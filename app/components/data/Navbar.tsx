"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

import AuthModal from "../common/auth/AuthModal"; // keep your path

const nav = [
  { href: "/client", label: "Home" },
  { href: "/client/university", label: "Universities" },
  { href: "/client/scholarship", label: "Scholarships" },
];

export default function ClientNavbar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);

  const navItems = useMemo(() => nav, []);

  const closeMenu = () => setOpenMenu(false);
  const openAuthModal = () => {
    closeMenu();
    setOpenAuth(true);
  };
  const closeAuthModal = () => setOpenAuth(false);

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Brand />

            <DesktopNav pathname={pathname} items={navItems} />

            <DesktopActions onOpenAuth={openAuthModal} />

            <MobileToggle
              open={openMenu}
              onToggle={() => setOpenMenu((v) => !v)}
            />
          </div>

          <MobileMenu
            open={openMenu}
            pathname={pathname}
            items={navItems}
            onClose={closeMenu}
            onOpenAuth={openAuthModal}
          />
        </div>
      </header>

      {/* ✅ Login Modal */}
      <AuthModal open={openAuth} onClose={closeAuthModal} />
    </>
  );
}

/* ---------------- Small components ---------------- */

function Brand() {
  return (
    <Link href="/client" className="flex items-center gap-2">
      <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
        <span className="text-white text-xl font-bold">📚</span>
      </div>
      <span className="text-xl font-semibold text-gray-800">NextStepEdu</span>
    </Link>
  );
}

function DesktopNav({
  pathname,
  items,
}: {
  pathname: string;
  items: { href: string; label: string }[];
}) {
  return (
    <nav className="hidden md:flex items-center gap-8">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "font-medium transition-colors",
              active ? "text-teal-600" : "text-gray-700 hover:text-teal-600",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function DesktopActions({ onOpenAuth }: { onOpenAuth: () => void }) {
  return (
    <div className="hidden md:flex items-center gap-4">
      {/* ✅ Login opens modal */}
      <button
        onClick={onOpenAuth}
        className="flex items-center gap-2 text-gray-700 hover:text-teal-600 font-medium transition-colors"
        type="button"
      >
        <span>🔓</span>
        Login
      </button>

      <Link href="/client/scholarship">
        <button
          className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 font-medium transition-colors"
          type="button"
        >
          Get Started
        </button>
      </Link>
    </div>
  );
}

function MobileToggle({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      className="md:hidden rounded-md border px-3 py-2 hover:bg-gray-50"
      onClick={onToggle}
      aria-label="Toggle menu"
      type="button"
    >
      {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  );
}

function MobileMenu({
  open,
  pathname,
  items,
  onClose,
  onOpenAuth,
}: {
  open: boolean;
  pathname: string;
  items: { href: string; label: string }[];
  onClose: () => void;
  onOpenAuth: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden border-t"
        >
          <div className="py-3 flex flex-col gap-2">
            {items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "rounded-md px-3 py-2 font-medium transition-colors",
                    active
                      ? "bg-teal-50 text-teal-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-teal-600",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="pt-2 flex flex-col gap-2">
              {/* ✅ Mobile login opens modal */}
              <button
                onClick={onOpenAuth}
                className="w-full rounded-md border px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
                type="button"
              >
                🔓 Login
              </button>

              <Link href="/client/scholarship" onClick={onClose}>
                <button
                  className="w-full bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 font-medium"
                  type="button"
                >
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
