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
  ApplicantRequest,
  ApplicantResponse,
} from "@/types/nextstepedu";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://mid-term-wing-nextstepedu-backend-production.up.railway.app";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const authHeader = () => {
  // Check if we're in browser environment
  if (typeof window === "undefined") return {};

  const token =
    localStorage.getItem("accessToken") ||
    localStorage.getItem("token") ||
    localStorage.getItem("authToken");
  if (!token || token === "undefined" || token === "null") return {};
  return { Authorization: `Bearer ${token}` };
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Only add auth headers in browser environment
    if (typeof window === "undefined") return config;

    const isAuthEndpoint =
      config.url?.includes("/api/v1/auth/authenticate") ||
      config.url?.includes("/api/v1/auth/register") ||
      config.url?.includes("/api/v1/auth/login");
    // Make scholarship endpoints public (no token)
    const isScholarshipPublic = config.url?.startsWith("/api/v1/scholarship");

    if (!isAuthEndpoint && !isScholarshipPublic) {
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

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

import { setTokens, clearAuth } from "@/lib/auth";

export async function refreshToken(): Promise<string> {
  // Only refresh tokens in browser environment
  if (typeof window === "undefined") {
    throw new Error("Token refresh not available on server");
  }

  const refreshTokenValue = localStorage.getItem("refreshToken");
  if (!refreshTokenValue) {
    throw new Error("No refresh token available");
  }

  try {
    const { data: responseBody } = await axios.post(
      `${API_BASE_URL}/api/v1/auth/refresh-token`,
      {
        refreshToken: refreshTokenValue,
      },
    );

    // Handle standard wrapper { data: { accessToken, refreshToken } } or direct response
    const data = responseBody.data || responseBody;
    const { accessToken, refreshToken: newRefreshToken } = data;

    if (!accessToken) {
      throw new Error("No access token in refresh response");
    }

    // Use centralized utility to update all storage keys and roles
    setTokens(accessToken, newRefreshToken);

    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    return accessToken;
  } catch (error) {
    if (typeof window !== "undefined") {
      clearAuth();
      if (!window.location.pathname.includes("/admin/login")) {
        window.location.href = "/admin/login";
      }
    }
    throw error;
  }
}

api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (
      response.data &&
      typeof response.data === "object" &&
      "data" in response.data
    ) {
      return { ...response, data: response.data.data };
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401) {
      if (originalRequest && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return api(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const newToken = await refreshToken();
          processQueue(null, newToken);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }

          return api(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError as Error, null);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
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
  try {
    const { data } = await api.get<ScholarshipResponse>(
      `/api/v1/scholarship/${id}`,
    );
    return data;
  } catch (error) {
    throw error;
  }
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

  // Append all data fields individually (backend expects @RequestParam for each)
  formData.append("name", payload.data.name || "");
  formData.append("slug", payload.data.slug || "");
  formData.append("description", payload.data.description || "");
  formData.append("country", payload.data.country || "");
  formData.append("city", payload.data.city || "");
  formData.append("officialWebsite", payload.data.officialWebsite || "");
  formData.append("label", payload.data.label || "");
  formData.append("email", payload.data.email || "");
  formData.append("phone", payload.data.phone || "");
  formData.append("status", payload.data.status || "active");

  // Append files
  if (payload.files?.logo) formData.append("logo", payload.files.logo);
  if (payload.files?.coverImage)
    formData.append("coverImage", payload.files.coverImage);

  // Debug: Log what we're sending
  console.log("Creating university with data:", {
    name: payload.data.name,
    slug: payload.data.slug,
    status: payload.data.status,
    hasLogo: !!payload.files?.logo,
    hasCover: !!payload.files?.coverImage,
  });

  const { data } = await api.post<UniversityResponse>(
    "/api/v1/universities",
    formData,
    {
      headers: authHeader(), // Don't set Content-Type - let browser set it with boundary
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
  const { data } = await api.get<UniversityResponse[]>("/api/v1/universities");
  return data;
}

export async function searchUniversities(
  keyword: string,
): Promise<UniversityResponse[]> {
  const { data } = await api.get<UniversityResponse[]>(
    "/api/v1/universities/search",
    { params: { keyword } },
  );
  return data;
}

export async function updateUniversity(
  id: number | string,
  payload: UniversityMultipartPayload,
): Promise<UniversityResponse> {
  const formData = new FormData();

  // Append all data fields individually (backend expects @RequestParam for each)
  formData.append("name", payload.data.name || "");
  formData.append("slug", payload.data.slug || "");
  formData.append("description", payload.data.description || "");
  formData.append("country", payload.data.country || "");
  formData.append("city", payload.data.city || "");
  formData.append("officialWebsite", payload.data.officialWebsite || "");
  formData.append("label", payload.data.label || "");
  formData.append("email", payload.data.email || "");
  formData.append("phone", payload.data.phone || "");
  formData.append("status", payload.data.status || "active");

  // Append files
  if (payload.files?.logo) formData.append("logo", payload.files.logo);
  if (payload.files?.coverImage)
    formData.append("coverImage", payload.files.coverImage);

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
   USER PROFILES
======================= */
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

export async function updateUserStatus(
  id: number | string,
  status: string,
): Promise<string> {
  const { data } = await api.patch<string>(
    `/api/v1/users/${id}/status`,
    { status },
    {
      headers: {
        ...authHeader(),
        "Content-Type": "application/json",
      },
      responseType: "text",
    },
  );
  return data;
}

/* =======================
   APPLICANTS
======================= */
export async function createApplicant(
  payload: ApplicantRequest,
): Promise<ApplicantResponse> {
  try {
    const { data } = await api.post<ApplicantResponse>(
      "/api/v1/applicants",
      payload,
      { headers: authHeader() },
    );
    return data;
  } catch (error) {
    console.error("[API] Failed to create applicant:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to create applicant");
  }
}

export async function getApplicantById(
  id: number | string,
): Promise<ApplicantResponse> {
  const { data } = await api.get<ApplicantResponse>(
    `/api/v1/applicants/${id}`,
    { headers: authHeader() },
  );
  return data;
}

export async function getAllApplicants(): Promise<ApplicantResponse[]> {
  const { data } = await api.get<ApplicantResponse[]>("/api/v1/applicants", {
    headers: authHeader(),
  });
  return data;
}

export async function getApplicantsByUserId(
  userId: number | string,
): Promise<ApplicantResponse[]> {
  const { data } = await api.get<ApplicantResponse[]>(
    `/api/v1/applicants/user/${userId}`,
    { headers: authHeader() },
  );
  return data;
}

export async function getApplicantsByStatus(
  status: string,
): Promise<ApplicantResponse[]> {
  const { data } = await api.get<ApplicantResponse[]>(
    `/api/v1/applicants/status/${status}`,
    { headers: authHeader() },
  );
  return data;
}

export async function updateApplicant(
  id: number | string,
  payload: ApplicantRequest,
): Promise<ApplicantResponse> {
  const { data } = await api.put<ApplicantResponse>(
    `/api/v1/applicants/${id}`,
    payload,
    { headers: authHeader() },
  );
  return data;
}

export async function updateApplicantStatus(
  id: number | string,
  status: string,
): Promise<ApplicantResponse> {
  const { data } = await api.patch<ApplicantResponse>(
    `/api/v1/applicants/${id}/status`,
    {},
    {
      params: { status },
      headers: authHeader(),
    },
  );
  return data;
}

export async function deleteApplicant(id: number | string): Promise<void> {
  await api.delete(`/api/v1/applicants/${id}`, { headers: authHeader() });
}

export default api;
