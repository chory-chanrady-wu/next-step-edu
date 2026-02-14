"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Award,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";

import type { Scholarship } from "@/app/client/scholarship/data";
import Footer from "@/app/components/common/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ScholarshipDetailProps = {
  scholarship: Scholarship;
};

export default function ScholarshipDetail({ scholarship }: ScholarshipDetailProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="flex-1">
        {/* Hero */}
        <section className="relative">
          <div className="relative h-64 overflow-hidden sm:h-72">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={scholarship.heroImageUrl}
              alt={scholarship.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-50 via-slate-30/40 to-transparent" />
          </div>

          {/* Header */}
          <div className="relative mx-auto -mt-14 w-full max-w-7xl px-4 pb-8 sm:-mt-16">
            <Link
              href="/client/scholarship"
              className="mb-4 inline-flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur transition hover:bg-white"
            >
              <ArrowLeft className="h-4 w-4 " />
              Back to Scholarships
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between"
            >
              <div className="flex items-start gap-5">
                <div className="h-20 w-20 overflow-hidden rounded-2xl border-4 border-slate-50 bg-white shadow-md sm:h-24 sm:w-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={scholarship.imageUrl}
                    alt={scholarship.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="accent" className="bg-emerald-50 text-emerald-950">
                      <Sparkles className="mr-1 h-3.5 w-3.5" />
                      {scholarship.level}
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      Deadline: {scholarship.deadline}
                    </Badge>
                  </div>

                  <h1 className="mt-3 line-clamp-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                    {scholarship.title}
                  </h1>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {scholarship.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <GraduationCap className="h-4 w-4" />
                      {scholarship.university}
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full shrink-0 md:w-auto">
                <a href={scholarship.howToApply.url} target="_blank" rel="noreferrer">
                  <Button className="h-11 w-full gap-2 rounded-xl bg-linear-to-br from-slate-900 via-teal-700 to-emerald-500 text-white hover:opacity-95 md:w-auto">
                    <ExternalLink className="h-4 w-4" />
                    Apply Now
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-12">
          <div className="mx-auto w-full max-w-7xl px-4">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main */}
              <div className="space-y-6 lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-slate-900">
                    <FileText className="h-5 w-5 text-teal-700" />
                    About This Scholarship
                  </h2>
                  <p className="leading-relaxed text-slate-600">
                    {scholarship.summary}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.06 }}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-slate-900">
                    <Award className="h-5 w-5 text-emerald-600" />
                    Benefits
                  </h2>
                  <ul className="space-y-3">
                    {scholarship.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
                        <span className="text-slate-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.12 }}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <h2 className="mb-4 text-xl font-semibold text-slate-900">
                    Requirements
                  </h2>
                  <ul className="space-y-3">
                    {scholarship.requirements.map((req, idx) => (
                      <li key={`${idx}-${req}`} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-600/10">
                          <span className="text-xs font-semibold text-teal-700">
                            {idx + 1}
                          </span>
                        </div>
                        <span className="text-slate-600">{req}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.18 }}
                  className="rounded-2xl border border-teal-200 bg-teal-50/40 p-6"
                >
                  <h2 className="mb-4 text-xl font-semibold text-slate-900">
                    How to Apply
                  </h2>
                  <p className="mb-4 leading-relaxed text-slate-600">
                    {scholarship.howToApply.text}
                  </p>
                  <a href={scholarship.howToApply.url} target="_blank" rel="noreferrer">
                    <Button variant="outline" className="gap-2 rounded-xl">
                      <ExternalLink className="h-4 w-4" />
                      {scholarship.howToApply.ctaLabel}
                    </Button>
                  </a>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6 lg:sticky lg:top-20 lg:self-start">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <h3 className="mb-4 text-lg font-semibold text-slate-900">
                    Quick Info
                  </h3>
                  <ul className="space-y-4 text-sm">
                    <li className="flex items-center justify-between gap-4">
                      <span className="text-slate-500">Level</span>
                      <Badge variant="default">{scholarship.level}</Badge>
                    </li>
                    <li className="flex items-center justify-between gap-4">
                      <span className="text-slate-500">Location</span>
                      <span className="text-right font-medium text-slate-900">
                        {scholarship.location}
                      </span>
                    </li>
                    <li className="flex items-center justify-between gap-4">
                      <span className="text-slate-500">University</span>
                      <span className="text-right font-medium text-slate-900">
                        {scholarship.university}
                      </span>
                    </li>
                    <li className="flex items-center justify-between gap-4">
                      <span className="text-slate-500">Field</span>
                      <span className="text-right font-medium text-slate-900">
                        {scholarship.field}
                      </span>
                    </li>
                    <li className="flex items-center justify-between gap-4">
                      <span className="text-slate-500">Deadline</span>
                      <Badge variant="destructive">{scholarship.deadline}</Badge>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.16 }}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <h3 className="mb-4 text-lg font-semibold text-slate-900">
                    Contact
                  </h3>
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-slate-900">
                      {scholarship.contact.name}
                    </p>
                    <a
                      href={`mailto:${scholarship.contact.email}`}
                      className="flex items-center gap-2 text-sm text-slate-600 hover:text-teal-700"
                    >
                      <Mail className="h-4 w-4" />
                      {scholarship.contact.email}
                    </a>
                    <a
                      href={`tel:${scholarship.contact.phone}`}
                      className="flex items-center gap-2 text-sm text-slate-600 hover:text-teal-700"
                    >
                      <Phone className="h-4 w-4" />
                      {scholarship.contact.phone}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.22 }}
                  className="overflow-hidden rounded-2xl bg-linear-to-br from-slate-900 via-teal-700 to-emerald-500 p-6 text-center text-white"
                >
                  <Sparkles className="mx-auto mb-3 h-8 w-8 text-white/90" />
                  <h3 className="mb-2 text-lg font-semibold">Ready to Apply?</h3>
                  <p className="mb-4 text-sm text-white/80">
                    Don&apos;t miss this opportunity to fund your education
                  </p>
                  <a href={scholarship.howToApply.url} target="_blank" rel="noreferrer">
                    <Button variant="secondary" className="h-11 w-full rounded-xl bg-white text-slate-900 hover:bg-white/90">
                      <span className="inline-flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Apply Now
                      </span>
                    </Button>
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
