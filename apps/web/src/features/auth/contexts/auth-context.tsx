import type { User } from "@chatify/db";
import type { PropsWithChildren } from "react";
import { createContext, useCallback, useState } from "react";
import { useQuery } from "urql";

import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  saveAuthTokens,
} from "@/features/auth/utils";
import { ME_QUERY } from "@/lib/gql/queries";

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthUser = {
  profilePicture?: string | null;
} & Omit<User, "password" | "createdAt" | "updatedAt" | "profilePicture">;

export type AuthContextValue = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  signIn: (tokens: Tokens) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState(getAccessToken());
  const [refreshToken, setRefreshToken] = useState(getRefreshToken());

  const isAuthenticated = !!accessToken && !!refreshToken;

  const [{ data }] = useQuery({
    query: ME_QUERY,
    requestPolicy: "network-only",
    pause: !isAuthenticated,
  });

  const signIn = useCallback(async ({ accessToken, refreshToken }: Tokens) => {
    saveAuthTokens({ accessToken, refreshToken });
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    // sleep 1s - fix with a better solution
    await new Promise((r) => setTimeout(r, 10));
  }, []);

  const signOut = useCallback(() => {
    clearAuthTokens();
    setAccessToken(null);
    setRefreshToken(null);
    window.location.reload();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data?.me ?? null,
        isAuthenticated,
        accessToken,
        refreshToken,
        signOut,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
