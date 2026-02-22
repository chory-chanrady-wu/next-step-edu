import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, LogOut } from "lucide-react";
import { getCurrentUser, logout } from "@/app/lib/auth";

export function Header() {
  const user = getCurrentUser();

  // If not authenticated, show guest UI or nothing
  if (!user) {
    return (
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="flex h-16 items-center px-6">
          <div className="ml-auto flex items-center gap-3">
            <span className="text-gray-500 text-sm">Not logged in</span>
          </div>
        </div>
      </header>
    );
  }

  const currentUserDetails = {
    name:
      user?.name && user.name !== "Admin User"
        ? user.name
        : user?.email?.split("@")[0] || "Admin",
    email: user?.email || "",
  };

  const getInitials = (user: typeof currentUserDetails) =>
    user.name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="flex h-16 items-center px-6">
        {/* (Optional) left content here, like breadcrumb */}
        {/* <BreadcrumbBasic /> */}

        {/* Right side */}
        <div className="ml-auto flex items-center gap-3">
          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-3 px-2 py-2 h-auto hover:bg-gray-100 rounded-full"
              >
                {/* Avatar */}
                <div className="h-10 w-10 rounded-full bg-linear-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-md">
                  <span className="text-sm font-semibold text-white">
                    {getInitials(currentUserDetails)}
                  </span>
                </div>

                {/* Name (show like screenshot) */}
                <p className="text-sm font-semibold text-gray-900">
                  {currentUserDetails.name}
                </p>

                {/* Chevron */}
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 mt-2 rounded-xl shadow-xl border-gray-100"
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {currentUserDetails.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {currentUserDetails.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={logout}
                className="cursor-pointer py-2 text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
