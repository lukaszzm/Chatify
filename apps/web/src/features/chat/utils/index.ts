import { ChatType } from "@/gql/graphql";

type Participant = {
  id: string;
  firstName: string;
  lastName: string;
};

export const generateChatTitle = <T extends Participant>(
  chatType: ChatType,
  participants: T[],
  currentUserId?: string
) => {
  if (chatType === ChatType.Group) {
    return participants
      .map(({ firstName, lastName }) => `${firstName} ${lastName}`)
      .join(", ");
  }

  const secondParticipant = participants.find(({ id }) => id !== currentUserId);
  return `${secondParticipant?.firstName} ${secondParticipant?.lastName}`;
};
