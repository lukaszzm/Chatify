import type { NoteForm } from "../../interfaces/Note";
import { axiosConfig } from "../../service/axiosConfig";

export const getNotes = async () => {
  const response = await axiosConfig.get("notes/");
  return response.data;
};

export const newNote = async (note: NoteForm) => {
  const response = await axiosConfig.post(`notes/`, note);
  return response.data;
};

export const getNoteInfo = async (id: string) => {
  const response = await axiosConfig.get(`notes/${id}`);
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await axiosConfig.delete(`notes/${id}`);
  return response.data;
};
