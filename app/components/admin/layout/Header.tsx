import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut } from "lucide-react";
import { getCurrentUser, logout } from "@/app/lib/auth";
import Swal from "sweetalert2";
import { useAllProfiles } from "@/hooks/use-queries-hook";
import type { UserProfileResponse } from "@/types/nextstepedu";
import { jwtDecode } from "jwt-decode";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function Header() {
  // Get all user profiles from API
  const { data: profiles, isLoading } = useAllProfiles();

  // Get email from JWT in localStorage
  let email: string | undefined = undefined;
  const user = getCurrentUser();
  if (user) {
    if (user.token) {
      try {
        const decoded: any = jwtDecode(user.token);
        email = decoded.email;
      } catch (e) {
        console.log("Header: jwtDecode error (user.token)", e);
      }
    } else if (typeof user === "string") {
      try {
        const decoded: any = jwtDecode(user);
        email = decoded.email;
      } catch (e) {
        console.log("Header: jwtDecode error (user as string)", e);
      }
    } else if (user.email) {
      email = user.email;
    }
  }

  // Find the profile matching the decoded email
  const profile =
    profiles?.find((u: UserProfileResponse) => u.email === email) || null;
  const loading = isLoading;

  if (loading) {
    return null;
  }

  if (!profile) {
    return (
      <header className="fixed inset-0 z-30 bg-white flex items-center justify-center border-b border-gray-200 min-h-screen">
        <div className="flex flex-col items-center justify-center w-full">
          <span className="text-gray-500 text-lg font-semibold">
            Not logged in
          </span>
        </div>
      </header>
    );
  }

  const getUserInitials = () => {
    if (!profile) return "";
    const name =
      profile.firstname && profile.lastname
        ? `${profile.firstname} ${profile.lastname}`
        : profile.firstname || profile.email || "User";
    return name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getImageUrl = () => profile?.image || undefined;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="flex h-16 items-center px-6">
        {/* Right side */}
        <div className="ml-auto flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 rounded-full transition-opacity hover:opacity-80 hover:bg-slate-50 px-2 py-1">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={getImageUrl()}
                    alt={profile?.email || "User"}
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
                    {profile?.firstname && profile?.lastname
                      ? `${profile.firstname} ${profile.lastname}`
                      : profile?.firstname
                        ? profile.firstname
                        : profile?.email}
                  </span>
                  <span className="text-xs text-slate-500">
                    {profile?.email}
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
                    alt={profile?.email || "User"}
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
                    {profile?.firstname && profile?.lastname
                      ? `${profile.firstname} ${profile.lastname}`
                      : profile?.firstname
                        ? profile.firstname
                        : profile?.email}
                  </p>
                  <p className="text-xs text-slate-500">{profile?.email}</p>
                  {profile?.phone && (
                    <p className="text-xs text-slate-500 mt-1">
                      <span className="font-semibold">Phone:</span>{" "}
                      {profile.phone}
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
                      logout();
                    }
                  }}
                  className="cursor-pointer py-2 text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
