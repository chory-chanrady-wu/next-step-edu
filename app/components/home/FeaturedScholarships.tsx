"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Calendar, MapPin, School } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import Container from "../common/Container";
import Button from "../common/Button";

import { getAllScholarships } from "@/lib/api";
import type { ScholarshipResponse } from "@/types/nextstepedu";

function normalizeScholarship(s: any) {
  return {
    id: s.id,
    name: s.name,
    description: s.description ?? "",
    logoUrl: s.logoUrl ?? s.logo_url ?? "/images/placeholder-logo.png",
    level: s.level ?? s.degreeLevelName ?? "All Levels",
    deadline: s.deadline ?? s.endDate ?? null,
    location: s.location ?? s.country ?? "Cambodia",
    university: s.university?.name ?? s.universityName ?? "",
    benefits: Array.isArray(s.benefits)
      ? s.benefits
      : Array.isArray(s.benefitList)
        ? s.benefitList
        : [],
  };
}

export default function FeaturedScholarships() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["scholarships", "featured"],
    queryFn: () =>
      getAllScholarships({ page: 0, size: 3, sortBy: "id", sortDir: "desc" }),
  });

  const list: ScholarshipResponse[] =
    (data as any)?.content ?? (data as any)?.items ?? (data as any)?.data ?? [];

  const featured = list.slice(0, 3).map(normalizeScholarship);

  return (
    <section className="py-10 md:py-14 bg-white">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Funding Opportunities
            </span>
            <h2 className="mt-2 text-4xl md:text-5xl font-extrabold text-slate-900">
              Featured Scholarships
            </h2>
            <p className="mt-3 text-slate-600 max-w-lg">
              Discover scholarships that can help fund your education journey
              and achieve your academic dreams.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link href="/client/scholarship">
              <Button variant="warning" className="group">
                View All Scholarships
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {isLoading && (
          <div className="text-slate-600">Loading scholarships...</div>
        )}
        {isError && (
          <div className="text-red-500">Failed to load scholarships.</div>
        )}
        {!isLoading && !isError && featured.length === 0 && (
          <div className="text-slate-600">No scholarships found.</div>
        )}

        {!isLoading && !isError && featured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((s, index) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="overflow-hidden rounded-3xl border bg-white shadow-sm"
              >
                <div className="h-2 bg-amber-500" />

                <div className="p-7">
                  <div className="flex items-start gap-4">
                    {/* keep img or switch to next/image later */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.logoUrl}
                      alt={s.name}
                      className="h-16 w-16 rounded-2xl object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="text-xl font-extrabold text-slate-900">
                        {s.name}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-slate-600">
                        <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-600">
                          {s.level}
                        </span>

                        {s.deadline && (
                          <span className="inline-flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4" />{" "}
                            {String(s.deadline)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-slate-600 line-clamp-3">
                    {s.description}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-4 border-b pb-6 text-slate-600">
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-5 w-5" /> {s.location}
                    </span>

                    {s.university && (
                      <span className="inline-flex items-center gap-2">
                        <School className="h-5 w-5" /> {s.university}
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {(s.benefits ?? []).slice(0, 2).map((t: string) => (
                      <span
                        key={t}
                        className="rounded-full border px-4 py-2 text-sm text-slate-700"
                      >
                        {t}
                      </span>
                    ))}

                    {(s.benefits ?? []).length > 2 && (
                      <span className="rounded-full border px-4 py-2 text-sm text-slate-700">
                        +{(s.benefits ?? []).length - 2} more
                      </span>
                    )}
                  </div>

                  <Link href={`/client/scholarship/${s.id}`}>
                    <button className="mt-6 inline-flex items-center gap-2 text-base font-bold text-slate-900 hover:underline">
                      View Details <ArrowRight className="h-5 w-5" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
