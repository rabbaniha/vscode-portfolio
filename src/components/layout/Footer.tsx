"use client";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import React from "react";

const Footer = () => {
  const locale = useLocale();
  const t = useTranslations("footer");
  return (
    <section className=" w-full border-t flex items-center justify-stretch md:justify-between bg-transparent">
      <div className="flex items-center bg-transparent">
        <div
          className={`flex items-center justify-start px-6 py-4 ${
            locale === "en" ? "border-r" : "border-l"
          }`}
        >
          {t("title")}
        </div>

        <ul className=" flex items-center justify-center">
          <Link href={t("linkedin-link")}>
            <li
              className={`px-5 py-3 md:px-5 md:py-3 ${
                locale === "en" ? "border-r" : "border-l"
              }`}
            >
              <LinkedInIcon width={20} />
            </li>
          </Link>

          <Link href={t("instagram-link")}>
            <li
              className={`px-5 py-3 md:px-5 md:py-3 ${
                locale === "en" ? "border-r" : "border-l"
              }`}
            >
              <InstagramIcon width={20} />
            </li>
          </Link>
        </ul>
      </div>
      <div
        className={`bg-transparent flex items-center gap-2 ${
          locale === "en" ? "md:pr-8" : "md:pl-8"
        } `}
      >
        <Link
          className={`flex items-center  md:gap-1.5 px-5 py-3 md:px-5 md:py-3 ${
            locale === "en" ? "lg:border-l" : "lg:border-r"
          }`}
          href={"https://github.com/rabbaniha"}
        >
          <span className=" text-xs hidden md:block">@rabbaniha</span>
          <GitHubIcon width={20} />
        </Link>
      </div>
    </section>
  );
};

export default Footer;
