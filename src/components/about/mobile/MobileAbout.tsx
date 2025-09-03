"use client";
import React from "react";
import AcardionMenu from "./AcardionMenu";
import { useTranslations } from "next-intl";
import MobileContent from "./MobileContent";

const MobileAbout = () => {
  const t = useTranslations("navigation");

  return (
    <div className=" flex flex-col lg:hidden w-full h-[85%]">
      <p className=" text-start px-4 py-4 border-b w-full">{t("about")}</p>
      <AcardionMenu />
      <MobileContent />
    </div>
  );
};

export default MobileAbout;
