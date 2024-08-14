import { Container, Separator, Skeleton } from "@chatify/ui";

export const NoteLoading = () => {
  return (
    <Container className="space-y-2 p-4">
      <div className="flex gap-2">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
      </div>
      <Skeleton className="h-8 w-36" />
      <Separator />
      <Skeleton className="h-6 w-full max-w-sm" />
    </Container>
  );
};
