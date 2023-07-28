import { FC } from "react";

interface layoutProps {
  children: React.ReactNode;
}

const AuthLayout: FC<layoutProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-screen">{children}</div>
  );
};

export default AuthLayout;
