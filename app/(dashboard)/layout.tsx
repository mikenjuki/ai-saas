import { FC } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

interface layoutProps {
  children: React.ReactNode;
}

const DashboardLayout: FC<layoutProps> = async ({ children }) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className="h-full relative mb-5 md:mb-10">
      <div className="hidden h-full md:w-72 md:flex md:flex-col md:fixed md:inset-y-0 bg-gray-900">
        <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      </div>

      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
