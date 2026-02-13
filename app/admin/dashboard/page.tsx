"use client";

import { StatsCard } from "@/app/components/admin/dashboard/StatsCard";
import { RevenueChart } from "@/app/components/admin/dashboard/RevenueChart";
import { UserChart } from "@/app/components/admin/dashboard/UserChart";
import {
  Building2,
  GraduationCap,
  BookOpen,
  Users,
} from "lucide-react";
import {
  useAllUniversities,
  useAllScholarships,
  useAllPrograms,
  useAllProfiles,
} from "@/hooks/use-queries-hook";
import { RecentUsersTable } from "@/app/components/admin/dashboard/RecentUsersTable";

export default function Dashboard() {
  const { data: universities } = useAllUniversities();
  const { data: scholarships } = useAllScholarships({ size: 1 }); // Just need count
  const { data: programs } = useAllPrograms();
  const { data: profiles } = useAllProfiles();
  console.log("Dashboard Data:", { universities, scholarships, programs, profiles });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Universities"
          value={universities?.length || 0}
          change="+3 this month"
          changeType="positive"
          icon={Building2}
          iconColor="bg-info/10 text-info"
        />
        <StatsCard
          title="Total Scholarships"
          value={scholarships?.totalElements || 0}
          change="+12 this month"
          changeType="positive"
          icon={GraduationCap}
          iconColor="bg-accent/10 text-accent"
        />
        <StatsCard
          title="Programs"
          value={programs?.length || 0}
          change="+8 this month"
          changeType="positive"
          icon={BookOpen}
          iconColor="bg-success/10 text-success"
        />
        <StatsCard
          title="Registered Users"
          value={profiles?.length || 0}
          change="+127 this month"
          changeType="positive"
          icon={Users}
          iconColor="bg-warning/10 text-warning"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <UserChart />
      </div>

      {/* Recent Users Table */}
      <div className="mt-8">
        <RecentUsersTable />
      </div>
    </div>
  );
}
