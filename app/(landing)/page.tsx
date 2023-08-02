import { LandingContent } from "@/components/LandingContent";
import { LandingHero } from "@/components/LandingHero";
import { LandingNavbar } from "@/components/LandingNavbar";

import React from "react";

const LandingPage = () => {
  return (
    <main className="h-full ">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </main>
  );
};

export default LandingPage;
