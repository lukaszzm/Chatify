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

export const useNotes = () => {
  return useQuery({
    query: NotesQuery,
  });
};
