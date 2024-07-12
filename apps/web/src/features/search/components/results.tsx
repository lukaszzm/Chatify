import { ErrorAlert } from "@/components/errors/error-alert";
import { Result } from "@/features/search/components/result";
import { ResultsLoading } from "@/features/search/components/results-loading";
import { useSearch } from "@/features/search/hooks/use-search";

interface ResultsProps {
  phrase: string;
}

export const Results = ({ phrase }: ResultsProps) => {
  const [{ data, fetching, error }] = useSearch(phrase);

  if (fetching) {
    return <ResultsLoading />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  const results = data?.users;

  if (results?.length === 0) {
    return (
      <p className="text-center text-muted-foreground text-sm py-12">No users found</p>
    );
  }

  return (
    <div className="flex gap-2">
      {results?.map((result) => <Result key={result.id} {...result} />)}
    </div>
  );
};
