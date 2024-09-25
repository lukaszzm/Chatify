import { ErrorAlert } from "@/components/error-alert";
import { SearchResult } from "@/features/search/components/search-result";
import { SearchResultsLoading } from "@/features/search/components/search-results-loading";
import { useSearch } from "@/features/search/hooks/use-search";

interface SearchResultsProps {
  phrase: string;
}

export const SearchResults = ({ phrase }: SearchResultsProps) => {
  const [{ data, fetching, error }] = useSearch(phrase);

  if (fetching) {
    return <SearchResultsLoading />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  const results = data?.users;

  if (results?.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">No users found</p>
    );
  }

  return (
    <div className="flex gap-2">
      {results?.map((result) => <SearchResult key={result.id} {...result} />)}
    </div>
  );
};
