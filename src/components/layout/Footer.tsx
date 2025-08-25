"use client";
import { Link } from "@/i18n/navigation";
import { Github, Instagram, Linkedin } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
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
              <Linkedin size={18} />
            </li>
          </Link>

          <Link href={t("instagram-link")}>
            <li
              className={`px-5 py-3 md:px-5 md:py-3 ${
                locale === "en" ? "border-r" : "border-l"
              }`}
            >
              <Instagram size={18} />
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
          <Github size={18} />
        </Link>
      </div>
    </section>
  );
};

export default Footer;
