import { useMemo } from "react";
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
  const context = useMemo(() => ({ additionalTypenames: ["Note"] }), []);

  return useQuery({
    query: NotesQuery,
    context,
  });
};
