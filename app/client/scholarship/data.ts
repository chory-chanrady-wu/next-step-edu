export type ScholarshipLevel = "Bachelor" | "Master" | "PhD";

export type ScholarshipContact = {
  name: string;
  email: string;
  phone: string;
};

export type Scholarship = {
  id: string;
  title: string;
  level: ScholarshipLevel;
  deadline: string; // YYYY-MM-DD
  summary: string;
  location: string;
  university: string;
  field: string;
  benefits: string[];
  requirements: string[];
  howToApply: {
    text: string;
    ctaLabel: string;
    url: string;
  };
  contact: ScholarshipContact;
  imageUrl: string; // small square
  heroImageUrl: string; // wide header background
};

export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: "asean-scholarship-program",
    title: "ASEAN Scholarship Program",
    level: "Bachelor",
    deadline: "2024-03-31",
    summary:
      "Full scholarship for outstanding ASEAN students to study at top universities in the region. Covers tuition, accommodation...",
    location: "Southeast Asia",
    university: "Multiple Universities",
    field: "Regional Development",
    benefits: ["Full tuition fee coverage", "Monthly living allowance", "Accommodation"],
    requirements: [
      "ASEAN citizenship",
      "Strong academic record",
      "Demonstrated leadership or community service",
      "English proficiency",
    ],
    howToApply: {
      text: "Apply online through the official scholarship portal during the annual application period.",
      ctaLabel: "Go to Application Portal",
      url: "https://example.com/apply/asean-scholarship-program",
    },
    contact: {
      name: "ASEAN Scholarship Office",
      email: "info@asean-scholarships.org",
      phone: "+855 23 123 456",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=240&h=240&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&h=500&fit=crop",
  },
  {
    id: "australia-awards-cambodia",
    title: "Australia Awards Cambodia",
    level: "Master",
    deadline: "2024-04-30",
    summary:
      "Prestigious scholarship for Cambodian professionals to study at Australian universities. Full funding for Master's degree programs.",
    location: "Australia",
    university: "Australian Universities",
    field: "Priority Development Areas",
    benefits: [
      "Full tuition fees",
      "Return air travel",
      "Contribution to living expenses",
      "Overseas health cover",
      "Introductory academic program",
    ],
    requirements: [
      "Cambodian citizenship",
      "2+ years work experience",
      "Bachelor's degree",
      "IELTS 6.5 overall",
      "Not currently studying in Australia",
    ],
    howToApply: {
      text: "Apply online through the Australia Awards website during the annual application period.",
      ctaLabel: "Go to Application Portal",
      url: "https://example.com/apply/australia-awards-cambodia",
    },
    contact: {
      name: "Australia Awards",
      email: "info@australiaawardscambodia.org",
      phone: "+855 23 213 470",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=240&h=240&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&h=500&fit=crop",
  },
  {
    id: "cambodia-excellence-award",
    title: "Cambodia Excellence Award",
    level: "Bachelor",
    deadline: "2024-05-15",
    summary:
      "Merit-based scholarship for Cambodian students demonstrating academic excellence and community leadership.",
    location: "Cambodia",
    university: "Royal University of Phnom Penh",
    field: "Academic Excellence",
    benefits: ["50% tuition fee waiver", "Mentorship program", "Career workshops"],
    requirements: [
      "Cambodian citizenship",
      "High school diploma or equivalent",
      "Strong academic performance",
      "Community involvement",
    ],
    howToApply: {
      text: "Submit your application through the university scholarship office with required documents.",
      ctaLabel: "View Application Steps",
      url: "https://example.com/apply/cambodia-excellence-award",
    },
    contact: {
      name: "RUPP Scholarship Office",
      email: "scholarships@rupp.edu.kh",
      phone: "+855 23 555 555",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=240&h=240&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1600&h=500&fit=crop",
  },
  {
    id: "japan-cambodia-friendship-grant",
    title: "Japan-Cambodia Friendship Grant",
    level: "Master",
    deadline: "2024-04-20",
    summary:
      "Scholarship for Cambodian students to pursue graduate studies in Japan. Fully funded program including Japanese language support.",
    location: "Japan",
    university: "Japanese Universities",
    field: "International Cooperation",
    benefits: ["Full tuition fees", "Monthly stipend", "Japanese language training"],
    requirements: [
      "Cambodian citizenship",
      "Bachelor's degree",
      "Strong academic record",
      "Willingness to study in Japan",
    ],
    howToApply: {
      text: "Apply via the partner university nomination process and submit required forms.",
      ctaLabel: "Go to Application Portal",
      url: "https://example.com/apply/japan-cambodia-friendship-grant",
    },
    contact: {
      name: "Japan Grant Program",
      email: "info@japan-grants.jp",
      phone: "+855 23 999 999",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1526481280695-3c687fd643ed?w=240&h=240&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=1600&h=500&fit=crop",
  },
  {
    id: "rural-student-support-fund",
    title: "Rural Student Support Fund",
    level: "Bachelor",
    deadline: "2024-07-31",
    summary:
      "Supporting students from rural areas of Cambodia to access quality higher education in the capital and provincial institutions.",
    location: "Cambodia",
    university: "Public Universities",
    field: "Access & Equity",
    benefits: ["Monthly living allowance", "Transportation support", "Learning materials"],
    requirements: [
      "Cambodian citizenship",
      "Rural residency proof",
      "Financial need",
      "Enrollment in public university program",
    ],
    howToApply: {
      text: "Apply through local education offices with supporting documentation for eligibility.",
      ctaLabel: "View Application Steps",
      url: "https://example.com/apply/rural-student-support-fund",
    },
    contact: {
      name: "Student Support Desk",
      email: "support@studentsfund.kh",
      phone: "+855 23 777 777",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=240&h=240&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1600&h=500&fit=crop",
  },
  {
    id: "women-in-stem-scholarship",
    title: "Women in STEM Scholarship",
    level: "Bachelor",
    deadline: "2024-06-30",
    summary:
      "Empowering women in Cambodia to pursue careers in Science, Technology, Engineering, and Mathematics through scholarships and mentorship.",
    location: "Cambodia",
    university: "Institute of Technology of Cambodia",
    field: "STEM",
    benefits: ["50% tuition fee waiver", "Mentorship program", "Internship placement"],
    requirements: [
      "Female applicant",
      "Cambodian citizenship",
      "High school diploma",
      "Interest in STEM fields",
    ],
    howToApply: {
      text: "Apply online and submit academic transcripts, recommendation letters, and a short motivation statement.",
      ctaLabel: "Go to Application Portal",
      url: "https://example.com/apply/women-in-stem-scholarship",
    },
    contact: {
      name: "STEM Scholarship Team",
      email: "stem@itc.edu.kh",
      phone: "+855 23 888 888",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=240&h=240&fit=crop",
    heroImageUrl:
      "https://images.unsplash.com/photo-1526481280695-3c687fd643ed?w=1600&h=500&fit=crop",
  },
];

export function getScholarshipById(id: string) {
  return SCHOLARSHIPS.find((s) => s.id === id);
}

