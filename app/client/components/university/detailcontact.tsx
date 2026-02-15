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
  contacts?: UniversityContactResponse[];
}

export default function DetailContact({
  universityId,
  officialWebsite,
  location,
  contacts: propContacts,
}: DetailContactProps) {
  // Only fetch contacts if not provided via props
  const shouldFetch = !propContacts || propContacts.length === 0;
  const { data: fetchedContacts = [], isLoading } =
    useUniversityContactsByUniversityId(shouldFetch ? universityId : undefined);

  const contacts =
    propContacts && propContacts.length > 0 ? propContacts : fetchedContacts;
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
        {contact?.label && (
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              {contact.label}
            </h4>
          </div>
        )}
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
