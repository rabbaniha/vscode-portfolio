"use client";
import React from "react";
import AcardionMenu from "./AcardionMenu";
import { useTranslations } from "next-intl";

const MobileAbout = () => {
  const t = useTranslations("navigation");
  return (
    <div className=" flex flex-col lg:hidden w-full">
      <p className=" text-start px-4 py-4 border-b w-full">{t("about")}</p>
      <AcardionMenu />
    </div>
  );
};

export default MobileAbout;
