"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchUniversityContact } from "../../../lib/api";

interface UniversityContact {
  id: string;
  university_id: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
}

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
  const [contact, setContact] = useState<UniversityContact | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  useEffect(() => {
    const loadContact = async () => {
      try {
        const data = await fetchUniversityContact(universityId);
        setContact(data);
      } catch (error) {
        console.error("Failed to load contact:", error);
      } finally {
        setLoading(false);
      }
    };
    loadContact();
  }, [universityId]);

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
    <section id="contact" className="py-16 bg-white">
      <div className="px-4 max-w-7xl mx-auto">
        {/* Section Title */}
        <div data-aos="fade-up" className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contact Information
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-blue-600 to-blue-400 mx-auto"></div>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 py-8">
            Loading contact information...
          </div>
        ) : (
          <>
            {/* Contact Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={`${index * 100}`}
                  className="bg-linear-to-br from-blue-50 to-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border border-blue-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{info.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {info.title}
                      </h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 hover:underline break-all"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-gray-700">{info.content}</p>
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
              className="bg-linear-to-r from-blue-600 to-blue-500 rounded-xl p-8 text-center text-white shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
              <p className="text-blue-50 mb-6 max-w-2xl mx-auto">
                Take the first step towards your future. Visit our official
                website to learn more about admission requirements and
                application deadlines.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {(contact?.website || officialWebsite) && (
                  <a
                    href={contact?.website || officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Visit Official Website
                  </a>
                )}
                <button className="bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-800 transition-colors">
                  Request Information
                </button>
              </div>
            </div>

            {/* Map Placeholder */}
            <div
              data-aos="fade-up"
              data-aos-delay="500"
              className="mt-12 bg-gray-100 rounded-xl overflow-hidden shadow-md h-64 flex items-center justify-center"
            >
              <div className="text-center text-gray-500">
                <div className="text-5xl mb-4">🗺️</div>
                <p className="text-lg font-semibold">Campus Location Map</p>
                <p className="text-sm">Interactive map coming soon</p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
