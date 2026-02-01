"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search, GraduationCap, Award, Building2 } from "lucide-react";
import Container from "../common/Container";
import Button from "../common/Button";

const stats = [
  { icon: Building2, value: "50+", label: "Universities" },
  { icon: Award, value: "100+", label: "Scholarships" },
  { icon: GraduationCap, value: "500+", label: "Programs" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background like Lovable */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-teal-700 to-emerald-500" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-white blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center text-white">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
              <GraduationCap className="h-4 w-4" />
              Your Gateway to Higher Education
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl"
          >
            Find Your Perfect{" "}
            <span className="relative inline-block">
              University
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path
                  d="M2 10C50 2 150 2 198 10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-amber-400"
                />
              </svg>
            </span>{" "}
            & Scholarship
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 mx-auto max-w-2xl text-lg text-white/80 md:text-xl"
          >
            Discover universities and scholarships that match your goals. Get detailed information to make informed decisions about your future.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 mx-auto flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
              <input
                placeholder="Search universities or scholarships..."
                className="h-12 w-full rounded-2xl border-0 bg-white px-12 text-slate-900 shadow-lg outline-none"
              />
            </div>
            <Button variant="warning" className="h-12 rounded-2xl px-8 text-base font-bold">
              Search Now
            </Button>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 flex flex-wrap justify-center gap-3"
          >
            <Link href="/client/university">
              <button className="rounded-xl border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold hover:bg-white/15">
                Browse Universities
              </button>
            </Link>
            <Link href="/client/scholarship">
              <button className="rounded-xl border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold hover:bg-white/15">
                Find Scholarships
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm"
            >
              <stat.icon className="mx-auto h-6 w-6 text-amber-400" />
              <div className="mt-2 text-2xl font-extrabold text-white md:text-3xl">{stat.value}</div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
