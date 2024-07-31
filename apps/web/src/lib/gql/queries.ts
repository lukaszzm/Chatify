import { graphql } from "@/gql";

export const NOTE_QUERY = graphql(`
  query Note($id: String!) {
    note(id: $id) {
      id
      title
      content
      updatedAt
      isLocked
    }
  }
`);

export const NOTES_QUERY = graphql(`
  query Notes {
    notes {
      id
      title
      content
      updatedAt
    }
  }
`);
