"use client";

import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";

interface SidebarProps {
  apiLimiCount: number;
  isPro: boolean;
}

const SidebarToggle = ({ apiLimiCount = 0, isPro = false }: SidebarProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"ghost"} size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0">
        <Sidebar apiLimitCount={apiLimiCount} isPro={isPro} />
      </SheetContent>
    </Sheet>
  );
};

export default SidebarToggle;
