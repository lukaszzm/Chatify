import type { RequestPolicy } from "urql";
import { useQuery } from "urql";

import { NOTES_QUERY } from "@/lib/gql/queries";

interface UseNotesQueryProps {
  after?: string | null;
  pause?: boolean;
  requestPolicy?: RequestPolicy;
}

export const useNotesQuery = ({ after, pause, requestPolicy }: UseNotesQueryProps) => {
  return useQuery({
    query: NOTES_QUERY,
    variables: { after },
    pause,
    requestPolicy,
  });
};
