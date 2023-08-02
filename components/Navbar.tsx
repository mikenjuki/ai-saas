import React from "react";
import { UserButton } from "@clerk/nextjs";

import SidebarToggle from "@/components/SidebarToggle";
import { getApiLimitCount } from "@/lib/api-limit";

const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount();

  return (
    <div className="flex items-center p-4">
      <SidebarToggle apiLimiCount={apiLimitCount} />

      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
