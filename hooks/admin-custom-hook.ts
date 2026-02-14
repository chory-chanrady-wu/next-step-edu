import {
  fetchFaculties,
  fetchAllPrograms,
  fetchScholarshipById,
  fetchScholarships,
  fetchUniversities,
} from "@/app/lib/api";
import { FacultySchemaType } from "@/app/lib/schema/faculty";
import { ProgramSchemaType } from "@/app/lib/schema/program";
import { UniversitySchemaType } from "@/app/lib/schema/university";
import { ScholarshipType } from "@/app/lib/types";
import { useQuery } from "@tanstack/react-query";

export function useScholarships() {
  const {
    data = [] as ScholarshipType[],
    isLoading,
    error,
  } = useQuery<ScholarshipType[]>({
    queryKey: ["scholarships"],
    queryFn: fetchScholarships,
  });
  return { data, isLoading, error };
}

export function useScholarship(id: string) {
  const { data, isLoading, error } = useQuery<ScholarshipType>({
    queryKey: ["scholarship"],
    queryFn: () => fetchScholarshipById(id),
    enabled: !!id.trim(),
  });
  return { data, isLoading, error };
}

export function usePrograms() {
  const {
    data = [] as ProgramSchemaType[],
    isLoading,
    error,
  } = useQuery<ProgramSchemaType[]>({
    queryKey: ["programs"],
    queryFn: fetchAllPrograms,
  });
  return { data, isLoading, error };
}

export function useUniversities() {
  const {
    data = [] as UniversitySchemaType[],
    isLoading,
    error,
  } = useQuery<UniversitySchemaType[]>({
    queryKey: ["universities"],
    queryFn: fetchUniversities,
  });
  return { data, isLoading, error };
}
export function useFaculties() {
  const {
    data = [] as FacultySchemaType[],
    isLoading,
    error,
  } = useQuery<FacultySchemaType[]>({
    queryKey: ["factulties"],
    queryFn: fetchFaculties,
  });
  return { data, isLoading, error };
}
