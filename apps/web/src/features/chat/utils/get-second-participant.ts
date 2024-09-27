import type { UserInfoFragment } from "@/generated/graphql";

export function getSecondParticipant<T extends UserInfoFragment>(
  participants: T[],
  currentUserId?: string
): T {
  const second = participants.find(({ id }) => id !== currentUserId);

  if (!second) {
    throw new Error("Second participant not found");
  }

  return second;
}
