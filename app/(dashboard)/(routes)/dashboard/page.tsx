import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

const DashboardPage = () => {
  return (
    <>
      <div>
        <h1 className="">Dashboard Page (protected)</h1>

        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default DashboardPage;
