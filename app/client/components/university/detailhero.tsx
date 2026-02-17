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
    <div className="relative w-full bg-linear-to-br from-slate-900 via-teal-700 to-emerald-500">
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
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={university.cover_image}
          alt={university.name}
          fill
          sizes="100vw"
          loading="eager"
          className="object-cover brightness-50"
          priority
        />
        {/* <div className="absolute inset-0 bg-linear-to-t from-slate-900 to-transparent"></div> */}
      </div>

      {/* Content Container */}
      <div className="relative px-4 md:px-5 lg:px-5 py-3 backdrop:blur-sm">
        <div className=" mx-auto">
          {/* Logo and Name Section */}
          <div className="flex flex-col md:flex-row items-start md:items-end gap-4 mb-4">
            {/* Logo */}
            <div
              className="relative w-16 h-16 md:w-24 md:h-24 bg-white rounded-lg shadow-lg overflow-hidden border-4 border-white"
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <Image
                src={university.logo}
                alt={university.name}
                fill
                sizes="(max-width: 768px) 4rem, 6rem"
                className="object-cover"
              />
            </div>

            {/* Title and Location */}
            <div data-aos="fade-up" data-aos-delay="100">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-0.5">
                {university.name}
              </h1>
              <p className="text-sm text-teal-200 flex items-center gap-1">
                <span>📍</span>
                {university.location}
              </p>
            </div>
          </div>

          {/* Description */}
          <div
            className="mb-4 max-w-3xl"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <p className="text-sm text-gray-100 leading-relaxed">
              {university.description}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {/* Programs Count */}
            <div
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 hover:bg-white/15 transition-all"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div className="flex items-center gap-2 justify-center">
                <div className="text-2xl">📚</div>
                <div className="text-center">
                  <p className="text-gray-300 text-xs">Programs Available</p>
                  <p className="text-2xl font-bold text-white">
                    {university.programs_count}
                  </p>
                </div>
              </div>
            </div>

            {/* Tuition Rank */}
            <div
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 hover:bg-white/15 transition-all"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <div className="flex items-center gap-2 justify-center">
                <div className="text-2xl">⭐</div>
                <div className="text-center">
                  <p className="text-gray-300 text-xs">Ranking</p>
                  <p className="text-2xl font-bold text-white">
                    #{university.tuition_rank}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action */}
            <div
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 hover:bg-white/15 transition-all"
              data-aos="zoom-in"
              data-aos-delay="500"
            >
              <div className="text-center">
                <p className="text-gray-300 text-xs">Get Started</p>
                <a href="#programs" className="text-lg font-bold text-white">
                  Explore Programs ↓
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div
            className="mt-6 h-1 bg-linear-to-r from-transparent via-teal-400 to-transparent"
            data-aos="fade-in"
            data-aos-delay="600"
          ></div>
        </div>
      </div>
    </div>
  );
}
