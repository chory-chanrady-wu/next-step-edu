"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "@/lib/api";
import type {
  RegisterUserRequest,
  FacultyRequest,
  FacultyResponse,
  ProgramRequest,
  ProgramResponse,
  ScholarshipMultipartPayload,
  ScholarshipResponse,
  PageResponse,
  ScholarshipContactRequest,
  ScholarshipContactResponse,
  UniversityMultipartPayload,
  UniversityResponse,
  UniversityContactRequest,
  UniversityContactResponse,
  UpdateProfilePayload,
  UserProfileResponse,
  LoginRequest,
  AuthResponse,
} from "@/types/nextstepedu";

/* =======================
   AUTH
======================= */
export function useLogin() {
  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: (payload) => api.authenticate(payload),
  });
}

export function useRegisterUser() {
  const queryClient = useQueryClient();
  return useMutation<string, unknown, RegisterUserRequest>({
    mutationFn: (payload) => api.registerUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
    },
  });
}

/* =======================
   FACULTIES
======================= */
export function useAllFaculties(universityId?: number | string) {
  return useQuery<FacultyResponse[]>({
    queryKey: ["faculties", universityId ?? "all"],
    queryFn: () => api.getAllFaculties(universityId),
  });
}

export function useFaculty(id?: number | string) {
  return useQuery<FacultyResponse>({
    queryKey: ["faculty", id],
    queryFn: () => api.getFacultyById(id as any),
    enabled: !!id,
  });
}

export function useCreateFaculty() {
  const qc = useQueryClient();
  return useMutation<FacultyResponse, unknown, FacultyRequest>({
    mutationFn: (body) => api.createFaculty(body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["faculties"] }),
  });
}

export function useUpdateFaculty() {
  const qc = useQueryClient();
  return useMutation<
    FacultyResponse,
    unknown,
    { id: number | string; body: FacultyRequest }
  >({
    mutationFn: ({ id, body }) => api.updateFaculty(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["faculties"] });
      qc.invalidateQueries({ queryKey: ["faculty"] });
    },
  });
}

export function useDeleteFaculty() {
  const qc = useQueryClient();
  return useMutation<void, unknown, number | string>({
    mutationFn: (id) => api.deleteFaculty(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["faculties"] }),
  });
}

/* =======================
   PROGRAMS
======================= */
export function useAllPrograms() {
  return useQuery<ProgramResponse[]>({
    queryKey: ["programs"],
    queryFn: api.getAllPrograms,
  });
}

export function useProgram(id?: number | string) {
  return useQuery<ProgramResponse>({
    queryKey: ["program", id],
    queryFn: () => api.getProgramById(id as any),
    enabled: !!id,
  });
}

export function useCreateProgram() {
  const qc = useQueryClient();
  return useMutation<ProgramResponse, unknown, ProgramRequest>({
    mutationFn: (body) => api.createProgram(body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["programs"] }),
  });
}

export function useUpdateProgram() {
  const qc = useQueryClient();
  return useMutation<
    ProgramResponse,
    unknown,
    { id: number | string; body: ProgramRequest }
  >({
    mutationFn: ({ id, body }) => api.updateProgram(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["programs"] });
      qc.invalidateQueries({ queryKey: ["program"] });
    },
  });
}

export function useDeleteProgram() {
  const qc = useQueryClient();
  return useMutation<void, unknown, number | string>({
    mutationFn: (id) => api.deleteProgram(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["programs"] }),
  });
}

export function useProgramsByUniversity(universityId?: number | string) {
  return useQuery<ProgramResponse[]>({
    queryKey: ["programs", "university", universityId],
    queryFn: () => api.getProgramsByUniversity(universityId as number | string),
    enabled: !!universityId,
  });
}

/* =======================
   SCHOLARSHIPS
======================= */
export function useAllScholarships(params?: {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: "asc" | "desc";
}) {
  return useQuery<PageResponse<ScholarshipResponse>>({
    queryKey: ["scholarships", params ?? {}],
    queryFn: () => api.getAllScholarships(params),
  });
}

export function useScholarship(id?: number | string) {
  return useQuery<ScholarshipResponse>({
    queryKey: ["scholarship", id],
    queryFn: () => api.getScholarshipById(id as any),
    enabled: !!id,
  });
}

export function useCreateScholarship() {
  const qc = useQueryClient();
  return useMutation<any, unknown, ScholarshipMultipartPayload>({
    mutationFn: (payload) => api.createScholarship(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["scholarships"] }),
  });
}

export function useUpdateScholarship() {
  const qc = useQueryClient();

  return useMutation<
    ScholarshipResponse,
    unknown,
    { id: number | string; payload: ScholarshipMultipartPayload }
  >({
    mutationFn: ({ id, payload }) => api.updateScholarship(id, payload),
    onSuccess: (data, variables) => {
      // 1. Alert: Refresh the list
      qc.invalidateQueries({ queryKey: ["scholarships"] });

      // 2. Alert: Refresh ONLY this specific ID
      qc.invalidateQueries({ queryKey: ["scholarship", variables.id] });

      console.log(`Refetch triggered for scholarship ID: ${variables.id}`);
    },
  });
}

export function useDeleteScholarship() {
  const qc = useQueryClient();
  return useMutation<void, unknown, number | string>({
    mutationFn: (id) => api.deleteScholarship(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["scholarships"] }),
  });
}

/* =======================
   SCHOLARSHIP CONTACTS
======================= */
export function useAllScholarshipContacts() {
  return useQuery<ScholarshipContactResponse[]>({
    queryKey: ["scholarship-contacts"],
    queryFn: api.getAllScholarshipContacts,
  });
}

export function useScholarshipContactsByScholarshipId(
  scholarshipId?: number | string,
) {
  return useQuery<ScholarshipContactResponse[]>({
    queryKey: ["scholarship-contacts", "scholarship", scholarshipId],
    queryFn: () =>
      api.getScholarshipContactsByScholarshipId(scholarshipId as any),
    enabled: !!scholarshipId,
  });
}

export function useCreateScholarshipContact() {
  const qc = useQueryClient();
  return useMutation<
    ScholarshipContactResponse,
    unknown,
    ScholarshipContactRequest
  >({
    mutationFn: (body) => api.createScholarshipContact(body),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["scholarship-contacts"] }),
  });
}

/* =======================
   UNIVERSITIES
======================= */
export function useAllUniversities() {
  return useQuery<UniversityResponse[]>({
    queryKey: ["universities"],
    queryFn: api.getAllUniversities,
  });
}

export function useUniversityById(id?: number | string) {
  return useQuery<UniversityResponse>({
    queryKey: ["university", id],
    queryFn: () => api.getUniversityById(id as any),
    enabled: !!id,
  });
}

export function useCreateUniversity() {
  const qc = useQueryClient();
  return useMutation<UniversityResponse, unknown, UniversityMultipartPayload>({
    mutationFn: (payload) => api.createUniversity(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["universities"] }),
  });
}

export function useUpdateUniversity() {
  const qc = useQueryClient();
  return useMutation<
    UniversityResponse,
    unknown,
    { id: number | string; payload: UniversityMultipartPayload }
  >({
    mutationFn: ({ id, payload }) => api.updateUniversity(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["universities"] });
      qc.invalidateQueries({ queryKey: ["university"] });
    },
  });
}

export function useDeleteUniversity() {
  const qc = useQueryClient();
  return useMutation<void, unknown, number | string>({
    mutationFn: (id) => api.deleteUniversity(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["universities"] }),
  });
}

/* =======================
   UNIVERSITY CONTACTS
======================= */
export function useAllUniversityContacts() {
  return useQuery<UniversityContactResponse[]>({
    queryKey: ["university-contacts"],
    queryFn: api.getAllUniversityContacts,
  });
}

export function useUniversityContactsByUniversityId(
  universityId?: number | string,
) {
  return useQuery<UniversityContactResponse[]>({
    queryKey: ["university-contacts", "university", universityId],
    queryFn: () =>
      api.getUniversityContactsByUniversityId(universityId as number | string),
    enabled: !!universityId,
  });
}

export function useCreateUniversityContact() {
  const qc = useQueryClient();
  return useMutation<
    UniversityContactResponse,
    unknown,
    UniversityContactRequest
  >({
    mutationFn: (body) => api.createUniversityContact(body),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["university-contacts"] }),
  });
}

/* =======================
   PROFILES
======================= */
export function useAllProfiles() {
  return useQuery<UserProfileResponse[]>({
    queryKey: ["profiles"],
    queryFn: api.getAllProfiles,
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation<string, unknown, UpdateProfilePayload>({
    mutationFn: (payload) =>
      api.updateProfile(payload.userId, {
        firstname: payload.firstname,
        lastname: payload.lastname,
        phone: payload.phone,
        image: payload.image,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profiles"] }),
  });
}

export function useDeleteProfile() {
  const qc = useQueryClient();
  return useMutation<string, unknown, number | string>({
    mutationFn: (userId) => api.deleteProfile(userId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profiles"] }),
  });
}
