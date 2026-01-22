import { Bell, Menu, Settings, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BreadcrumbBasic } from "../../common/Breadcrumb";

export function Header() {
  const notificationCount = 3;

  // Mock user details
  const currentUserDetails = {
    name: "Admin User",
    email: "admin@nextstepedu.com"
  };

  const getInitials = (user: typeof currentUserDetails) => {
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getDisplayName = (user: typeof currentUserDetails) => user.name;

  return (
    <header className="sticky top-0 z-30 border-none backdrop-blur-sm ">
      <div className="">
        <div className="flex bg-white border border-gray-200/50 rounded-md  h-16 items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-gray-100"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex-1 p-3 hidden md:block ">
            <BreadcrumbBasic/>
          </div>

          {/* Actions */}
          <div className="flex  items-center gap-2">
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
              <Button
                variant="ghost"
                className="flex items-center gap-3 px-3 py-2 h-auto hover:bg-gray-100 transition-colors"
              >
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-md">
                  <span className="text-sm font-semibold text-white">
                    {getInitials(currentUserDetails)}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-900">
                    {getDisplayName(currentUserDetails)}
                  </p>
                </div>
                <ChevronDown
                  className="h-4 w-4 text-gray-500"
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
