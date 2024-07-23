import { useQuery } from "urql";

import { graphql } from "@/gql";

const NoteQuery = graphql(`
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

export const useNoteQuery = (id: string) => {
  return useQuery({
    query: NoteQuery,
    variables: { id },
  });
};
