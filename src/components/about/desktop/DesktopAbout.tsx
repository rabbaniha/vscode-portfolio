"use client";
import React, { useState } from "react";
import InfoIcons from "./InfoIcons";
import DetailsSidebar from "./DetailsSidebar";
import { useLocale } from "next-intl";
import DesktopContent from "./DesktopContent";
import { ActiveContentTabType } from "@/types";
import DesktopTabar from "./DesktopTabar";

const DesktopAbout = () => {
  const locale = useLocale();
  const [activeSideTap, setActiveSideTab] = useState<
    "personal" | "professional" | "hobbies"
  >("personal");

  return (
    <section className=" hidden lg:flex h-full w-full">
      <div
        className={`h-full w-[5%] py-4 px-1 ${
          locale === "en" ? "border-r" : "border-lu"
        }`}
      >
        <InfoIcons setActiveTab={setActiveSideTab} acitveTab={activeSideTap} />
      </div>
      <div
        className={`h-full w-[17%] ${
          locale === "en" ? "border-r" : "border-l"
        }`}
      >
        <DetailsSidebar tab={activeSideTap} />
      </div>
      <div className="h-full w-[78%] flex flex-col">
        <div className=" w-full ">
          <DesktopTabar />
        </div>
        <DesktopContent />
      </div>
    </section>
  );
};

export default DesktopAbout;
