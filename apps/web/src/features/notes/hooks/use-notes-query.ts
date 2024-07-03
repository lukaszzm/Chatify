import { useQuery } from "urql";

import { graphql } from "@/gql";

const NotesQuery = graphql(`
  query Notes {
    notes {
      id
      title
      content
      updatedAt
    }
  }
`);

export const useNotesQuery = () => {
  const [result] = useQuery({
    query: NotesQuery,
  });

  return result;
};
