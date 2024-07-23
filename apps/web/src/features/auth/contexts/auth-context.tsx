import type { User } from "@chatify/db";
import type { PropsWithChildren } from "react";
import { createContext, useCallback, useState } from "react";

import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  saveAuthTokens,
} from "@/features/auth/utils";

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthContextValue = {
  isAuthenticated: boolean;
  user: User | null;
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
        user: null,
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
