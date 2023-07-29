import { FC } from "react";
import Image from "next/image";

interface LoaderProps {}

const Loader: FC<LoaderProps> = ({}) => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <Image alt="Logo" src="/logo.png" fill />
      </div>
      <p className="text-sm text-muted-foreground">Thinking...</p>
    </div>
  );
};

export default Loader;
