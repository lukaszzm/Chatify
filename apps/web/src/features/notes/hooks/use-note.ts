import { useQuery } from "urql";

import { graphql } from "@/gql";

const NoteQuery = graphql(`
  query Note($noteId: String!) {
    note(noteId: $noteId) {
      id
      title
      content
      createdAt
    }
  }
`);

export const useNote = (noteId: string) => {
  return useQuery({
    query: NoteQuery,
    variables: { noteId },
  });
};
