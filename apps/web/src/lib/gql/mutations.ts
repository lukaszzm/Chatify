import { graphql } from "@/gql";

export const CREATE_NOTE_MUTATION = graphql(`
  mutation CreateNote($data: CreateNoteInput!) {
    createNote(data: $data) {
      id
      title
      content
      updatedAt
      isLocked
    }
  }
`);

export const DELETE_NOTE_MUTATION = graphql(`
  mutation DeleteNote($noteId: String!) {
    deleteNote(noteId: $noteId) {
      id
    }
  }
`);

export const TOGGLE_LOCK_MUTATION = graphql(`
  mutation ToggleLock($noteId: String!) {
    toggleLock(noteId: $noteId) {
      id
    }
  }
`);

export const UPDATE_NOTE_MUTATION = graphql(`
  mutation UpdateNote($noteId: String!, $content: String!) {
    updateNote(noteId: $noteId, content: $content) {
      id
    }
  }
`);
