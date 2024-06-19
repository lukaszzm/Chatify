import { useQuery } from "urql";

import { graphql } from "@/gql";

const NotesQuery = graphql(`
  query Notes {
    notes {
      id
      title
    }
  }
`);

export const useNotes = () => {
  return useQuery({
    query: NotesQuery,
  });
};
