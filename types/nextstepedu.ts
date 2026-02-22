// src/types/nextstepedu.ts

/* =======================
   AUTH
======================= */
export interface RegisterUserRequest {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phone: string;
  image?: File | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  id?: number;
  email?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  image?: string;
  role?: string;
}

/* =======================
   FACULTY
======================= */
export interface FacultyRequest {
  name: string;
  description?: string;
  universityId: number;
}

// types/nextstepedu.ts (or wherever you keep types)
export interface FacultyResponse {
  id: number;
  name: string;
  description?: string;
  data: Array<{
    id: number;
    name: string;
    slug: string;
    description?: string;
    degreeLevel: number;
    examRequired: boolean;
    tuitionFeeAmount: number;
    currency: string;
    studyPeriodMonths: number;
  }>;
  programCount?: number;
}

/* =======================
   PROGRAM
======================= */
/* =======================
   PROGRAM
======================= */
export interface ProgramRequest {
  name: string;
  description: string;
  degreeLevel: number;
  examRequired: boolean;
  tuitionFeeAmount: number; // Corrected from tuitionFee
  currency: string;
  studyPeriodMonths: number;
  universityId: number;
  facultyId: number;
}
export interface MiniEntity {
  id: number;
  name: string;
}

export interface ProgramResponse {
  id: number;
  name: string;
  description: string;
  degreeLevel: number;
  degreeLevelName: string; // e.g., "Bachelor's Degree"
  examRequired: boolean;
  tuitionFeeAmount: number; // Matches the 20000.0 value
  currency: string; // e.g., "USD"
  studyPeriodMonths: number;
  university: MiniEntity; // Nested object { id, name }
  faculty: MiniEntity; // Nested object { id, name }
  scholarshipCount: number;
  // Metadata (Optional: keep if your backend sometimes sends these)
  createdAt?: string;
  updatedAt?: string;
}

/* =======================
   SCHOLARSHIP
======================= */
export type ScholarshipStatus = "OPEN" | "CLOSED" | "DRAFT" | string;

export interface ScholarshipRequest {
  name: string;
  description?: string;
  level: number;
  benefits?: string;
  requirements?: string;
  howToApply?: string;
  maxApplicant: number;
  applyLink?: string;
  status?: ScholarshipStatus;
  deadline?: string; // ISO date string (e.g. "2026-02-11") or datetime depending on backend
  programId?: number;
  universityId?: number;
}

export interface ScholarshipResponse {
  id: number;
  name: string;
  slug?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  description?: string;
  level: number;
  maxApplicant?: number | null;
  benefits?: string | null;
  requirements?: string | null;
  howToApply?: string | null;
  applyLink?: string | null;
  status?: string;
  deadline?: string;
  createdAt?: string;
  updatedAt?: string;
  programId?: number;
  universityId?: number;
  program?: {
    id: number;
    name: string;
    description?: string;
    degreeLevel: number;
    examRequired: boolean;
    tuitionFeeAmount: number;
    currency: string;
    studyPeriodMonths: number;
  };
  university?: {
    id: number;
    name: string;
    slug?: string;
    logoUrl?: string;
    coverImageUrl?: string;
    description?: string | null;
    country: string;
    city: string;
    officialWebsite?: string | null;
    status: string;
  };
  contacts?: Array<{
    id: number;
    label?: string;
    email?: string;
    phone?: string;
    websiteUrl?: string;
  }>;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

/** For multipart create/update */
export interface ScholarshipMultipartPayload {
  logo?: File | null;
  coverImage?: File | null;
  data: any;
}

/* =======================
   SCHOLARSHIP CONTACT
======================= */
export interface ScholarshipContactRequest {
  scholarshipId: number;
  name?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
}

export interface ScholarshipContactResponse extends ScholarshipContactRequest {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}

/* =======================
   APPLICANTS
======================= */
export interface ApplicantRequest {
  userId: number;
  scholarshipId: number;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  address: string;
  nationality: string;
  highSchoolName: string;
  gpa: number;
  intendedMajor: string;
  scholarshipType: string;
  familyIncome: number;
  motivationLetter: string;
  status?: string;
  universityId?: number;
}

export interface ApplicantResponse extends ApplicantRequest {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateStatusRequest {
  status: string;
}

/* =======================
   UNIVERSITY
======================= */
export interface UniversityRequest {
  name: string;
  slug?: string;
  description?: string;
  country?: string;
  city?: string;
  officialWebsite?: string;
  label?: string;
  email?: string;
  phone?: string;
  status?: string;
}

export interface UniversityResponse {
  id: number;
  name: string;
  slug?: string;
  logo?: string;
  logoUrl?: string;
  coverImage?: string;
  coverImageUrl?: string;
  description?: string;
  country?: string;
  city?: string;
  officialWebsite?: string;
  label?: string;
  email?: string;
  phone?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  contacts?: UniversityContactResponse[];
}

/** For multipart create/update */
export interface UniversityMultipartPayload {
  data: UniversityRequest;
  files?: {
    logo?: File | null;
    coverImage?: File | null;
  };
}

/* =======================
   UNIVERSITY CONTACT
======================= */
export interface UniversityContactRequest {
  universityId: number;
  label?: string; // Backend uses label
  name?: string; // Some parts might use name
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
}

export interface UniversityContactResponse extends UniversityContactRequest {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}

/* =======================
   USER PROFILE
======================= */
export type UserRole = "ADMIN" | "USER";

export interface UserProfileResponse {
  id: number;
  userId: number;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;

  image?: string;

  role: UserRole; // ✅ required
  status?: string; // or make it boolean if backend is boolean
  createdAt: string; // ✅ required if backend sends it
  updatedAt?: string;
}

export interface UpdateProfileRequest {
  firstname: string;
  lastname: string;
  phone: string;
  image?: File | null;
}

export interface UpdateProfilePayload extends UpdateProfileRequest {
  userId: number | string;
}
