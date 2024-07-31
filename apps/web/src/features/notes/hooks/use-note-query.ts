import { useQuery } from "urql";

import { NOTE_QUERY } from "@/lib/gql/queries";

export const useNoteQuery = (id: string) => {
  return useQuery({
    query: NOTE_QUERY,
    variables: { id },
  });
};
