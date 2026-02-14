"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, GraduationCap, MapPin } from "lucide-react";

import type { Scholarship } from "@/app/client/scholarship/data";
import { Badge } from "@/components/ui/badge";

type ScholarshipCardProps = {
  scholarship: Scholarship;
  index?: number;
};

function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  return `${text.slice(0, max)}...`;
}

export function ScholarshipCard({ scholarship, index = 0 }: ScholarshipCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="h-full"
    >
      <Link
        href={`/client/scholarship/${scholarship.id}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
      >
        <div className="h-2 bg-linear-to-br from-slate-700 via-teal-700 to-emerald-500" />

        <div className="flex flex-1 flex-col p-6">
          <div className="flex gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={scholarship.imageUrl}
              alt={scholarship.title}
              className="h-14 w-14 shrink-0 rounded-xl object-cover"
              loading="lazy"
            />

            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-1 text-lg font-semibold text-slate-900 transition-colors group-hover:text-teal-700">
                {scholarship.title}
              </h3>

              <div className="mt-1 flex flex-wrap items-center gap-2">
                <Badge variant="accent" className="bg-emerald-50 text-emerald-950">
                  {scholarship.level}
                </Badge>

                <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {scholarship.deadline}
                </span>
              </div>
            </div>
          </div>

          <p className="mt-4 line-clamp-2 text-sm text-slate-600">
            {scholarship.summary}
          </p>

          <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {scholarship.location}
            </span>
            {scholarship.university && (
              <span className="inline-flex items-center gap-1">
                <GraduationCap className="h-3.5 w-3.5" />
                {scholarship.university}
              </span>
            )}
          </div>

          <div className="mt-4 border-t border-slate-200 pt-4">
            <div className="flex flex-wrap gap-2">
              {scholarship.benefits.slice(0, 2).map((benefit) => (
                <Badge
                  key={benefit}
                  variant="outline"
                  className="text-xs font-normal"
                >
                  {truncate(benefit, 28)}
                </Badge>
              ))}
              {scholarship.benefits.length > 2 && (
                <Badge variant="outline" className="text-xs font-normal">
                  +{scholarship.benefits.length - 2} more
                </Badge>
              )}
            </div>
          </div>

          <div className="mt-auto pt-5">
            <div className="flex items-center text-sm font-semibold text-teal-700 transition-colors group-hover:text-teal-800">
              <span>View Details</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
