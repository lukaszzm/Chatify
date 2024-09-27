import { graphql } from "@/generated";

export const TOGGLE_LOCK_MUTATION = graphql(`
  mutation ToggleLock($noteId: String!) {
    toggleLock(noteId: $noteId) {
      id
      content
      isLocked
      updatedAt
    }
  }
`);
