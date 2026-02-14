"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Star } from "lucide-react";
import Container from "../common/Container";
import Button from "../common/Button";
import { universities } from "../data/mockData";

export default function FeaturedUniversities() {
  const featured = universities.slice(0, 3);

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
            <span className="text-sm font-bold text-emerald-600 uppercase tracking-wider">
              Top Institutions
            </span>
            <h2 className="mt-2 text-4xl md:text-5xl font-extrabold text-slate-900">
              Featured Universities
            </h2>
            <p className="mt-3 text-slate-600 max-w-lg">
              Explore Cambodia&apos;s leading universities offering world-class education and diverse programs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link href="/client/university">
              <Button variant="outline" className="group">
                View All Universities
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((u, index) => (
            <motion.div
              key={u.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="overflow-hidden rounded-3xl border bg-white shadow-sm"
            >
              <div className="relative h-44">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={u.coverImageUrl} alt={u.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
              </div>

              <div className="p-7">
                <div className="-mt-14 mb-4 inline-flex rounded-2xl bg-white p-2 shadow">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={u.logoUrl} alt="logo" className="h-12 w-12 rounded-xl object-cover" />
                </div>

                <h3 className="text-2xl font-extrabold text-slate-900">{u.name}</h3>

                <div className="mt-2 flex items-center gap-2 text-slate-600">
                  <MapPin className="h-5 w-5" />
                  <span>{u.city}, {u.country}</span>
                </div>

                <p className="mt-4 text-slate-600 line-clamp-3">{u.shortDescription}</p>

                <div className="mt-6 flex items-center justify-between border-t pt-5">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={i < Math.min(5, Math.max(1, u.tuitionRank)) ? "h-5 w-5 text-amber-400" : "h-5 w-5 text-slate-200"}
                        fill={i < Math.min(5, Math.max(1, u.tuitionRank)) ? "currentColor" : "none"}
                      />
                    ))}
                    <span className="ml-2 text-sm text-slate-600">Tuition</span>
                  </div>

                  <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                    {u.programs.length} Programs
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
