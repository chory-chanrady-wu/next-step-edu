// lib/auth.ts
"use client";

import { jwtDecode } from "jwt-decode";

export type JwtPayload = {
  sub?: string;
  role?: "ADMIN" | "USER" | string;
  scope?: string;
  aud?: string[] | string;
  iss?: string;
  exp?: number; // seconds
  iat?: number; // seconds
  jti?: string;
};

const TOKEN_KEYS = ["accessToken", "token", "authToken"] as const;

export function getAccessToken(): string | null {
  for (const k of TOKEN_KEYS) {
    const v = localStorage.getItem(k);
    if (v) return v;
  }
  return null;
}

export function getRefreshToken(): string | null {
  return localStorage.getItem("refreshToken");
}

export function setTokens(accessToken: string, refreshToken?: string | null) {
  // keep your app consistent with your current axios code
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("token", accessToken);
  localStorage.setItem("authToken", accessToken);

  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }

  // optional: also cache role for quick check
  const role = getRoleFromToken(accessToken);
  if (role) localStorage.setItem("role", role);
}

export function clearAuth() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("token");
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  localStorage.removeItem("role");
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
}

export function getPayload(): JwtPayload | null {
  const token = getAccessToken();
  if (!token) return null;
  return decodeToken(token);
}

export function getRole(): string | null {
  // Prefer decoding token (source of truth)
  const payload = getPayload();
  if (payload?.role) return payload.role;

  // fallback if you saved role separately
  return localStorage.getItem("role");
}

export function isAdmin(): boolean {
  return getRole() === "ADMIN";
}

export function isUser(): boolean {
  return getRole() === "USER";
}

export function getEmail(): string | null {
  return getPayload()?.sub ?? null;
}

export function isTokenExpired(): boolean {
  const exp = getPayload()?.exp;
  if (!exp) return true;
  return Date.now() >= exp * 1000;
}

export function isLoggedIn(): boolean {
  const token = getAccessToken();
  if (!token) return false;
  return !isTokenExpired();
}

export function getRoleFromToken(accessToken: string): string | null {
  return decodeToken(accessToken)?.role ?? null;
}

export function loginWithResponse(res: { accessToken: string; refreshToken?: string | null }) {
  setTokens(res.accessToken, res.refreshToken);
}
