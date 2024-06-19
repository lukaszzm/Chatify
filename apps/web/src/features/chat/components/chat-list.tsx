import { ErrorAlert } from "@/components/errors/error-alert";
import { ChatPreview } from "@/features/chat/components/chat-preview";
import { ChatListSkeleton } from "@/features/chat/components/skeletons/chat-list-loading";
import { useRecentChats } from "@/features/chat/hooks/use-recent-chats";
import { formatDate } from "@/utils/format-date";

export const ChatList = () => {
  const [result] = useRecentChats();
  const { data, fetching, error } = result;

  if (fetching) {
    return <ChatListSkeleton />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  return (
    <ul className="space-y-2">
      {data ? (
        data.recentChats.map(({ id, recentMessage }) => (
          <li key={id}>
            <ChatPreview
              id={id}
              createdAt={formatDate(recentMessage.createdAt)}
              firstName={recentMessage.sender.firstName}
              lastName={recentMessage.sender.lastName}
              message={recentMessage.content}
            />
          </li>
        ))
      ) : (
        <p>No chats</p>
      )}
    </ul>
  );
};
