import { Button, SearchInput } from "@chatify/ui";

import { useSearch } from "@/features/search/hooks/use-search";

export const Search = () => {
  const { searchUsers } = useSearch();

  const clickHandler = async () => {
    await searchUsers("test");
  };

  return (
    <div className="flex gap-2">
      <SearchInput placeholder="Search user" />
      <Button onClick={clickHandler}>Search</Button>
    </div>
  );
};
