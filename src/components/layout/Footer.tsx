import { Link } from "@/i18n/navigation";
import { Github, Instagram, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const Footer = () => {
  const t = useTranslations("footer");
  return (
    <section className=" w-full border-t flex items-center justify-stretch md:justify-between bg-transparent">
      <div className="flex items-center bg-transparent">
        <div className=" flex items-center justify-start px-6 py-4 border-r">
          {t("title")}
        </div>

        <ul className=" flex items-center justify-center">
          <Link href={t("linkedin-link")}>
            <li className=" border-r px-5 py-3 md:px-5 md:py-3">
              <Linkedin size={18} />
            </li>
          </Link>

          <Link href={t("instagram-link")}>
            <li className=" border-r px-5 py-3 md:px-5 md:py-3">
              <Instagram size={18} />
            </li>
          </Link>
        </ul>
      </div>
      <div className=" md:pr-8  bg-transparent flex items-center gap-2">
        <Link
          className=" flex items-center  md:gap-1.5  lg:border-l px-5 py-3 md:px-5 md:py-3"
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
