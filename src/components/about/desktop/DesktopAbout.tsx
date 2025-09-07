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
    <section className=" hidden lg:grid lg:grid-cols-9 h-full w-full">
      <div className=" col-span-2 flex">
        <div
          className={`h-full w-[20%]  py-4 px-1 ${
            locale === "en" ? "border-r" : "border-l"
          }`}
        >
          <InfoIcons
            setActiveTab={setActiveSideTab}
            acitveTab={activeSideTap}
          />
        </div>
        <div className={`h-full w-[80%]  ${locale === "en" ? "border-r" : "border-l"}`}>
          <DetailsSidebar tab={activeSideTap} />
        </div>
      </div>
      <div className="h-full w-[78%] flex flex-col col-span-7">
        <div className=" w-full ">
          <DesktopTabar />
        </div>
        <DesktopContent />
      </div>
    </section>
  );
};

export default DesktopAbout;
