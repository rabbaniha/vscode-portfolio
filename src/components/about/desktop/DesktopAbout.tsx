"use client";
import React, { useState } from "react";
import InfoIcons from "./InfoIcons";
import DetailsSidebar from "./DetailsSidebar";

const DesktopAbout = () => {
  const [activeTap, setActiveTab] = useState<
    "personal" | "professional" | "hobbies"
  >("personal");
  return (
    <section className=" hidden lg:flex h-full w-full">
      <div className=" h-full w-20 border-r py-4 px-1">
        <InfoIcons setActiveTab={setActiveTab} acitveTab={activeTap} />
      </div>
      <div className="h-full w-60 border-r">
        <DetailsSidebar tab={activeTap} />
      </div>
      <div className="h-full w-full">eight</div>
    </section>
  );
};

export default DesktopAbout;
