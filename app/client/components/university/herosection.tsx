"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { useAllUniversities } from "@/hooks/use-queries-hook";

export default function HeroSection() {
  const { data: allUniversities = [], isLoading: loading } =
    useAllUniversities();
  const universities = allUniversities.slice(0, 10); // Show first 10 universities
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  useEffect(() => {
    if (universities.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % universities.length;
        return next;
      });
    }, 4000); // Auto-advance every 4 seconds

    return () => clearInterval(interval);
  }, [universities.length, isPaused, currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % universities.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + universities.length) % universities.length,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (loading || universities.length === 0) {
    return <p className="text-xl text-blue-100"></p>;
  }

  return (
    <section
      className="relative h-100 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {universities.map((university, index) => (
        <div
          key={university.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide
              ? "opacity-100 translate-x-0"
              : index < currentSlide
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
          }`}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            {university.coverImage ? (
              <Image
                src={university.coverImage}
                alt={university.name}
                fill
                sizes="100vw"
                priority={index === currentSlide}
                loading={index === currentSlide ? "eager" : "lazy"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-linear-to-r from-teal-600 to-teal-500" />
            )}
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
            <div className="text-white max-w-3xl" data-aos="fade-right">
              {/* Logo */}
              {university.logo && (
                <div className="mb-2">
                  <Image
                    src={university.logo}
                    alt={`${university.name} logo`}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-lg shadow-lg bg-white p-2"
                  />
                </div>
              )}

              <h1 className="text-2xl md:text-3xl font-bold mb-1 drop-shadow-lg">
                {university.name}
              </h1>

              <p className="text-lg text-blue-100 mb-1 flex items-center">
                <span>📍</span> {university.city || "N/A"},{" "}
                {university.country || "N/A"}
              </p>

              <p className="text-md md:text-lg text-gray-200 mb-2">
                {university.description || "No description available"}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="bg-green-600 backdrop-blur-sm px-4 py-2 rounded-lg items-center">
                  <span className="font-semibold">
                    {university.status || "Active"}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/client/university/${university.id}`}
                  className="bg-teal-400 text-white px-4 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Explore University
                </Link>
                {university.officialWebsite && (
                  <a
                    href={university.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-white text-white px-4 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-all"
                  >
                    Official Website →
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all z-10"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all z-10"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {universities.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all rounded-full ${
              index === currentSlide
                ? "bg-white w-12 h-3"
                : "bg-white/50 hover:bg-white/75 w-3 h-3"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm z-10">
        {currentSlide + 1} / {universities.length}
      </div>
    </section>
  );
}
