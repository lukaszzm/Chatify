import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLoggedInUser, signIn, signUp } from "../api/auth";
import { SignInCredentials, SignUpCredentials } from "../interfaces/Credentials";
import { useNavigate } from "react-router-dom";
import type { User } from "../interfaces/User";

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, ...rest } = useQuery<User>({
    queryKey: ["auth"],
    queryFn: () => getLoggedInUser(),
    onError: () => logout(),
  });

  const signInMutation = useMutation({
    mutationFn: (signInCredentials: SignInCredentials) => signIn(signInCredentials),
    onSuccess: ({ access_token }) => {
      localStorage.setItem("token", access_token);
      navigate("/dashboard/chat");
    },
  });

  const signUpMutation = useMutation({
    mutationFn: (signUpCredentials: SignUpCredentials) => signUp(signUpCredentials),
    onSuccess: ({ access_token }) => {
      localStorage.setItem("token", access_token);
      navigate("/dashboard/chat");
    },
  });

  const logout = () => {
    localStorage.removeItem("token");
    queryClient.setQueryData(["auth"], null);
    navigate("/");
  };

  return { data, signInMutation, signUpMutation, logout, ...rest };
};
