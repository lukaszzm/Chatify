import { graphql } from "@/generated";

export const UPDATED_NOTE_FRAGMENT = graphql(`
  fragment UpdatedNote on Note {
    id
    content
    isLocked
    updatedAt
  }
`);
