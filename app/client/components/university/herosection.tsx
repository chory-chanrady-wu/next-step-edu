"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HeroSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <section className="relative bg-linear-to-r from-blue-600 to-teal-500 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1
          className="text-5xl md:text-6xl font-bold mb-4"
          data-aos="fade-down"
        >
          Explore Universities Worldwide
        </h1>
        <p
          className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Discover the perfect university for your future. Search through
          thousands of institutions and find the right fit for your academic
          goals.
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          <a href="#universities">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Start Exploring
            </button>
          </a>
          <a href="">
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Learn More
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
