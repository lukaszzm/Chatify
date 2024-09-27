import type { RequestPolicy } from "urql";
import { useQuery } from "urql";

import { NOTES_QUERY } from "@/graphql/queries/notes";

interface UseNotesQueryOptions {
  after?: string | null;
  pause?: boolean;
  requestPolicy?: RequestPolicy;
}

export const useNotesQuery = (options?: UseNotesQueryOptions) => {
  const { after, pause, requestPolicy } = options || {};

  return useQuery({
    query: NOTES_QUERY,
    variables: { after },
    pause,
    requestPolicy,
  });
};
