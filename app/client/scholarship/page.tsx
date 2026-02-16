"use client";

import * as React from "react";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import Footer from "@/app/components/common/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { getScholarships, type Scholarship } from "@/app/client/scholarship/data";
import { ScholarshipCard } from "@/app/client/components/scholarship/ScholarshipCard";

type SortKey = "name_asc" | "deadline_asc" | "deadline_desc";

const PAGE_SIZE = 6;

function getPaginationModel(current: number, total: number) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: Array<number | "ellipsis"> = [];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);

  pages.push(1);
  if (left > 2) pages.push("ellipsis");
  for (let p = left; p <= right; p++) pages.push(p);
  if (right < total - 1) pages.push("ellipsis");
  pages.push(total);

  return pages;
}

export default function ScholarshipClientPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = React.useState("");
  const [location, setLocation] = React.useState<string>("all");
  const [level, setLevel] = React.useState<string>("all");
  const [sort, setSort] = React.useState<SortKey>("name_asc");
  const [scholarships, setScholarships] = React.useState<Scholarship[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState("");
  const pageFromUrl = Number(searchParams.get("page") ?? "1");
  const page =
    Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1;

  React.useEffect(() => {
    const loadScholarships = async () => {
      setIsLoading(true);
      setLoadError("");
      try {
        const items = await getScholarships();
        setScholarships(items);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to load scholarships from backend.";
        setLoadError(message);
      } finally {
        setIsLoading(false);
      }
    };

    loadScholarships();
  }, []);

  const locations = React.useMemo(() => {
    const uniq = Array.from(
      new Set(scholarships.map((s) => s.location)),
    ).sort();
    return ["all", ...uniq];
  }, [scholarships]);

  const levels = React.useMemo(() => {
    const uniq = Array.from(new Set(scholarships.map((s) => s.level))).sort();
    return ["all", ...uniq];
  }, [scholarships]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    let results = scholarships.filter((s) => {
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
  }, [query, location, level, sort, scholarships]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  React.useEffect(() => {
    if (page === 1) return;
    const next = new URLSearchParams(searchParams.toString());
    next.delete("page");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  }, [query, location, level, sort, page, searchParams, router, pathname]);

  React.useEffect(() => {
    if (page <= totalPages) return;
    const next = new URLSearchParams(searchParams.toString());
    if (totalPages <= 1) next.delete("page");
    else next.set("page", String(totalPages));
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  }, [page, pathname, router, searchParams, totalPages]);

  const makePageHref = React.useCallback(
    (targetPage: number) => {
      const safePage = Math.min(Math.max(1, targetPage), totalPages);
      const next = new URLSearchParams(searchParams.toString());
      if (safePage <= 1) next.delete("page");
      else next.set("page", String(safePage));
      const qs = next.toString();
      return qs ? `${pathname}?${qs}` : pathname;
    },
    [pathname, searchParams, totalPages],
  );

  const paged = React.useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-linear-to-br from-slate-900 via-teal-700 to-emerald-500">
          <div className="container mx-auto px-4 py-14 text-center text-white sm:py-16 lg:py-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
              <Sparkles className="h-4 w-4" aria-hidden />
              <span>Funding Your Dreams</span>
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Discover Scholarships
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
              Find scholarships that match your academic goals and unlock new
              opportunities
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="-mt-12 pb-6 sm:-mt-5">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl rounded-2xl border border-slate-200 bg-white p-4 shadow-md sm:p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by name, location, or university..."
                    className="h-11 rounded-xl pl-11"
                  />
                </div>

                <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 md:w-140">
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="h-11 w-full rounded-xl">
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
                    <SelectTrigger className="h-11 w-full rounded-xl">
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

                  <Select
                    value={sort}
                    onValueChange={(v) => setSort(v as SortKey)}
                  >
                    <SelectTrigger className="h-11 w-full rounded-xl">
                      <SelectValue placeholder="Name (A-Z)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name_asc">Name (A-Z)</SelectItem>
                      <SelectItem value="deadline_asc">
                        Deadline (Soonest)
                      </SelectItem>
                      <SelectItem value="deadline_desc">
                        Deadline (Latest)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-4 flex max-w-7xl items-center justify-between gap-4 text-sm text-slate-600">
              <div>
                Showing{" "}
                <span className="font-semibold text-slate-900">
                  {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}
                  {filtered.length > 0 ? "-" : ""}
                  {Math.min(page * PAGE_SIZE, filtered.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-900">
                  {filtered.length}
                </span>{" "}
                scholarships
              </div>
              <div className="hidden text-slate-500 sm:block">
                Page <span className="font-medium text-slate-900">{page}</span>{" "}
                of{" "}
                <span className="font-medium text-slate-900">{totalPages}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-6 sm:py-4">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {!isLoading &&
                paged.map((s, index) => (
                <ScholarshipCard key={s.id} scholarship={s} index={index} />
                ))}
            </div>

            {isLoading && (
              <div className="mx-auto mt-10 max-w-7xl rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-600">
                Loading scholarships...
              </div>
            )}

            {loadError && !isLoading && (
              <div className="mx-auto mt-10 max-w-7xl rounded-xl border border-red-200 bg-red-50 p-10 text-center text-sm text-red-700">
                {loadError}
              </div>
            )}

            {filtered.length === 0 && !isLoading && !loadError && (
              <div className="mx-auto mt-10 max-w-7xl rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-600">
                No scholarships match your search. Try adjusting filters.
              </div>
            )}

            {filtered.length > 0 && !isLoading && (
              <div className="mx-auto mt-10 max-w-7xl">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href={makePageHref(page - 1)}
                        aria-disabled={page === 1}
                        tabIndex={page === 1 ? -1 : undefined}
                        className={
                          page === 1
                            ? "pointer-events-none opacity-50"
                            : undefined
                        }
                      />
                    </PaginationItem>

                    {getPaginationModel(page, totalPages).map((item, idx) => {
                      if (item === "ellipsis") {
                        return (
                          <PaginationItem key={`e-${idx}`}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      return (
                        <PaginationItem key={item}>
                          <PaginationLink
                            isActive={item === page}
                            href={makePageHref(item)}
                            size="icon"
                          >
                            {item}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}

                    <PaginationItem>
                      <PaginationNext
                        href={makePageHref(page + 1)}
                        aria-disabled={page === totalPages}
                        tabIndex={page === totalPages ? -1 : undefined}
                        className={
                          page === totalPages
                            ? "pointer-events-none opacity-50"
                            : undefined
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
