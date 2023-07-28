import React from "react";
import { UserButton } from "@clerk/nextjs";

import SidebarToggle from "@/components/SidebarToggle";

const Navbar = () => {
  return (
    <div className="flex items-center p-4">
      <SidebarToggle />

      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
