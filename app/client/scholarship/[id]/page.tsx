import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  School,
  Sparkles,
  University,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getScholarshipById } from "@/app/client/scholarship/data";

export default async function ScholarshipDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const scholarship = getScholarshipById(id);

  if (!scholarship) notFound();

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero background */}
      <section
        className="relative h-[240px] w-full overflow-hidden"
        style={{ backgroundImage: `url(${scholarship.heroImageUrl})` }}
      >
        <div className="absolute inset-0 bg-slate-900/35" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-slate-50" />

        <div className="container relative mx-auto px-4 pt-6">
          <Button asChild variant="secondary" className="rounded-full bg-amber-300 text-slate-900 hover:bg-amber-200">
            <Link href="/client/scholarship" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Scholarships
            </Link>
          </Button>
        </div>
      </section>

      {/* Header row */}
      <section className="-mt-24 pb-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <img
                src={scholarship.imageUrl}
                alt=""
                className="h-14 w-14 rounded-lg object-cover shadow-sm"
                loading="lazy"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="accent" className="bg-amber-200 text-amber-950">
                    ✨ {scholarship.level}
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Deadline: {scholarship.deadline}
                  </Badge>
                </div>
                <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  {scholarship.title}
                </h1>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {scholarship.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <University className="h-3.5 w-3.5" />
                    {scholarship.university}
                  </span>
                </div>
              </div>
            </div>

            <Button asChild className="w-full sm:w-auto">
              <a href={scholarship.howToApply.url} target="_blank" rel="noreferrer" className="gap-2">
                <ArrowUpRight className="h-4 w-4" />
                Apply Now
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left column */}
            <div className="lg:col-span-8">
              <div className="grid gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Sparkles className="h-4 w-4 text-teal-600" />
                      About This Scholarship
                    </div>
                    <p className="mt-3 text-sm text-slate-600">
                      {scholarship.summary}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <CheckCircle2 className="h-4 w-4 text-teal-600" />
                      Benefits
                    </div>
                    <ul className="mt-4 space-y-2">
                      {scholarship.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                            ✓
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <School className="h-4 w-4 text-teal-600" />
                      Requirements
                    </div>
                    <ol className="mt-4 space-y-2">
                      {scholarship.requirements.map((r, idx) => (
                        <li key={r} className="flex items-start gap-3 text-sm text-slate-700">
                          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
                            {idx + 1}
                          </span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>

                <Card className="border-teal-200 bg-teal-50/40">
                  <CardContent className="p-6">
                    <div className="text-sm font-semibold text-slate-900">
                      How to Apply
                    </div>
                    <p className="mt-2 text-sm text-slate-700">
                      {scholarship.howToApply.text}
                    </p>
                    <div className="mt-4">
                      <Button asChild>
                        <a
                          href={scholarship.howToApply.url}
                          target="_blank"
                          rel="noreferrer"
                          className="gap-2"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                          {scholarship.howToApply.ctaLabel}
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right column */}
            <div className="lg:col-span-4">
              <div className="grid gap-6 lg:sticky lg:top-20">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-sm font-semibold text-slate-900">
                      Quick Info
                    </div>

                    <div className="mt-4 space-y-3 text-sm">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-600">Level</span>
                        <Badge variant="secondary">{scholarship.level}</Badge>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-600">Location</span>
                        <span className="font-medium text-slate-900">
                          {scholarship.location}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-600">University</span>
                        <span className="text-right font-medium text-slate-900">
                          {scholarship.university}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-600">Field</span>
                        <span className="text-right font-medium text-slate-900">
                          {scholarship.field}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-600">Deadline</span>
                        <Badge className="bg-rose-600 hover:bg-rose-600">
                          {scholarship.deadline}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="text-sm font-semibold text-slate-900">
                      Contact
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-slate-700">
                      <div className="font-semibold text-slate-900">
                        {scholarship.contact.name}
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-slate-500" />
                        <a
                          href={`mailto:${scholarship.contact.email}`}
                          className="hover:underline"
                        >
                          {scholarship.contact.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-slate-500" />
                        <a
                          href={`tel:${scholarship.contact.phone}`}
                          className="hover:underline"
                        >
                          {scholarship.contact.phone}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border-amber-200 bg-linear-to-b from-amber-200 to-orange-400">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/35 text-slate-900">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div className="mt-3 text-sm font-semibold text-slate-900">
                      Ready to Apply?
                    </div>
                    <p className="mt-1 text-xs text-slate-900/80">
                      Don’t miss this opportunity to fund your education
                    </p>
                    <div className="mt-4">
                      <Button asChild variant="secondary" className="w-full bg-white text-slate-900 hover:bg-white/90">
                        <a
                          href={scholarship.howToApply.url}
                          target="_blank"
                          rel="noreferrer"
                          className="gap-2"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                          Apply Now
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

