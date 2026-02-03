const API_BASE_URL = "http://localhost:3001"

export async function fetchScholarships(){
    const response = await fetch(`${API_BASE_URL}/scholarships`)
    if(!response.ok) throw new Error("Failed to fetch projects")
        return response.json()
}
/*
    @Fetch Scholarship
*/
export async function fetchScholarship(id: string){
    const response = await fetch(`${API_BASE_URL}/scholarships/${id}`)
    if(!response.ok)throw new Error("Failed to fetch scholarship")
        return response.json()
}

export async function fetchProgram(){
    const response = await fetch(`${API_BASE_URL}/programs`)
    if(!response.ok) throw new Error("Failed to fetch programs")
        return response.json();
}


