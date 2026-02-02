"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, LogIn, Menu, User, X } from "lucide-react";
import { useMemo, useState } from "react";

import { routes } from "../../lib/routes";
import AuthModal from "./auth/AuthModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: routes.client.home, label: "Home" },
  { href: routes.client.university, label: "Universities" },
  { href: routes.client.scholarship, label: "Scholarships" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const items = useMemo(() => navLinks, []);
  const isActive = (href: string) => pathname === href;

  const closeMobile = () => setIsMobileMenuOpen(false);
  const openAuth = () => {
    closeMobile();
    setIsAuthOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <div className="container relative mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link
            href={routes.client.home}
            className="flex items-center gap-2 transition-opacity hover:opacity-90"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-slate-900 via-teal-700 to-emerald-500">
              <GraduationCap className="h-5 w-5 text-white" aria-hidden />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-slate-900">
              NextStepEdu
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex">
            {items.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-semibold transition-colors hover:text-teal-700",
                  isActive(link.href) ? "text-teal-700" : "text-slate-600",
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-teal-600"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" size="sm" className="gap-2" onClick={openAuth}>
              <LogIn className="h-4 w-4" />
              Login
            </Button>
            <Link href={routes.signup}>
              <Button size="sm" className="gap-2">
                <User className="h-4 w-4" />
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="rounded-xl p-2 transition-colors hover:bg-slate-100 md:hidden"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            type="button"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-slate-200 md:hidden"
            >
              <nav className="container mx-auto flex flex-col gap-2 px-4 py-4">
                {items.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobile}
                    className={cn(
                      "rounded-xl px-3 py-2 text-sm font-semibold transition-colors",
                      isActive(link.href)
                        ? "bg-teal-50 text-teal-800"
                        : "text-slate-700 hover:bg-slate-100",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="mt-3 grid gap-2 border-t border-slate-200 pt-4">
                  <Button variant="outline" size="sm" className="gap-2" onClick={openAuth}>
                    <LogIn className="h-4 w-4" />
                    Login
                  </Button>
                  <Link href={routes.signup} onClick={closeMobile}>
                    <Button size="sm" className="w-full gap-2">
                      <User className="h-4 w-4" />
                      Get Started
                    </Button>
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AuthModal open={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
