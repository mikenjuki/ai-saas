import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const BotAvatar = () => {
  return (
    // set up Ai profile image and a fallback if image isn't available
    <Avatar className="h-8 w-8">
      <AvatarImage className="p-1" src="/logo.png" />
      <AvatarFallback>
        <p>Bot</p>
      </AvatarFallback>
    </Avatar>
  );
};

export default BotAvatar;
