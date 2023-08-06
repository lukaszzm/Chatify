import type { NoteForm } from "../interfaces/Note";
import { axiosConfig } from "../service/axiosConfig";

export const getNotes = async () => {
  const response = await axiosConfig.get("notes/");
  console.log("get-notes");
  console.log(response.data);
  console.log("-----------------------");
  return response.data;
};

export const newNote = async (note: NoteForm) => {
  const response = await axiosConfig.post(`notes/`, note);
  console.log("post-new-note");
  console.log(response.data);
  console.log("-----------------------");
  return response.data;
};

export const getNoteInfo = async (id: string) => {
  const response = await axiosConfig.get(`notes/${id}`);
  console.log("get-note-info");
  console.log(response.data);
  console.log("-----------------------");
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await axiosConfig.delete(`notes/${id}`);
  console.log("delete-note");
  console.log(response.data);
  console.log("-----------------------");
  return response.data;
};
