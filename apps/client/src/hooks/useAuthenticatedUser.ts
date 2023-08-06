import { useAuth } from "./useAuth";

export const useAuthenticatedUser = () => {
  const { data } = useAuth();

  if (!data) {
    throw Error("User is not authenticated!");
  }

  return {
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    fullName: data.fullName,
    profileImage: data.profileImage,
  };
};
