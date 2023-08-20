import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must contain at least 8 characters"),
  firstName: z.string().min(1, "First name is required").max(50, "First name must be less than 50 characters long"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name must be less than 50 characters long"),
  profileImage: z.instanceof(FileList),
});

export const NewMessageSchema = z.object({
  text: z.string().min(1, "Message cannot be empty").max(250, "Message cannot be longer than 250 characters"),
});

export const NoteSchema = z.object({
  title: z.string().min(1, "Title is required").max(50, "Your title must be less than 50 characters long"),
  text: z.string().min(1, "Text is required").max(5000, "Your text must be less than 1000 characters long"),
});

export const ChangeProfileImageSchema = z.object({
  profileImage: z.instanceof(FileList),
});

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(8, "Password must contain at least 8 characters"),
  newPassword: z.string().min(8, "Password must contain at least 8 characters"),
});

export const ChangeFirstNameSchema = z.object({
  firstName: z.string().min(1, "Required"),
});

export const ChangeLastNameSchema = z.object({
  lastName: z.string().min(1, "Required"),
});
