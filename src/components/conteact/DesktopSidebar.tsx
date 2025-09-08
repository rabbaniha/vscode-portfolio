"use client";
import React from "react";
import { useLocale, useTranslations } from "next-intl";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import ContactData from "./ContactData";
import SocialInfo from "./SocialInfo";

const DesktopSidebar = () => {
  const locale = useLocale();
  const t = useTranslations("contact");

  return (
    <div className={`col-span-2 ${locale === "en" ? "border-r" : "border-l"}`}>
      <div className="hidden lg:flex items-center gap-2  border-b px-2  py-4">
        <ArrowDropDownIcon />
        <p className=" text-md">{t("title")}</p>
      </div>
      <ContactData />
      <div className="hidden lg:flex items-center gap-2  border-b border-t px-2  py-4">
        <ArrowDropDownIcon />
        <p className=" text-md">{t("find-me.title")}</p>
      </div>
      <SocialInfo />
    </div>
  );
};

export default DesktopSidebar;
