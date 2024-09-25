import { SearchInput } from "@chatify/ui";
import { useState } from "react";

import { SearchResults } from "@/features/search/components/search-results";
import { useDebounce } from "@/hooks/use-debounce";
import { isEmpty } from "@/utils/is-empty";

export const Search = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const debouncedPhrase = useDebounce(searchPhrase, 200);

  return (
    <div className="space-y-2">
      <SearchInput
        placeholder="Search user"
        value={searchPhrase}
        onChange={(e) => setSearchPhrase(e.target.value)}
      />

      {!isEmpty(debouncedPhrase) ? <SearchResults phrase={debouncedPhrase} /> : null}
    </div>
  );
};
