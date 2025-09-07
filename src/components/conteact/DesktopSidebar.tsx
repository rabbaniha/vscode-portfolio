"use client";
import { useLocale } from "next-intl";
import React from "react";

const DesktopSidebar = () => {
  const locale = useLocale();
  return (
    <div className={`col-span-2 ${locale === "en" ? "border-r" : "border-l"}`}>
      DesktopSidebar
    </div>
  );
};

export default DesktopSidebar;
