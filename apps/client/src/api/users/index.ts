import { axiosConfig } from "../../service/axiosConfig";

export const searchUsers = async (input: string) => {
  const response = await axiosConfig.get(`users?name=${input}`);
  return response.data;
};

export const updateUserInfo = async (values: Object) => {
  const formData = new FormData();

  Object.keys(values).forEach((key) => {
    if (typeof values[key] === "object") {
      const file = values[key][0];
      formData.append("profileImage", file);
    } else {
      formData.append(key, values[key]);
    }
  });

  const response = await axiosConfig.patch("/users/me", formData);
  return response.data;
};

export const getUserInfo = async (ID: string) => {
  const result = await axiosConfig.get(`users/${ID}`);
  return result.data;
};
