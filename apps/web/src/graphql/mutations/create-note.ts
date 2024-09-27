import { graphql } from "@/generated";

export const CREATE_NOTE_MUTATION = graphql(`
  mutation CreateNote($data: CreateNoteInput!) {
    createNote(data: $data) {
      id
      title
      content
      createdAt
      updatedAt
      isLocked
    }
  }
`);
