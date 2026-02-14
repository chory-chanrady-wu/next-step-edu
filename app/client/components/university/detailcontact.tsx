"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useUniversityContactsByUniversityId } from "@/hooks/use-queries-hook";
import type { UniversityContactResponse } from "@/types/nextstepedu";

interface DetailContactProps {
  universityId: string;
  officialWebsite?: string;
  location: string;
}

export default function DetailContact({
  universityId,
  officialWebsite,
  location,
}: DetailContactProps) {
  const { data: contacts = [], isLoading } = useUniversityContactsByUniversityId(universityId);
  const contact = (contacts as UniversityContactResponse[])[0];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  const contactInfo = [
    {
      icon: "📍",
      title: "Location",
      content: contact?.address || location,
    },
    {
      icon: "🌐",
      title: "Official Website",
      content: contact?.website || officialWebsite || "N/A",
      link: contact?.website || officialWebsite,
    },
    {
      icon: "📧",
      title: "Email",
      content: contact?.email || "N/A",
    },
    {
      icon: "📞",
      title: "Phone",
      content: contact?.phone || "N/A",
    },
  ];

  return (
    <section id="contact" className="py-6 bg-white">
      <div className="px-4 max-w-7xl mx-auto">
        {/* Section Title */}
        <div data-aos="fade-up" className="mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Contact Information
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-teal-600 to-teal-400 mx-auto"></div>
        </div>

        {isLoading ? (
          <div className="text-center text-gray-500 py-8">
            Loading contact information...
          </div>
        ) : (
          <>
            {/* Contact Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={`${index * 100}`}
                  className="bg-linear-to-br from-teal-50 to-white rounded-xl p-4 shadow-md hover:shadow-xl transition-shadow border border-teal-100"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{info.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-600 hover:text-teal-700 hover:underline break-all text-xs"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-gray-700 text-xs">{info.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="bg-linear-to-r from-teal-600 to-teal-500 rounded-xl p-4 text-center text-white shadow-lg"
            >
              <h3 className="text-lg font-bold mb-2">Ready to Apply?</h3>
              <p className="text-teal-50 mb-4 max-w-2xl mx-auto text-sm">
                Take the first step towards your future. Visit our official
                website to learn more about admission requirements and
                application deadlines.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                {(contact?.website || officialWebsite) && (
                  <a
                    href={contact?.website || officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-teal-600 font-semibold py-2 px-4 rounded-lg hover:bg-teal-50 transition-colors text-sm"
                  >
                    Visit Official Website
                  </a>
                )}
                <button className="bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-800 transition-colors text-sm">
                  Request Information
                </button>
              </div>
            </div>

            {/* Map Placeholder */}
            <div
              data-aos="fade-up"
              data-aos-delay="500"
              className="mt-6 bg-gray-100 rounded-xl overflow-hidden shadow-md h-40 flex items-center justify-center"
            >
              <div className="text-center text-gray-500">
                <div className="text-3xl mb-2">🗺️</div>
                <p className="text-sm font-semibold">Campus Location Map</p>
                <p className="text-xs">Interactive map coming soon</p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
