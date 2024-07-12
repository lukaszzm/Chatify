import { SearchInput } from "@chatify/ui";
import { useState } from "react";

import { Results } from "@/features/search/components/results";
import { useDebounce } from "@/hooks/use-debounce";

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

      {debouncedPhrase !== "" && <Results phrase={debouncedPhrase} />}
    </div>
  );
};
