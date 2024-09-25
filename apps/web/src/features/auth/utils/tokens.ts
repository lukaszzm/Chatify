import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/features/auth/constants/tokens";
import type { AuthTokens } from "@/features/auth/types";

export function saveAuthTokens({ accessToken, refreshToken }: AuthTokens): void {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
}

export function clearAuthTokens(): void {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN);
}
