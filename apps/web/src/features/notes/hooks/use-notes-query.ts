import { useMemo } from "react";
import { useQuery } from "urql";

import { NOTES_QUERY } from "@/lib/gql/queries";

export const useNotesQuery = () => {
  const context = useMemo(() => ({ additionalTypenames: ["Note"] }), []);

  return useQuery({
    query: NOTES_QUERY,
    context,
  });
};
