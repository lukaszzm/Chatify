import { useQuery } from "urql";

import { NOTE_QUERY } from "@/graphql/queries/note";

export const useNoteQuery = (id: string) => {
  return useQuery({
    query: NOTE_QUERY,
    variables: { id },
  });
};
