import { useParams } from "react-router-dom";
import { RecentMessage } from "../RecentMessage";
import { Container, LoadingSpinner } from "../../../../components/UI";
import { useQuery } from "@tanstack/react-query";
import { getRecentMessages } from "../../../../api";
import { useAuthenticatedUser } from "../../../../hooks/useAuthenticatedUser";
import type { RecentMessage as IRecentMessage } from "../../../../interfaces/Message";

export const RecentMessages = () => {
  const { id: authId } = useAuthenticatedUser();
  const { chatId } = useParams();
  const { data, isLoading, isError } = useQuery<IRecentMessage[]>({
    queryKey: ["recent-messages"],
    queryFn: getRecentMessages,
  });

  console.log(data);
  return (
    <Container>
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <p>Something went wrong.</p>
      ) : data.length === 0 ? (
        <p>You don&apos;t have any chats yet.</p>
      ) : (
        data.map(({ id, text, createdAt, fullName, profileImage, userId, fromId }) => (
          <RecentMessage
            key={id}
            id={userId}
            fullName={fullName}
            profileImage={profileImage}
            isActive={chatId === userId}
            message={text}
            createdAt={createdAt}
            isMine={authId === fromId}
          />
        ))
      )}
    </Container>
  );
};
