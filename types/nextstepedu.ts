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
  universityId: number;
}

export interface FacultyResponse {
  id: number;
  name: string;
  universityId: number;
  createdAt?: string;
  updatedAt?: string;
}

/* =======================
   PROGRAM
======================= */
export interface ProgramRequest {
  name: string;
  description?: string;
  degreeLevel: number; // your backend uses "level" in Scholarship; Program controller uses /degree-level/{level}
  tuitionFee?: number;
  facultyId?: number;
  universityId?: number;
}

export interface ProgramResponse {
  id: number;
  name: string;
  description?: string;
  degreeLevel: number;
  degree_level?: number; // snake_case from backend
  tuitionFee?: number;
  tuition_fee_amount?: number; // snake_case from backend
  currency?: string;
  studyPeriodMonths?: number;
  study_period_months?: number; // snake_case from backend
  examRequired?: boolean;
  exam_required?: boolean; // snake_case from backend
  facultyId?: number;
  faculty_id?: number; // snake_case from backend
  universityId?: number;
  university_id?: number; // snake_case from backend
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
  applyLink?: string;
  status?: ScholarshipStatus;
  deadline?: string; // ISO date string (e.g. "2026-02-11") or datetime depending on backend
  programId?: number;
  universityId?: number;
}

export interface ScholarshipResponse extends ScholarshipRequest {
  id: number;
  slug?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
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
  data: ScholarshipRequest;
  files?: {
    logo?: File | null;
    coverImage?: File | null;
  };
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
