import { StatsCard } from "@/./app/components/admin/dashboard/StatsCard";
import { RevenueChart } from "@/./app/components/admin/dashboard/RevenueChart";
import { UserChart } from "@/./app/components/admin/dashboard/UserChart";
import {
  Building2,
  GraduationCap,
  BookOpen,
  Users,
  TrendingUp,
} from "lucide-react";

export default function Dashboard() {
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
          value={48}
          change="+3 this month"
          changeType="positive"
          icon={Building2}
          iconColor="bg-info/10 text-info"
        />
        <StatsCard
          title="Total Scholarships"
          value={156}
          change="+12 this month"
          changeType="positive"
          icon={GraduationCap}
          iconColor="bg-accent/10 text-accent"
        />
        <StatsCard
          title="Programs"
          value={324}
          change="+8 this month"
          changeType="positive"
          icon={BookOpen}
          iconColor="bg-success/10 text-success"
        />
        <StatsCard
          title="Registered Users"
          value="2,847"
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
    </div>
  );
}
