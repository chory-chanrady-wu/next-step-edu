import { fetchScholarships } from "@/app/lib/api";
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
