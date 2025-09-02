import DesktopAbout from "@/components/about/desktop/DesktopAbout";
import MobileAbout from "@/components/about/mobile/MobileAbout";
import React from "react";

const Aboutpage = () => {
  return (
    <main className=" h-full w-full">
      <DesktopAbout />
      <MobileAbout />
    </main>
  );
};

export default Aboutpage;
