import { Container, Separator, Skeleton } from "@chatify/ui";

export const NoteLoading = () => {
  return (
    <Container className="space-y-2 p-4">
      <div className="flex gap-2">
        <Skeleton className="w-24 h-6" />
        <Skeleton className="w-24 h-6" />
      </div>
      <Skeleton className="w-36 h-8" />
      <Separator />
      <Skeleton className="w-full max-w-sm h-6" />
    </Container>
  );
};
