import { axiosConfig } from "../service/axiosConfig";

export const searchUsers = async (input: string) => {
  const response = await axiosConfig.get(`users/name/${input}`);
  return response.data;
};

export const updatePassword = async ({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await axiosConfig.patch("users/password", {
    currentPassword,
    newPassword,
  });
  return response.data;
};

export const updateProfileImage = async ({
  _id,
  image,
}: {
  _id: string;
  image: FileList;
}) => {
  const formData = new FormData();
  formData.append("id", _id);
  formData.append("profileImage", image[0]);
  const response = await axiosConfig.patch("users/profile-image/", formData);
  return response.data;
};

export const updateFirstName = async ({ value }: { value: string }) => {
  const response = await axiosConfig.patch(`users/first-name/${value}`);
  return response.data;
};

export const updateLastName = async ({ value }: { value: string }) => {
  const response = await axiosConfig.patch(`users/last-name/${value}`);
  return response.data;
};
