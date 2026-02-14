"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Container from "../common/Container";
import Button from "../common/Button";
export default function CTASection() {
  return (
    <section className="py-10 md:py-14">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-700 via-teal-700 to-emerald-500 p-8 md:p-16"
        >
          {/* glow blobs */}
          <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-amber-400/20 blur-3xl" />

          <div className="relative mx-auto max-w-2xl text-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-1.5 text-sm font-bold text-slate-900"
            >
              <Sparkles className="h-4 w-4" />
              Start Your Journey Today
            </motion.div>

            <h2 className="text-3xl font-extrabold md:text-4xl lg:text-5xl">
              Ready to Take the Next Step in Your Education?
            </h2>

            <p className="mt-4 text-lg text-white/80">
              Join thousands of students who have found their perfect university
              and scholarship through NextStepEdu.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-8 sm:flex-row">
              <Link href="/client/university">
                <Button
                  variant="warning"
                  className="group w-full rounded-2xl sm:w-auto
                 h-16 px-10 text-lg font-semibold"
                >
                  Explore Universities
                  <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link href="/client/scholarship">
                <Button
                  variant="outline"
                  className="w-full rounded-2xl sm:w-auto
                 h-16 px-10 text-lg font-semibold
                 border-white/30 bg-white/10 text-white hover:bg-white/15"
                >
                  Find Scholarships
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
