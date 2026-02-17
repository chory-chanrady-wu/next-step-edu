"use client";

import { useAllProfiles } from "@/hooks/use-queries-hook";
import { format, parseISO } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Shield, GraduationCap, Phone, Calendar } from "lucide-react";

export function RecentUsersTable() {
  const { data: profiles = [], isLoading } = useAllProfiles();
  console.log("Recent Users Data:", profiles);

  if (isLoading) {
    return <div className="p-4 text-center">Loading users...</div>;
  }
  const getStatusColor = (status: string = "ACTIVE") => {
    switch (status.toUpperCase()) {
      case "ACTIVE":
        return "bg-green-100 text-green-700 hover:bg-green-100/80";
      case "INACTIVE":
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100/80";
    }
  };

  const getRoleIcon = (role: string = "USER") => {
    switch (role.toUpperCase()) {
      case "ADMIN":
        return <Shield className="w-4 h-4 text-purple-500 mr-2" />;
      default:
        return <GraduationCap className="w-4 h-4 text-blue-400 mr-2" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">Recent Users</h3>
        <p className="text-sm text-gray-500">
          Latest registered users on the platform
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[300px]">User Profile</TableHead>
              <TableHead>Account Status</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>Joined Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profiles.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center h-24 text-muted-foreground"
                >
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              profiles.slice(0, 5).map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-gray-200">
                        <AvatarImage
                          src={user.image || user.image}
                          alt={user.firstname}
                          className="object-contain"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-medium">
                          {user.firstname?.[0]}
                          {user.lastname?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900">
                          {user.firstname} {user.lastname}
                        </span>
                        <span className="text-xs text-gray-500 truncate max-w-[180px]">
                          {user.email || "No email"}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status || "ACTIVE")}`}
                    >
                      {user.status || "ACTIVE"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-gray-700 font-medium bg-gray-50 px-3 py-1 rounded-full w-fit">
                      {getRoleIcon(user.role || "USER")}
                      <span>
                        {(user.role || "").toUpperCase() === "ADMIN"
                          ? "Admin"
                          : "Student"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Phone className="w-3.5 h-3.5 mr-2" />
                      {user.phone || "N/A"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-gray-500 text-sm">
                      {user.createdAt ? (
                        <>
                          <Calendar className="w-3.5 h-3.5 mr-2" />
                          {format(parseISO(user.createdAt), "MMM d, yyyy")}
                        </>
                      ) : (
                        <span className="text-blue-500 font-bold text-[10px] uppercase">
                          Just Joined
                        </span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
