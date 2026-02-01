"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Search,
  SlidersHorizontal,
  GraduationCap,
  University,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SCHOLARSHIPS } from "@/app/client/scholarship/data";

type SortKey = "name_asc" | "deadline_asc" | "deadline_desc";

function formatDate(iso: string) {
  // Simple YYYY-MM-DD -> YYYY-MM-DD (keeps the screenshot vibe and avoids locale shifts)
  return iso;
}

export default function ScholarshipClientPage() {
  const [query, setQuery] = React.useState("");
  const [location, setLocation] = React.useState<string>("all");
  const [level, setLevel] = React.useState<string>("all");
  const [sort, setSort] = React.useState<SortKey>("name_asc");

  const locations = React.useMemo(() => {
    const uniq = Array.from(new Set(SCHOLARSHIPS.map((s) => s.location))).sort();
    return ["all", ...uniq];
  }, []);

  const levels = React.useMemo(() => {
    const uniq = Array.from(new Set(SCHOLARSHIPS.map((s) => s.level))).sort();
    return ["all", ...uniq];
  }, []);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    let results = SCHOLARSHIPS.filter((s) => {
      if (location !== "all" && s.location !== location) return false;
      if (level !== "all" && s.level !== level) return false;
      if (!q) return true;
      return (
        s.title.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        s.university.toLowerCase().includes(q)
      );
    });

    results = results.slice().sort((a, b) => {
      if (sort === "name_asc") return a.title.localeCompare(b.title);
      if (sort === "deadline_desc") return b.deadline.localeCompare(a.deadline);
      return a.deadline.localeCompare(b.deadline); // deadline_asc
    });

    return results;
  }, [query, location, level, sort]);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-linear-to-b from-amber-400 to-orange-500">
        <div className="container mx-auto px-4 py-10 text-center text-slate-900">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
            <span aria-hidden>✨</span>
            <span>Funding Your Dreams</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Discover Scholarships
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-900/80 sm:text-base">
            Find scholarships that match your academic goals and unlock new
            opportunities
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="-mt-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, location, or university..."
                  className="h-9 pl-9"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:w-[520px]">
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="h-9">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="h-4 w-4 text-slate-500" />
                      <SelectValue placeholder="All Locations" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((l) => (
                      <SelectItem key={l} value={l}>
                        {l === "all" ? "All Locations" : l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((lv) => (
                      <SelectItem key={lv} value={lv}>
                        {lv === "all" ? "All Levels" : lv}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Name (A-Z)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name_asc">Name (A-Z)</SelectItem>
                    <SelectItem value="deadline_asc">Deadline (Soonest)</SelectItem>
                    <SelectItem value="deadline_desc">Deadline (Latest)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-5 max-w-6xl text-sm text-slate-600">
            Showing <span className="font-semibold text-slate-900">{filtered.length}</span>{" "}
            scholarships
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-7">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <Card
                key={s.id}
                className="group overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                <div className="h-2 bg-linear-to-r from-amber-400 to-orange-500" />

                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <img
                      src={s.imageUrl}
                      alt=""
                      className="h-11 w-11 rounded-md object-cover"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[15px] font-semibold text-slate-900">
                        {s.title}
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <Badge variant="accent">{s.level}</Badge>
                        <Badge variant="secondary" className="gap-1">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {formatDate(s.deadline)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 line-clamp-3 text-sm text-slate-600">
                    {s.summary}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {s.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <University className="h-3.5 w-3.5" />
                      {s.university}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.benefits.slice(0, 2).map((b) => (
                      <Badge key={b} variant="default" className="bg-white">
                        {b}
                      </Badge>
                    ))}
                    {s.benefits.length > 2 && (
                      <Badge variant="default" className="bg-white">
                        +{s.benefits.length - 2} more
                      </Badge>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="justify-between border-t border-slate-200 bg-white">
                  <span className="inline-flex items-center gap-2 text-xs text-slate-500">
                    <GraduationCap className="h-4 w-4" />
                    Scholarship
                  </span>
                  <Button asChild variant="ghost" className="px-2">
                    <Link href={`/client/scholarship/${s.id}`}>
                      <span className="text-slate-700 group-hover:text-teal-700">
                        View Details
                      </span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mx-auto mt-10 max-w-6xl rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-600">
              No scholarships match your search. Try adjusting filters.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}