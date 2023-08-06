import { axiosConfig } from "../service/axiosConfig";
import { SignInCredentials, SignUpCredentials } from "../interfaces/Credentials";
import { AxiosError } from "axios";

export const signIn = async (signInCredentials: SignInCredentials) => {
  const response = await axiosConfig.post("/auth/sign-in", signInCredentials);
  console.log("sign-in");
  console.log(response.data);
  console.log("-----------------------");
  return response.data;
};

export const signUp = async (signUpCredentials: SignUpCredentials) => {
  const { email, password, firstName, lastName, profileImage } = signUpCredentials;
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  if (profileImage) formData.append("profileImage", profileImage[0]);

  const response = await axiosConfig.post("auth/sign-up", formData);
  console.log("sign-up");
  console.log(response.data);
  console.log("-----------------------");
  return response.data;
};

export const getLoggedInUser = async () => {
  const localToken = localStorage.getItem("token");
  if (localToken) {
    const response = await axiosConfig.get(`users/me`);
    console.log("get-logged-in-user");
    console.log(response.data);
    console.log("-----------------------");
    return response.data;
  } else {
    return null;
  }
};
