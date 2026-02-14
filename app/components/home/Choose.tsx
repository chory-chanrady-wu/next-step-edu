"use client";

import { motion } from "framer-motion";
import { Search, BookOpen, Users, Shield, Clock, Award } from "lucide-react";
import Container from "../common/Container";
const features = [
  { icon: Search, title: "Comprehensive Search", description: "Find universities and scholarships easily with powerful search and filter options." },
  { icon: BookOpen, title: "Detailed Information", description: "Get complete details about programs, tuition fees, requirements, and more." },
  { icon: Users, title: "Student-Focused", description: "Designed with students in mind to simplify your educational journey." },
  { icon: Shield, title: "Verified Data", description: "All information is verified and regularly updated for accuracy." },
  { icon: Clock, title: "Save Time", description: "Compare multiple options quickly and make informed decisions faster." },
  { icon: Award, title: "Free to Use", description: "Access all features completely free of charge, forever." },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-10 md:py-14">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <span className="text-sm font-bold uppercase tracking-wider text-emerald-600">
            Why NextStepEdu
          </span>
          <h2 className="mt-2 text-4xl font-extrabold text-slate-900 md:text-5xl">
            Your Trusted Education Guide
          </h2>
          <p className="mt-4 text-slate-600">
            We provide everything you need to make the right choice for your higher education journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group rounded-2xl border bg-white p-6 transition-all duration-300 hover:border-emerald-200 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 transition-colors group-hover:bg-emerald-500">
                <feature.icon className="h-6 w-6 text-emerald-600 group-hover:text-white" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
