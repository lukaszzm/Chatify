import { useQuery } from "urql";

import { graphql } from "@/gql";

const NotesQuery = graphql(`
  query Notes {
    notes {
      id
      title
      content
      createdAt
    }
  }
`);

export const useNotesQuery = () => {
  return useQuery({
    query: NotesQuery,
  });
};
