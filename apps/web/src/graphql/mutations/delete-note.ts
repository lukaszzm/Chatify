import { graphql } from "@/generated";

export const DELETE_NOTE_MUTATION = graphql(`
  mutation DeleteNote($noteId: String!) {
    deleteNote(noteId: $noteId) {
      id
    }
  }
`);
