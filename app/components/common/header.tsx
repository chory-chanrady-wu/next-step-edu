"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  GraduationCap,
  LogIn,
  ChevronDown,
  Menu,
  User,
  X,
  LogOut,
  Settings,
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";

import { routes } from "../../lib/routes";

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
import Swal from "sweetalert2";

const navLinks = [
  { href: routes.client.home, label: "Home" },
  { href: routes.client.university, label: "Universities" },
  { href: routes.client.scholarship, label: "Scholarships" },
];

export default function Header() {
  // State declarations
  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [isAuthOpen, setIsAuthOpen] = useState(false);
  const isAuthPage =
    pathname === "/client/login" || pathname === "/client/register";

  // Debug logs removed

  const items = useMemo(() => navLinks, []);
  const isActive = (href: string) => pathname === href;

  // Check if user is logged in, but always fetch user info from API
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setIsLoggedIn(true);
        try {
          const res = await fetch(
            "https://mid-term-wing-nextstepedu-backend-production.up.railway.app/api/v1/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          if (!res.ok) {
            const errorBody = await res.text();
            console.error(
              "Failed to fetch user profile:",
              res.status,
              errorBody,
            );
            // Fallback: use localStorage user if available
            const userData = localStorage.getItem("user");
            if (userData) {
              setUser(JSON.parse(userData));
              console.warn(
                "Using localStorage user fallback.",
                JSON.parse(userData),
              );
            } else {
              setUser(null);
            }
            setIsLoggedIn(!!token);
            return;
          }
          const profileArray = await res.json();
          // Find the correct user from the array
          let selectedUser = null;
          // Try to use localStorage user email if available
          const localUserData = localStorage.getItem("user");
          let localEmail = null;
          if (localUserData) {
            try {
              const parsedLocal = JSON.parse(localUserData);
              localEmail = parsedLocal.email;
            } catch {}
          }
          // Prefer accessToken decoded email for matching user
          if (Array.isArray(profileArray)) {
            let tokenEmail = null;
            if (token) {
              try {
                const payload = token.split(".")[1];
                const decoded = JSON.parse(atob(payload));
                if (decoded.sub) tokenEmail = decoded.sub;
                // console.log removed
              } catch (err) {
                console.error("[Header] Failed to decode accessToken:", err);
              }
            }
            // Always use decoded email for selection if present
            if (tokenEmail) {
              selectedUser = profileArray.find((u) => u.email === tokenEmail);
              if (!selectedUser) {
                // console.warn removed
              }
            }
            // If not found, try localStorage email
            if (!selectedUser && localEmail) {
              selectedUser = profileArray.find((u) => u.email === localEmail);
              if (!selectedUser) {
                // console.warn removed
              }
            }
            // If still not found, fallback to first user
            if (!selectedUser && profileArray.length > 0) {
              selectedUser = profileArray[0];
              // console.warn removed
            }
          } else {
            selectedUser = profileArray;
          }
          // Block login if status is SUSPENDED or INACTIVE
          if (selectedUser && selectedUser.status === "SUSPENDED") {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            setUser(null);
            setIsLoggedIn(false);
            localStorage.setItem("loginError", "SUSPENDED");
            router.push("/client/login");
            return;
          }
          if (selectedUser && selectedUser.status === "INACTIVE") {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            setUser(null);
            setIsLoggedIn(false);
            localStorage.setItem("loginError", "INACTIVE");
            router.push("/client/login");
            return;
          }
          localStorage.setItem("user", JSON.stringify(selectedUser));
          setUser(selectedUser);
        } catch (error) {
          const userData = localStorage.getItem("user");
          if (userData) {
            setUser(JSON.parse(userData));
          } else {
            setUser(null);
          }
          setIsLoggedIn(!!token);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkAuth();

    // Listen for storage changes (e.g., login in another tab)
    const handleStorageChange = () => {
      const userData = localStorage.getItem("user");
      setUser(userData ? JSON.parse(userData) : null);
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
    };
    window.addEventListener("storage", handleStorageChange);

    // Listen for custom user-logged-in event
    const handleUserLoggedIn = () => {
      // console.log removed
      handleStorageChange();
    };
    window.addEventListener("user-logged-in", handleUserLoggedIn);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("user-logged-in", handleUserLoggedIn);
    };
  }, [router]);

  // Modal login removed: no longer needed

  const closeMobile = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    // toast.success("Logged out successfully");
    router.push("/");
  };

  const getUserInitials = () => {
    if (!user) return "U";
    if (user.firstname && user.lastname) {
      return `${user.firstname[0]}${user.lastname[0]}`.toUpperCase();
    }
    if (user.firstname) {
      return user.firstname[0].toUpperCase();
    }
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  const getImageUrl = () => {
    if (!user?.image) return "";

    try {
      // If it's already a full URL, return as is
      if (user.image.startsWith("http")) return user.image;
      // If it's a relative path, prepend API base URL
      const baseUrl =
        "https://mid-term-nextstepedu-production.up.railway.app";
      return `${baseUrl}${user.image.startsWith("/") ? "" : "/"}${user.image}`;
    } catch (error) {
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
                  <button className="flex items-center gap-3 rounded-full transition-opacity hover:opacity-80 hover:bg-slate-50 px-2 py-1 focus:outline-none">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={getImageUrl()}
                        alt={user?.email || "User"}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                        className="h-10 w-10 rounded-full"
                      />
                      <AvatarFallback className="bg-teal-600 text-white font-semibold">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:flex flex-col items-start">
                      <span className="text-sm font-semibold text-slate-900">
                        {user?.firstname && user?.lastname
                          ? `${user.firstname} ${user.lastname}`
                          : user?.firstname
                            ? user.firstname
                            : user?.email}
                      </span>
                      <span className="text-xs text-slate-500">
                        {user?.email}
                      </span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <div className="p-4 flex flex-col items-center gap-3 border-b border-slate-200">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={getImageUrl()}
                        alt={user?.email}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                        className="h-16 w-16 rounded-full"
                      />
                      <AvatarFallback className="bg-teal-600 text-white text-xl font-semibold">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <p className="text-base font-semibold text-slate-900">
                        {user?.firstname && user?.lastname
                          ? `${user.firstname} ${user.lastname}`
                          : user?.firstname
                            ? user.firstname
                            : user?.email}
                      </p>
                      <p className="text-xs text-slate-500">{user?.email}</p>
                      {user?.phone && (
                        <p className="text-xs text-slate-500 mt-1">
                          <span className="font-semibold">Phone:</span>{" "}
                          {user.phone}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="p-2 space-y-1 justify-center flex">
                    <DropdownMenuSeparator className="my-1" />
                    <DropdownMenuItem
                      onClick={async () => {
                        const result = await Swal.fire({
                          title: "Are you sure?",
                          text: "Do you want to logout?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#d33",
                          cancelButtonColor: "#3085d6",
                          confirmButtonText: "Yes, logout",
                          cancelButtonText: "Cancel",
                        });
                        if (result.isConfirmed) {
                          handleLogout();
                        }
                      }}
                      variant="destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              !isAuthPage && (
                <Link href="/client/login">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <LogIn className="h-4 w-4" />
                    Login
                  </Button>
                </Link>
              )
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
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                            className="h-14 w-14 rounded-full"
                          />
                          <AvatarFallback className="bg-teal-600 text-white text-lg font-semibold">
                            {getUserInitials()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                          <p className="text-sm font-semibold text-slate-900">
                            {user?.firstname && user?.lastname
                              ? `${user.firstname} ${user.lastname}`
                              : user?.firstname
                                ? user.firstname
                                : user?.email || "User"}
                          </p>
                          <p className="text-xs text-slate-500">
                            {user?.email}
                          </p>
                          {user?.phone && (
                            <p className="text-xs text-slate-500 mt-1">
                              <span className="font-semibold">Phone:</span>{" "}
                              {user.phone}
                            </p>
                          )}
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
                    <Link href="/client/login">
                      <Button variant="outline" size="sm" className="gap-2">
                        <LogIn className="h-4 w-4" />
                        Login
                      </Button>
                    </Link>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* <AuthModal open={isAuthOpen} onClose={() => setIsAuthOpen(false)} /> */}
    </>
  );
}
