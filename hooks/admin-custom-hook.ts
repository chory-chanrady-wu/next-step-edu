import { fetchProgram, fetchScholarships } from "@/app/lib/api";
import { ProgramSchemaType } from "@/app/lib/schema/program";
import { ScholarshipType } from "@/app/lib/types";
import { useQuery } from "@tanstack/react-query";

export function useScholarships(){
    const {
        data = [] as ScholarshipType[],
        isLoading,
        error
    } = useQuery<ScholarshipType[]>({
        queryKey: ['scholarships'],
        queryFn: fetchScholarships
    })
    return {data, isLoading, error}
}

export function usePrograms(){
    const {data = [] as ProgramSchemaType[],
        isLoading,
        error
    } = useQuery<ProgramSchemaType[]>({
        queryKey: ["programs"],
        queryFn: fetchProgram
    });
    return {data, isLoading, error}
}
