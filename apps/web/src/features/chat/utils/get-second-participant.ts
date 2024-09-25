import type { User } from "@/gql/graphql";

export function getSecondParticipant<
  T extends Pick<User, "id" | "firstName" | "lastName">,
>(participants: T[], currentUserId?: string): T {
  const second = participants.find(({ id }) => id !== currentUserId);

  if (!second) {
    throw new Error("Second participant not found");
  }

  return second;
}
