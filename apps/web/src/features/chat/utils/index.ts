type Participant = {
  firstName: string;
  lastName: string;
};

export const generateChatTitle = <T extends Participant>(participants: T[]) => {
  return participants
    .map(({ firstName, lastName }) => `${firstName} ${lastName}`)
    .join(", ");
};
