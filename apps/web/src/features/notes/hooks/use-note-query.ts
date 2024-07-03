import { useQuery } from "urql";

import { graphql } from "@/gql";

const NoteQuery = graphql(`
  query Note($noteId: String!) {
    note(noteId: $noteId) {
      id
      title
      content
      updatedAt
    }
  }
`);

export const useNoteQuery = (noteId: string) => {
  return useQuery({
    query: NoteQuery,
    variables: { noteId },
  });
};
