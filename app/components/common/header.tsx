"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  GraduationCap,
  LogIn,
  Menu,
  User,
  X,
  LogOut,
  Settings,
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";

import { routes } from "../../lib/routes";
import AuthModal from "./auth/AuthModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const navLinks = [
  { href: routes.client.home, label: "Home" },
  { href: routes.client.university, label: "Universities" },
  { href: routes.client.scholarship, label: "Scholarships" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const items = useMemo(() => navLinks, []);
  const isActive = (href: string) => pathname === href;

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("accessToken");
      const userData = localStorage.getItem("user");

      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Failed to parse user data:", error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkAuth();

    // Listen for storage changes (e.g., login in another tab)
    const handleStorageChange = () => checkAuth();
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Recheck auth when auth modal closes
  useEffect(() => {
    if (!isAuthOpen) {
      const token = localStorage.getItem("accessToken");
      const userData = localStorage.getItem("user");

      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          // Use a microtask to defer state updates and avoid cascading renders
          Promise.resolve().then(() => {
            setUser(parsedUser);
            setIsLoggedIn(true);
          });
        } catch (error) {
          console.error("Failed to parse user data:", error);
        }
      }
    }
  }, [isAuthOpen, setUser, setIsLoggedIn]);

  const closeMobile = () => setIsMobileMenuOpen(false);
  const openAuth = () => {
    // Prevent admin users from using client login modal
    if (user?.role === "admin") {
      toast.error("Please use the admin portal to login");
      router.push("/admin/login");
      return;
    }
    closeMobile();
    setIsAuthOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
    router.push("/");
  };

  const getUserInitials = () => {
    if (!user) return "U";
    const firstname = user.firstname || user.email?.[0] || "";
    const lastname = user.lastname || user.email?.[1] || "";
    return `${firstname[0] || ""}${lastname[0] || ""}`.toUpperCase() || "U";
  };

  const getImageUrl = () => {
    if (!user?.image) return "";

    try {
      // If it's already a full URL, return as is
      if (user.image.startsWith("http")) return user.image;
      // If it's a relative path, prepend API base URL
      const baseUrl =
        "https://mid-term-wing-nextstepedu-backend-production.up.railway.app";
      return `${baseUrl}${user.image.startsWith("/") ? "" : "/"}${user.image}`;
    } catch (error) {
      console.error("Error constructing image URL:", error);
      return "";
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/70">
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
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 rounded-full transition-opacity hover:opacity-80 hover:bg-slate-50 px-2 py-1">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={getImageUrl()}
                        alt={user?.email || "User"}
                      />
                      <AvatarFallback className="bg-teal-600 text-white font-semibold">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:flex flex-col items-start">
                      <span className="text-sm font-semibold text-slate-900">
                        {user?.firstname || user?.email || "User"}
                      </span>
                      <span className="text-xs text-slate-500">
                        {user?.email}
                      </span>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <div className="p-4 flex flex-col items-center gap-3 border-b border-slate-200">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={getImageUrl()}
                        alt={user?.email || "User"}
                      />
                      <AvatarFallback className="bg-teal-600 text-white text-xl font-semibold">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <p className="text-base font-semibold text-slate-900">
                        {user?.firstname && user?.lastname
                          ? `${user.firstname} ${user.lastname}`
                          : user?.email}
                      </p>
                      <p className="text-xs text-slate-500">{user?.email}</p>
                    </div>
                  </div>
                  <div className="p-2 space-y-1">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-1" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      variant="destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="gap-2"
                onClick={openAuth}
              >
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="rounded-xl p-2 transition-colors hover:bg-slate-100 md:hidden"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            type="button"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
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
                  {isLoggedIn ? (
                    <>
                      <div className="flex flex-col items-center gap-3 px-3 py-4 bg-slate-50 rounded-lg">
                        <Avatar className="h-14 w-14">
                          <AvatarImage
                            src={getImageUrl()}
                            alt={user?.email || "User"}
                          />
                          <AvatarFallback className="bg-teal-600 text-white text-lg font-semibold">
                            {getUserInitials()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                          <p className="text-sm font-semibold text-slate-900">
                            {user?.firstname && user?.lastname
                              ? `${user.firstname} ${user.lastname}`
                              : user?.email}
                          </p>
                          <p className="text-xs text-slate-500">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <User className="h-4 w-4" />
                        Profile
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Settings className="h-4 w-4" />
                        Settings
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 text-red-600 hover:text-red-700"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={openAuth}
                    >
                      <LogIn className="h-4 w-4" />
                      Login
                    </Button>
                  )}
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
