"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

interface DetailHeroProps {
  university: {
    id: string;
    name: string;
    location: string;
    description: string;
    logo: string;
    cover_image: string;
    tuition_rank: number;
    programs_count: number;
  };
}

export default function DetailHero({ university }: DetailHeroProps) {
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  return (
    <div className="relative w-full bg-linear-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* button back */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => router.back()}
          className="bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-lg backdrop-blur-md transition"
        >
          ← Go Back
        </button>
      </div>
      {/* Background Cover Image */}
      <div className="relative w-full h-96 overflow-hidden">
        <Image
          src={university.cover_image}
          alt={university.name}
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900 to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative px-4 md:px-8 lg:px-16 py-5 backdrop:blur-sm">
        <div className="max-w-6xl mx-auto">
          {/* Logo and Name Section */}
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8">
            {/* Logo */}
            <div
              className="relative w-24 h-24 md:w-32 md:h-32 bg-white rounded-lg shadow-lg overflow-hidden border-4 border-white"
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <Image
                src={university.logo}
                alt={university.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Title and Location */}
            <div data-aos="fade-up" data-aos-delay="100">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {university.name}
              </h1>
              <p className="text-xl text-blue-200 flex items-center gap-2">
                <span>📍</span>
                {university.location}
              </p>
            </div>
          </div>

          {/* Description */}
          <div
            className="mb-8 max-w-3xl"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <p className="text-lg text-gray-100 leading-relaxed">
              {university.description}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Programs Count */}
            <div
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 hover:bg-white/15 transition-all"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">📚</div>
                <div>
                  <p className="text-gray-300 text-sm">Programs Available</p>
                  <p className="text-3xl font-bold text-white">
                    {university.programs_count}
                  </p>
                </div>
              </div>
            </div>

            {/* Tuition Rank */}
            <div
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 hover:bg-white/15 transition-all"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">⭐</div>
                <div>
                  <p className="text-gray-300 text-sm">Ranking</p>
                  <p className="text-3xl font-bold text-white">
                    #{university.tuition_rank}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action */}
            <div
              className="bg-linear-to-r from-blue-600 to-blue-700 rounded-lg p-6 hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center"
              data-aos="zoom-in"
              data-aos-delay="500"
            >
              <div className="text-center">
                <p className="text-gray-100 text-sm mb-2">Get Started</p>
                <a
                  href="#programs"
                  className="text-white font-bold text-lg hover:text-blue-100 transition"
                >
                  Explore Programs ↓
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div
            className="mt-8 h-1 bg-linear-to-r from-transparent via-blue-400 to-transparent"
            data-aos="fade-in"
            data-aos-delay="600"
          ></div>
        </div>
      </div>
    </div>
  );
}
