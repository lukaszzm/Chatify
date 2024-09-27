import { graphql } from "@/generated";

export const UPDATE_NOTE_MUTATION = graphql(`
  mutation UpdateNote($noteId: String!, $content: String!) {
    updateNote(noteId: $noteId, content: $content) {
      id
      content
      isLocked
      updatedAt
    }
  }
`);
