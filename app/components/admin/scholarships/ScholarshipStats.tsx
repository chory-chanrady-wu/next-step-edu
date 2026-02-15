import { Award, Star, UserCheck } from "lucide-react";
import React from "react";

interface ScholarshipStatsProps {
  totalApplications?: number;
  shortlisted?: number;
  awarded?: number;
  saved?: number;
  className?: string;
}

interface ScholarshipData {
  id: string;
  name: string;
  provider: string;
  providerLogo: string;
  amount: number;
  currency: string;
  status: "open" | "closed" | "upcoming";
  category: string;
  deadline: string;
  applicants: number;
  maxApplicants: number;
  eligibility: string[];
  awardType: "full" | "partial" | "merit";
  educationLevel: string;
  renewable: boolean;
  website: string;
  featured: boolean;
  rating: number;
  lastUpdated: string;
  tags: string[];
  applicationFee: boolean;
  documentsRequired: string[];
  location: string;
  international: boolean;
  createdBy: string;
  createdAt: string;
  views: number;
  saves: number;
  applications: number;
  shortlisted: number;
  awarded: number;
}

export const ScholarshipStats: React.FC<ScholarshipStatsProps> = ({
  totalApplications = 245,
  shortlisted = 50,
  awarded = 10,
  saved = 85,
  className = "",
}) => {
  return (
    <div className={`flex flex-col rounded gap-2 ${className}`}>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Scholarship Statistics
      </span>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
        {/* Total Applications Card */}
        <div className="box-total-scholarship rounded-xl border dark:border-gray-700 p-4 flex items-center gap-4 bg-white dark:bg-gray-800 hover:shadow-sm transition-shadow">
          <div className="box-icon bg-blue-400/20 text-blue-600 dark:text-blue-400 rounded-full p-2 flex items-center justify-center">
            <UserCheck size={20} />
          </div>
          <div className="box-info">
            <div className="box-number font-bold text-lg text-gray-900 dark:text-gray-100">
              {totalApplications.toLocaleString()}
            </div>
            <div className="box-label text-sm text-gray-600/80 dark:text-gray-400">
              Total Applications
            </div>
          </div>
        </div>

        {/* Shortlisted Card */}
        <div className="box-total-scholarship rounded-xl border dark:border-gray-700 p-4 flex items-center gap-4 bg-white dark:bg-gray-800 hover:shadow-sm transition-shadow">
          <div className="box-icon bg-indigo-400/20 text-indigo-600 dark:text-indigo-400 rounded-full p-2 flex items-center justify-center">
            <UserCheck size={20} />
          </div>
          <div className="box-info">
            <div className="box-number font-bold text-lg text-gray-900 dark:text-gray-100">
              {shortlisted.toLocaleString()}
            </div>
            <div className="box-label text-sm text-gray-600/80 dark:text-gray-400">
              Shortlisted
            </div>
          </div>
        </div>

        {/* Awarded Card */}
        <div className="box-total-scholarship rounded-xl border dark:border-gray-700 p-4 flex items-center gap-4 bg-white dark:bg-gray-800 hover:shadow-sm transition-shadow">
          <div className="box-icon bg-green-400/20 text-green-600 dark:text-green-400 rounded-full p-2 flex items-center justify-center">
            <Award size={20} />
          </div>
          <div className="box-info">
            <div className="box-number font-bold text-lg text-gray-900 dark:text-gray-100">
              {awarded.toLocaleString()}
            </div>
            <div className="box-label text-sm text-gray-600/80 dark:text-gray-400">
              Awarded
            </div>
          </div>
        </div>

        {/* Saved Card */}
        <div className="box-total-scholarship rounded-xl border dark:border-gray-700 p-4 flex items-center gap-4 bg-white dark:bg-gray-800 hover:shadow-sm transition-shadow">
          <div className="box-icon bg-yellow-400/20 text-yellow-600 dark:text-yellow-400 rounded-full p-2 flex items-center justify-center">
            <Star size={20} />
          </div>
          <div className="box-info">
            <div className="box-number font-bold text-lg text-gray-900 dark:text-gray-100">
              {saved.toLocaleString()}
            </div>
            <div className="box-label text-sm text-gray-600/80 dark:text-gray-400">
              Saved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Optional: Enhanced version with progress indicators
export const ScholarshipStatsWithProgress: React.FC<ScholarshipStatsProps> = ({
  totalApplications = 245,
  shortlisted = 50,
  awarded = 10,
  saved = 85,
  className = "",
}) => {
  const calculatePercentage = (value: number, total: number) => {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  };

  const shortlistedPercentage = calculatePercentage(
    shortlisted,
    totalApplications,
  );
  const awardedPercentage = calculatePercentage(awarded, totalApplications);

  return (
    <div className={`flex flex-col rounded gap-2 ${className}`}>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Scholarship Statistics
      </span>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
        {/* Total Applications */}
        <div className="box-total-scholarship rounded-xl border dark:border-gray-700 p-4 bg-white dark:bg-gray-800 hover:shadow-sm transition-shadow">
          <div className="flex items-center gap-4 mb-3">
            <div className="box-icon bg-blue-400/20 text-blue-600 dark:text-blue-400 rounded-full p-2 flex items-center justify-center">
              <UserCheck size={20} />
            </div>
            <div className="box-info">
              <div className="box-number font-bold text-lg text-gray-900 dark:text-gray-100">
                {totalApplications.toLocaleString()}
              </div>
              <div className="box-label text-sm text-gray-600/80 dark:text-gray-400">
                Total Applications
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Applications received
          </div>
        </div>

        {/* Shortlisted */}
        <div className="box-total-scholarship rounded-xl border dark:border-gray-700 p-4 bg-white dark:bg-gray-800 hover:shadow-sm transition-shadow">
          <div className="flex items-center gap-4 mb-3">
            <div className="box-icon bg-indigo-400/20 text-indigo-600 dark:text-indigo-400 rounded-full p-2 flex items-center justify-center">
              <UserCheck size={20} />
            </div>
            <div className="box-info">
              <div className="box-number font-bold text-lg text-gray-900 dark:text-gray-100">
                {shortlisted.toLocaleString()}
              </div>
              <div className="box-label text-sm text-gray-600/80 dark:text-gray-400">
                Shortlisted
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {shortlistedPercentage}% of total applications
          </div>
        </div>

        {/* Awarded */}
        <div className="box-total-scholarship rounded-xl border dark:border-gray-700 p-4 bg-white dark:bg-gray-800 hover:shadow-sm transition-shadow">
          <div className="flex items-center gap-4 mb-3">
            <div className="box-icon bg-green-400/20 text-green-600 dark:text-green-400 rounded-full p-2 flex items-center justify-center">
              <Award size={20} />
            </div>
            <div className="box-info">
              <div className="box-number font-bold text-lg text-gray-900 dark:text-gray-100">
                {awarded.toLocaleString()}
              </div>
              <div className="box-label text-sm text-gray-600/80 dark:text-gray-400">
                Awarded
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {awardedPercentage}% of total applications
          </div>
        </div>

        {/* Saved */}
        <div className="box-total-scholarship rounded-xl border dark:border-gray-700 p-4 bg-white dark:bg-gray-800 hover:shadow-sm transition-shadow">
          <div className="flex items-center gap-4 mb-3">
            <div className="box-icon bg-yellow-400/20 text-yellow-600 dark:text-yellow-400 rounded-full p-2 flex items-center justify-center">
              <Star size={20} />
            </div>
            <div className="box-info">
              <div className="box-number font-bold text-lg text-gray-900 dark:text-gray-100">
                {saved.toLocaleString()}
              </div>
              <div className="box-label text-sm text-gray-600/80 dark:text-gray-400">
                Saved
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Saved by students
          </div>
        </div>
      </div>
    </div>
  );
};

// Version compatible with the original ScholarshipDetailAdmin component
export const ScholarshipStatsForDetail: React.FC<{
  scholarship: ScholarshipData;
}> = ({ scholarship }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {/* Total Applications */}
      <div className="rounded-xl border dark:border-gray-700 p-4 flex items-center gap-4 bg-white dark:bg-gray-800 hover:shadow-sm transition-shadow">
        <div className="box-icon bg-blue-400/20 text-blue-600 dark:text-blue-400 rounded-full p-2 flex items-center justify-center">
          <UserCheck size={20} />
        </div>
        <div className="box-info">
          <div className="box-number font-bold text-lg text-gray-900 dark:text-gray-100">
            {scholarship.applicants?.toLocaleString() || 0}
          </div>
          <div className="box-label text-sm text-gray-600/80 dark:text-gray-400">
            Total Applications
          </div>
        </div>
      </div>

      {/* Shortlisted */}
      <div className="rounded-xl border dark:border-gray-700 p-4 flex items-center gap-4 bg-white dark:bg-gray-800 hover:shadow-sm transition-shadow">
        <div className="box-icon bg-indigo-400/20 text-indigo-600 dark:text-indigo-400 rounded-full p-2 flex items-center justify-center">
          <UserCheck size={20} />
        </div>
        <div className="box-info">
          <div className="box-number font-bold text-lg text-gray-900 dark:text-gray-100">
            {scholarship.shortlisted?.toLocaleString() || 0}
          </div>
          <div className="box-label text-sm text-gray-600/80 dark:text-gray-400">
            Shortlisted
          </div>
        </div>
      </div>

      {/* Awarded */}
      <div className="rounded-xl border dark:border-gray-700 p-4 flex items-center gap-4 bg-white dark:bg-gray-800 hover:shadow-sm transition-shadow">
        <div className="box-icon bg-green-400/20 text-green-600 dark:text-green-400 rounded-full p-2 flex items-center justify-center">
          <Award size={20} />
        </div>
        <div className="box-info">
          <div className="box-number font-bold text-lg text-gray-900 dark:text-gray-100">
            {scholarship.awarded?.toLocaleString() || 0}
          </div>
          <div className="box-label text-sm text-gray-600/80 dark:text-gray-400">
            Awarded
          </div>
        </div>
      </div>

      {/* Saved */}
      <div className="rounded-xl border dark:border-gray-700 p-4 flex items-center gap-4 bg-white dark:bg-gray-800 hover:shadow-sm transition-shadow">
        <div className="box-icon bg-yellow-400/20 text-yellow-600 dark:text-yellow-400 rounded-full p-2 flex items-center justify-center">
          <Star size={20} />
        </div>
        <div className="box-info">
          <div className="box-number font-bold text-lg text-gray-900 dark:text-gray-100">
            {scholarship.saves?.toLocaleString() || 0}
          </div>
          <div className="box-label text-sm text-gray-600/80 dark:text-gray-400">
            Saved
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipStats;
