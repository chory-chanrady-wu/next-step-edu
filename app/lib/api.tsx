// API Configuration
const API_BASE_URL = "http://localhost:3001";

// ==================== UNIVERSITIES ====================

/**
 * Fetch all universities
 */
export async function fetchUniversities() {
  const response = await fetch(`${API_BASE_URL}/universities`);
  if (!response.ok) {
    throw new Error("Failed to fetch universities");
  }
  const universities = await response.json();

  // Fetch all programs to count per university
  const programsResponse = await fetch(`${API_BASE_URL}/programs`);
  const programs = programsResponse.ok ? await programsResponse.json() : [];

  // Add programs_count to each university
  return universities.map((uni: any) => ({
    ...uni,
    programs_count: programs.filter((p: any) => p.university_id === uni.id)
      .length,
  }));
}

/**
 * Fetch a single university by ID
 * @param id - University ID
 */
export async function fetchUniversityById(id: string) {
  const response = await fetch(`${API_BASE_URL}/universities/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch university");
  }
  return response.json();
}

/**
 * Fetch contact information for a specific university
 * @param universityId - University ID
 */
export async function fetchUniversityContact(universityId: string) {
  const response = await fetch(
    `${API_BASE_URL}/university_contacts?university_id=${universityId}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch university contact");
  }
  const data = await response.json();
  return data[0] || null;
}

/**
 * Fetch all faculties
 */
export async function fetchFaculties() {
  const response = await fetch(`${API_BASE_URL}/faculties`);
  if (!response.ok) {
    throw new Error("Failed to fetch faculties");
  }
  return response.json();
}

/**
 * Fetch faculties for a specific university
 * @param universityId - University ID
 */
export async function fetchFacultiesByUniversity(universityId: string) {
  const response = await fetch(
    `${API_BASE_URL}/faculties?university_id=${universityId}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch faculties");
  }
  return response.json();
}

// ==================== PROGRAMS ====================

/**
 * Fetch programs for a specific university
 * @param universityId - University ID
 */
export async function fetchProgramsByUniversity(universityId: string) {
  const response = await fetch(
    `${API_BASE_URL}/programs?university_id=${universityId}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch programs");
  }
  return response.json();
}

/**
 * Fetch all programs
 */
export async function fetchAllPrograms() {
  const response = await fetch(`${API_BASE_URL}/programs`);
  if (!response.ok) {
    throw new Error("Failed to fetch programs");
  }
  return response.json();
}

// ==================== SCHOLARSHIPS ====================

/**
 * Fetch all scholarships
 */
export async function fetchScholarships() {
  const response = await fetch(`${API_BASE_URL}/scholarships`);
  if (!response.ok) {
    throw new Error("Failed to fetch scholarships");
  }
  return response.json();
}

/**
 * Fetch a single scholarship by ID
 * @param id - Scholarship ID
 */
export async function fetchScholarshipById(id: string) {
  const response = await fetch(`${API_BASE_URL}/scholarships/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch scholarship");
  }
  return response.json();
}

// ==================== USERS ====================

/**
 * Login user
 * @param email - User email
 * @param password - User password
 */
export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  return response.json();
}

/**
 * Register a new user
 * @param userData - User registration data
 */
export async function registerUser(userData: {
  email: string;
  password: string;
  name: string;
}) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Registration failed");
  }
  return response.json();
}

// ==================== ADMIN ====================

/**
 * Fetch all users (admin only)
 */
export async function fetchAllUsers() {
  const response = await fetch(`${API_BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

/**
 * Delete a user (admin only)
 * @param userId - User ID to delete
 */
export async function deleteUser(userId: string) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
  return response.json();
}
