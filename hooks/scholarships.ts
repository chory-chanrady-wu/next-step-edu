import { fetchScholarships } from "@/app/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useScholarships(){
    return useQuery({
        queryKey: ['scholarships'],
        queryFn: fetchScholarships
    })
}
