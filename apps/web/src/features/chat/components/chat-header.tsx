import { Avatar, AvatarFallback } from "@chatify/ui";

interface ChatHeaderProps {
  firstName: string;
  lastName: string;
}

export const ChatHeader = ({ firstName, lastName }: ChatHeaderProps) => {
  const avatarFallback = `${firstName.at(0)}${lastName.at(0)}`;

  return (
    <div className="w-full border-b flex items-center gap-2 border-border p-4">
      <Avatar>
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <h1 className="text-xl font-semibold">
        {firstName} {lastName}
      </h1>
    </div>
  );
};
