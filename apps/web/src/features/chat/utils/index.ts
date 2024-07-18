import type { Participant } from "@/features/chat/types";

export const generateChatTitle = (participants: Participant[]) => {
  return participants
    .map(({ firstName, lastName }) => `${firstName} ${lastName}`)
    .join(", ");
};
