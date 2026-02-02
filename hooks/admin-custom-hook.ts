import { fetchProgram, fetchScholarships } from "@/app/lib/api";
import { ProgramSchemaType } from "@/app/lib/schema/program";
import { ScholarshipTask } from "@/app/lib/schema/scholarship";
import { useQuery } from "@tanstack/react-query";

export function useScholarships(){
    const {
        data = [] as ScholarshipTask[],
        isLoading,
        error
    } = useQuery<ScholarshipTask[]>({
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
