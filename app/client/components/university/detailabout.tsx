"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

interface DetailAboutProps {
  description: string;
}

export default function DetailAbout({ description }: DetailAboutProps) {
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  const highlights = [
    {
      icon: "🎓",
      title: "Academic Excellence",
      description: "World-class faculty and cutting-edge curriculum",
    },
    {
      icon: "🌍",
      title: "Global Community",
      description: "Students from over 100 countries worldwide",
    },
    {
      icon: "💼",
      title: "Career Support",
      description: "Dedicated career services and job placement",
    },
    {
      icon: "🏆",
      title: "Research & Innovation",
      description: "State-of-the-art research facilities",
    },
    {
      icon: "🤝",
      title: "Industry Partnerships",
      description: "Strong connections with leading companies",
    },
    {
      icon: "📚",
      title: "Diverse Programs",
      description: "Wide range of undergraduate and graduate programs",
    },
  ];

  return (
    <section id="overview" className="py-5 md:py-5 bg-gray-50 rounded-2xl">
      <div className="px-4 max-w-7xl mx-auto">
        {/* Section Title */}
        <div data-aos="fade-up" className="mb-10 text-center">
          <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-4">
            About This University
          </h2>
          <div className="w-full h-1 bg-linear-to-r from-blue-600 to-blue-400"></div>
        </div>
        {/* Description */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="bg-white rounded-lg shadow-md p-8 md:p-12 mb-5"
        >
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {description}
          </p>
        </div>

        {/* Highlights Grid */}
        <div data-aos="fade-up" data-aos-delay="200" className="mb-1">
          <h3 className="text-3xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Choose Us
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                data-aos="zoom-in"
                data-aos-delay={`${300 + index * 50}`}
                className="bg-white rounded-lg p-2 shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500"
              >
                <div className="text-4xl mb-4">{highlight.icon}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {highlight.title}
                </h4>
                <p className="text-gray-600">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
