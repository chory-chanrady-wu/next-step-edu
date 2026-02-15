import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import type {
  RegisterUserRequest,
  FacultyRequest,
  FacultyResponse,
  ProgramRequest,
  ProgramResponse,
  ScholarshipResponse,
  PageResponse,
  ScholarshipMultipartPayload,
  ScholarshipContactRequest,
  ScholarshipContactResponse,
  UniversityResponse,
  UniversityMultipartPayload,
  UniversityContactRequest,
  UniversityContactResponse,
  UserProfileResponse,
  UpdateProfileRequest,
  LoginRequest,
  AuthResponse,
} from "@/types/nextstepedu";

const API_BASE_URL =
  "https://mid-term-wing-nextstepedu-backend-production.up.railway.app";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const authHeader = () => {
  const token =
    localStorage.getItem("accessToken") ||
    localStorage.getItem("token") ||
    localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Skip adding the token for auth endpoints
    const isAuthEndpoint =
      config.url?.includes("/api/v1/auth/authenticate") ||
      config.url?.includes("/api/v1/auth/register") ||
      config.url?.includes("/api/v1/auth/login");

    if (!isAuthEndpoint) {
      const token =
        localStorage.getItem("accessToken") ||
        localStorage.getItem("token") ||
        localStorage.getItem("authToken");
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Check if the response is wrapped in a generic standard structure { status, message, data }
    // We strictly check for 'data' property existence to avoid unboxing if the actual response IS the data
    // but usually arrays don't have 'data' property.
    if (
      response.data &&
      typeof response.data === "object" &&
      "data" in response.data
    ) {
      // Return the inner data
      return { ...response, data: response.data.data };
    }
    return response;
  },
  (error: AxiosError) => {
    // Handle 401 Unauthorized globally
    if (error.response && error.response.status === 401) {
      if (typeof window !== "undefined") {
        // Clear tokens
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("token");
        localStorage.removeItem("authToken");

        // Redirect to login if not already there
        if (!window.location.pathname.includes("/auth/login")) {
          window.location.href = "/admin/auth/login";
        }
      }
    }
    return Promise.reject(error);
  },
);

/* =======================
   AUTH
 ======================= */
export async function authenticate(
  payload: LoginRequest,
): Promise<AuthResponse> {
  // Most Spring Boot apps use /login or /signin if registration is at /register
  const { data } = await api.post<AuthResponse>("/api/v1/auth/login", {
    email: payload.email,
    username: payload.email,
    password: payload.password,
  });
  return data;
}

export async function registerUser(
  payload: RegisterUserRequest,
): Promise<string> {
  const formData = new FormData();
  formData.append("email", payload.email);
  formData.append("password", payload.password);
  formData.append("firstname", payload.firstname);
  formData.append("lastname", payload.lastname);
  formData.append("phone", payload.phone);
  if (payload.image) formData.append("image", payload.image);

  const { data } = await api.post<string>("/api/v1/auth/register", formData, {
    headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
  });
  return data;
}

/* =======================
   FACULTIES
======================= */
export async function createFaculty(
  body: FacultyRequest,
): Promise<FacultyResponse> {
  const { data } = await api.post<FacultyResponse>("/api/v1/faculties", body, {
    headers: authHeader(),
  });
  return data;
}

export async function getFacultyById(
  id: number | string,
): Promise<FacultyResponse> {
  const { data } = await api.get<FacultyResponse>(`/api/v1/faculties/${id}`, {
    headers: authHeader(),
  });
  return data;
}

export async function getAllFaculties(
  universityId?: number | string,
): Promise<FacultyResponse[]> {
  const { data } = await api.get<FacultyResponse[]>("/api/v1/faculties", {
    headers: authHeader(),
    params: universityId ? { universityId } : {},
  });
  return data;
}

export async function updateFaculty(
  id: number | string,
  body: FacultyRequest,
): Promise<FacultyResponse> {
  const { data } = await api.put<FacultyResponse>(
    `/api/v1/faculties/${id}`,
    body,
    { headers: authHeader() },
  );
  return data;
}

export async function deleteFaculty(id: number | string): Promise<void> {
  await api.delete(`/api/v1/faculties/${id}`, { headers: authHeader() });
}

/* =======================
   PROGRAMS
======================= */
export async function createProgram(
  body: ProgramRequest,
): Promise<ProgramResponse> {
  const { data } = await api.post<ProgramResponse>("/api/v1/programs", body, {
    headers: authHeader(),
  });
  return data;
}

export async function getAllPrograms(): Promise<ProgramResponse[]> {
  const { data } = await api.get<ProgramResponse[]>("/api/v1/programs");
  return data;
}

export async function getProgramById(
  id: number | string,
): Promise<ProgramResponse> {
  const { data } = await api.get<ProgramResponse>(`/api/v1/programs/${id}`);
  return data;
}

export async function updateProgram(
  id: number | string,
  body: ProgramRequest,
): Promise<ProgramResponse> {
  const { data } = await api.put<ProgramResponse>(
    `/api/v1/programs/${id}`,
    body,
    { headers: authHeader() },
  );
  return data;
}

export async function deleteProgram(id: number | string): Promise<void> {
  await api.delete(`/api/v1/programs/${id}`, { headers: authHeader() });
}

export async function getProgramsByUniversity(
  universityId: number | string,
): Promise<ProgramResponse[]> {
  const { data } = await api.get<ProgramResponse[]>(
    `/api/v1/programs/university/${universityId}`,
  );
  return data;
}

export async function getProgramsByFaculty(
  facultyId: number | string,
): Promise<ProgramResponse[]> {
  const { data } = await api.get<ProgramResponse[]>(
    `/api/v1/programs/faculty/${facultyId}`,
  );
  return data;
}

export async function searchProgramsByName(
  name: string,
): Promise<ProgramResponse[]> {
  const { data } = await api.get<ProgramResponse[]>("/api/v1/programs/search", {
    params: { name },
  });
  return data;
}

export async function getProgramsByDegreeLevel(
  level: number | string,
): Promise<ProgramResponse[]> {
  const { data } = await api.get<ProgramResponse[]>(
    `/api/v1/programs/degree-level/${level}`,
  );
  return data;
}

export async function getProgramsByTuitionRange(
  min: number,
  max: number,
): Promise<ProgramResponse[]> {
  const { data } = await api.get<ProgramResponse[]>(
    "/api/v1/programs/tuition-range",
    { params: { min, max } },
  );
  return data;
}

/* =======================
   SCHOLARSHIPS
======================= */
export async function getAllScholarships(params?: {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: "asc" | "desc";
}): Promise<PageResponse<ScholarshipResponse>> {
  const { data } = await api.get<PageResponse<ScholarshipResponse>>(
    "/api/v1/scholarship",
    { params },
  );
  return data;
}

export async function getScholarshipById(
  id: number | string,
): Promise<ScholarshipResponse> {
  const { data } = await api.get<ScholarshipResponse>(
    `/api/v1/scholarship/${id}`,
  );
  return data;
}

export async function getScholarshipBySlug(
  slug: string,
): Promise<ScholarshipResponse> {
  const { data } = await api.get<ScholarshipResponse>(
    `/api/v1/scholarship/slug/${slug}`,
  );
  return data;
}

export async function createScholarship(
  payload: ScholarshipMultipartPayload,
): Promise<any> {
  const formData = new FormData();
  formData.append("data", JSON.stringify(payload.data));
  if (payload.files?.logo) formData.append("logo", payload.files.logo);
  if (payload.files?.coverImage)
    formData.append("coverImage", payload.files.coverImage);

  const { data } = await api.post("/api/v1/scholarship", formData, {
    headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function updateScholarship(
  id: number | string,
  payload: ScholarshipMultipartPayload,
): Promise<ScholarshipResponse> {
  const formData = new FormData();
  formData.append("data", JSON.stringify(payload.data));
  if (payload.files?.logo) formData.append("logo", payload.files.logo);
  if (payload.files?.coverImage)
    formData.append("coverImage", payload.files.coverImage);

  const { data } = await api.put<ScholarshipResponse>(
    `/api/v1/scholarship/${id}`,
    formData,
    {
      headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
    },
  );
  return data;
}

export async function deleteScholarship(id: number | string): Promise<void> {
  await api.delete(`/api/v1/scholarship/${id}`, { headers: authHeader() });
}

/* =======================
   SCHOLARSHIP CONTACTS
======================= */
export async function getAllScholarshipContacts(): Promise<
  ScholarshipContactResponse[]
> {
  const { data } = await api.get<ScholarshipContactResponse[]>(
    "/api/v1/scholarship-contact",
  );
  return data;
}

export async function getScholarshipContactsByScholarshipId(
  scholarshipId: number | string,
): Promise<ScholarshipContactResponse[]> {
  const { data } = await api.get<ScholarshipContactResponse[]>(
    `/api/v1/scholarship-contact/scholarship/${scholarshipId}`,
  );
  return data;
}

export async function getScholarshipContactById(
  id: number | string,
): Promise<ScholarshipContactResponse> {
  const { data } = await api.get<ScholarshipContactResponse>(
    `/api/v1/scholarship-contact/${id}`,
  );
  return data;
}

export async function createScholarshipContact(
  body: ScholarshipContactRequest,
): Promise<ScholarshipContactResponse> {
  const { data } = await api.post<ScholarshipContactResponse>(
    "/api/v1/scholarship-contact",
    body,
    { headers: authHeader() },
  );
  return data;
}

export async function updateScholarshipContact(
  id: number | string,
  body: ScholarshipContactRequest,
): Promise<ScholarshipContactResponse> {
  const { data } = await api.put<ScholarshipContactResponse>(
    `/api/v1/scholarship-contact/${id}`,
    body,
    { headers: authHeader() },
  );
  return data;
}

export async function deleteScholarshipContact(
  id: number | string,
): Promise<void> {
  await api.delete(`/api/v1/scholarship-contact/${id}`, {
    headers: authHeader(),
  });
}

/* =======================
   UNIVERSITIES
======================= */
export async function createUniversity(
  payload: UniversityMultipartPayload,
): Promise<UniversityResponse> {
  const formData = new FormData();
  Object.keys(payload.data || {}).forEach((k) => {
    const v = (payload.data as any)[k];
    if (v !== undefined && v !== null) formData.append(k, String(v));
  });
  if (payload.files?.logoUrl) formData.append("logoUrl", payload.files.logoUrl);
  if (payload.files?.coverImageUrl)
    formData.append("coverImageUrl", payload.files.coverImageUrl);

  const { data } = await api.post<UniversityResponse>(
    "/api/v1/universities",
    formData,
    {
      headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
    },
  );
  return data;
}

export async function getUniversityById(
  id: number | string,
): Promise<UniversityResponse> {
  const { data } = await api.get<UniversityResponse>(
    `/api/v1/universities/${id}`,
  );
  return data;
}

export async function getUniversityBySlug(
  slug: string,
): Promise<UniversityResponse> {
  const { data } = await api.get<UniversityResponse>(
    `/api/v1/universities/slug/${slug}`,
  );
  return data;
}

export async function getAllUniversities(): Promise<UniversityResponse[]> {
  const { data } = await api.get<UniversityResponse[]>("/api/v1/universities", {
    headers: authHeader(),
  });
  return data;
}

export async function searchUniversities(
  keyword: string,
): Promise<UniversityResponse[]> {
  const { data } = await api.get<UniversityResponse[]>(
    "/api/v1/universities/search",
    { params: { keyword }, headers: authHeader() },
  );
  return data;
}

export async function updateUniversity(
  id: number | string,
  payload: UniversityMultipartPayload,
): Promise<UniversityResponse> {
  const formData = new FormData();
  Object.keys(payload.data || {}).forEach((k) => {
    const v = (payload.data as any)[k];
    if (v !== undefined && v !== null) formData.append(k, String(v));
  });
  if (payload.files?.logoUrl) formData.append("logoUrl", payload.files.logoUrl);
  if (payload.files?.coverImageUrl)
    formData.append("coverImageUrl", payload.files.coverImageUrl);

  const { data } = await api.put<UniversityResponse>(
    `/api/v1/universities/${id}`,
    formData,
    {
      headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
    },
  );
  return data;
}

export async function deleteUniversity(id: number | string): Promise<void> {
  await api.delete(`/api/v1/universities/${id}`, { headers: authHeader() });
}

/* =======================
   UNIVERSITY CONTACTS
======================= */
export async function createUniversityContact(
  body: UniversityContactRequest,
): Promise<UniversityContactResponse> {
  const { data } = await api.post<UniversityContactResponse>(
    "/api/v1/university-contacts",
    body,
    { headers: authHeader() },
  );
  return data;
}

export async function getAllUniversityContacts(): Promise<
  UniversityContactResponse[]
> {
  const { data } = await api.get<UniversityContactResponse[]>(
    "/api/v1/university-contacts",
  );
  return data;
}

export async function getUniversityContactById(
  id: number | string,
): Promise<UniversityContactResponse> {
  const { data } = await api.get<UniversityContactResponse>(
    `/api/v1/university-contacts/${id}`,
  );
  return data;
}

export async function getUniversityContactsByUniversityId(
  universityId: number | string,
): Promise<UniversityContactResponse[]> {
  const { data } = await api.get<UniversityContactResponse[]>(
    `/api/v1/university-contacts/university/${universityId}`,
  );
  return data;
}

export async function updateUniversityContact(
  id: number | string,
  body: UniversityContactRequest,
): Promise<UniversityContactResponse> {
  const { data } = await api.put<UniversityContactResponse>(
    `/api/v1/university-contacts/${id}`,
    body,
    { headers: authHeader() },
  );
  return data;
}

export async function deleteUniversityContact(
  id: number | string,
): Promise<void> {
  await api.delete(`/api/v1/university-contacts/${id}`, {
    headers: authHeader(),
  });
}

/* =======================
   USER PROFILES
======================= */
export async function getCurrentUserProfile(): Promise<UserProfileResponse> {
  const { data } = await api.get<UserProfileResponse>("/api/v1/profile/me", {
    headers: authHeader(),
  });
  return data;
}

export async function getUserProfileById(
  userId: number | string,
): Promise<UserProfileResponse> {
  const { data } = await api.get<UserProfileResponse>(
    `/api/v1/profile/users/${userId}`,
    { headers: authHeader() },
  );
  return data;
}

export async function getAllProfiles(): Promise<UserProfileResponse[]> {
  const { data } = await api.get<UserProfileResponse[]>("/api/v1/profile", {
    headers: authHeader(),
  });
  return data;
}

export async function updateProfile(
  userId: number | string,
  payload: UpdateProfileRequest,
): Promise<string> {
  const formData = new FormData();
  formData.append("firstname", payload.firstname);
  formData.append("lastname", payload.lastname);
  formData.append("phone", payload.phone);
  if (payload.image) formData.append("image", payload.image);

  const { data } = await api.put<string>(
    `/api/v1/profile/users/${userId}`,
    formData,
    {
      headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
    },
  );
  return data;
}

export async function deleteProfile(userId: number | string): Promise<string> {
  const { data } = await api.delete<string>(`/api/v1/profile/users/${userId}`, {
    headers: authHeader(),
  });
  return data;
}

export default api;
