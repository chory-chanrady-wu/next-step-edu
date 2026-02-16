import {
  getAllScholarships,
  getScholarshipById as getScholarshipByIdApi,
  getScholarshipContactsByScholarshipId,
  getUniversityById,
} from "@/lib/api";
import type {
  ScholarshipContactResponse,
  ScholarshipResponse,
  UniversityResponse,
} from "@/types/nextstepedu";

export type ScholarshipLevel = "Bachelor" | "Master" | "PhD" | string;

export type ScholarshipContact = {
  name: string;
  email: string;
  phone: string;
};

export type Scholarship = {
  id: string;
  title: string;
  level: ScholarshipLevel;
  deadline: string;
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
  imageUrl: string;
  heroImageUrl: string;
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=240&h=240&fit=crop";
const DEFAULT_HERO =
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&h=500&fit=crop";

function levelToLabel(level: number | string | undefined): ScholarshipLevel {
  if (level === 1 || level === "1") return "Bachelor";
  if (level === 2 || level === "2") return "Master";
  if (level === 3 || level === "3") return "PhD";
  if (typeof level === "string" && level.trim().length > 0) return level;
  return "Bachelor";
}

function toDateOnly(value?: string): string {
  if (!value) return "TBA";
  return value.slice(0, 10);
}

function splitTextList(value?: string): string[] {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.map((v) => String(v).trim()).filter(Boolean);
    }
  } catch {
    // Fallback to delimiter parsing below.
  }

  return value
    .split(/\r?\n|,|;/)
    .map((v) => v.trim())
    .filter(Boolean);
}

function resolveUniversityName(
  scholarship: ScholarshipResponse,
  university?: UniversityResponse | null,
) {
  if (university?.name) return university.name;
  if (scholarship.universityId) return `University #${scholarship.universityId}`;
  return "Not specified";
}

function resolveLocation(university?: UniversityResponse | null) {
  if (!university) return "Not specified";
  const city = university.city?.trim();
  const country = university.country?.trim();
  if (city && country) return `${city}, ${country}`;
  return city || country || "Not specified";
}

function mapScholarshipFromApi(
  scholarship: ScholarshipResponse,
  contact?: ScholarshipContactResponse | null,
  university?: UniversityResponse | null,
): Scholarship {
  const benefits = splitTextList(scholarship.benefits);
  const requirements = splitTextList(scholarship.requirements);

  return {
    id: String(scholarship.id),
    title: scholarship.name,
    level: levelToLabel(scholarship.level),
    deadline: toDateOnly(scholarship.deadline),
    summary:
      scholarship.description?.trim() || "No description provided for this scholarship.",
    location: resolveLocation(university),
    university: resolveUniversityName(scholarship, university),
    field: scholarship.programId ? `Program #${scholarship.programId}` : "General",
    benefits:
      benefits.length > 0
        ? benefits
        : ["Tuition support and educational funding details are provided by the scholarship office."],
    requirements:
      requirements.length > 0
        ? requirements
        : ["Please contact the scholarship office for full eligibility requirements."],
    howToApply: {
      text:
        scholarship.howToApply?.trim() ||
        "Submit your application through the official scholarship process before the deadline.",
      ctaLabel: "Open Application Link",
      url: scholarship.applyLink?.trim() || "#",
    },
    contact: {
      name: contact?.name?.trim() || "Scholarship Office",
      email: contact?.email?.trim() || "info@example.com",
      phone: contact?.phone?.trim() || "N/A",
    },
    imageUrl: scholarship.logoUrl || DEFAULT_IMAGE,
    heroImageUrl: scholarship.coverImageUrl || DEFAULT_HERO,
  };
}

export async function getScholarships(): Promise<Scholarship[]> {
  const response = await getAllScholarships({ page: 0, size: 100 });
  const rawItems = Array.isArray(response)
    ? response
    : Array.isArray(response?.content)
      ? response.content
      : [];
  return rawItems.map((item) => mapScholarshipFromApi(item));
}

export async function getScholarshipById(id: string): Promise<Scholarship | null> {
  try {
    const scholarship = await getScholarshipByIdApi(id);

    let contact: ScholarshipContactResponse | null = null;
    let university: UniversityResponse | null = null;

    try {
      const contacts = await getScholarshipContactsByScholarshipId(id);
      contact = contacts[0] || null;
    } catch {
      contact = null;
    }

    if (scholarship.universityId) {
      try {
        university = await getUniversityById(scholarship.universityId);
      } catch {
        university = null;
      }
    }

    return mapScholarshipFromApi(scholarship, contact, university);
  } catch {
    return null;
  }
}
