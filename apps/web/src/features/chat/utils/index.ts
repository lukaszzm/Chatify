type Participant = {
  id: string;
  firstName: string;
  lastName: string;
};

export function getSecondParticipant<T extends Participant>(
  participants: T[],
  currentUserId?: string
): T {
  const second = participants.find(({ id }) => id !== currentUserId);

  if (!second) {
    throw new Error("Second participant not found");
  }

  return second;
}
