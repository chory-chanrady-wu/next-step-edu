import {
  Bell,
  Menu,
  Settings,
  ChevronDown,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BreadcrumbBasic } from "../../common/Breadcrumb";
import { logout, getCurrentUser } from "@/app/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function Header() {
  const notificationCount = 3;
  const user = getCurrentUser();

  // Dynamically get user details from API/LocalStorage
  const currentUserDetails = {
    name:
      user?.name && user.name !== "Admin User"
        ? user.name
        : user?.email?.split("@")[0] || "Admin",
    email: user?.email || "",
  };

  const getInitials = (user: typeof currentUserDetails) => {
    return user.name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getDisplayName = (user: typeof currentUserDetails) => user.name;

  return (
    <header className="sticky top-0 z-30 border-none backdrop-blur-sm ">
      <div className="">
        <div className="flex bg-white border border-gray-200/50 rounded-md h-16 items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-gray-100"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex-1 p-3 hidden md:block ">
            <BreadcrumbBasic />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pr-4">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-gray-100 transition-colors"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              {notificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-semibold text-white">
                  {notificationCount}
                </span>
              )}
            </Button>

            {/* Settings */}
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100 transition-colors"
            >
              <Settings className="h-5 w-5 text-gray-600" />
            </Button>

            {/* User Profile Dropdown */}
            <div className="relative ml-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 px-3 py-2 h-auto hover:bg-gray-100 transition-colors focus-visible:ring-0 focus-visible:ring-offset-0"
                  >
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-md">
                      <span className="text-sm font-semibold text-white">
                        {getInitials(currentUserDetails)}
                      </span>
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-semibold text-gray-900 leading-none">
                        {getDisplayName(currentUserDetails)}
                      </p>
                      <p className="text-[10px] text-gray-500 mt-1 capitalize">
                        {user?.role || "Administrator"}
                      </p>
                    </div>
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
                    asChild
                    className="cursor-pointer py-2 focus:bg-blue-50 focus:text-blue-600"
                  >
                    <Link
                      href="/admin/profile"
                      className="flex w-full items-center"
                    >
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer py-2 focus:bg-blue-50 focus:text-blue-600">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="cursor-pointer py-2 text-red-600 focus:bg-red-50 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
