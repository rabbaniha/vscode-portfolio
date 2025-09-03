"use client";
import { useContentTabStore } from "@/stores";
import { useTranslations } from "next-intl";
import React from "react";

const MobileContent = () => {
  const t = useTranslations("about");
  const { activeContentTab } = useContentTabStore();
  const parentTab =
    activeContentTab === "bio" ||
    activeContentTab === "education" ||
    activeContentTab === "interests"
      ? "personal"
      : activeContentTab === "experienc" || activeContentTab === "skills"
      ? "prefessional"
      : "hobbies";
  return (
    <div className=" p-8 overflow-y-auto scrollbar-hide flex-1">
      <p className=" text-justify">
        {t(`${parentTab}.${activeContentTab}.description`)}
      </p>
    </div>
  );
};

export default MobileContent;
