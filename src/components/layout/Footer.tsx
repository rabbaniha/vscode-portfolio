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
    <section className="z-50 bg-transparent  w-full border-t flex items-center justify-stretch md:grid md:grid-cols-9 ">
      <div
        className={`flex items-center justify-center gap-8 bg-transparent md:col-span-3 lg:col-span-2 ${
          locale === "en" ? "md:border-r" : "md:border-l"
        }`}
      >
        <div className={` px-2 py-4 `}>{t("title")}</div>

        <Link href={t("linkedin-link")}>
          <span>
            <LinkedInIcon width={20} />
          </span>
        </Link>

        <Link href={t("instagram-link")} className=" pe-2">
          <span>
            <InstagramIcon width={20} />
          </span>
        </Link>
      </div>
      <div className=" md:col-span-4 lg:col-span-6"></div>
      <div
        className={`bg-transparent flex items-center  gap-2 md:col-span-2 lg:col-span-1 ${
          locale === "en" ? "md:pr-8" : "md:pl-8"
        } `}
      >
        <Link
          className={`flex items-center  md:gap-1.5 px-5 py-3 md:px-5 md:py-3 ${
            locale === "en" ? "md:border-l" : "md:border-r"
          }`}
          href={"https://github.com/rabbaniha"}
        >
          <span className=" text-xs hidden sm:block">@rabbaniha</span>
          <GitHubIcon width={20} />
        </Link>
      </div>
    </section>
  );
};

export default Footer;
