import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import React from "react";
import { ThemeSwitcher } from "../commom/ThemeSwitcher";
import LocaleSwitcher from "../commom/LocaleSwitcher";

const Header = () => {
  const t = useTranslations("navigation");
  return (
    <section className=" w-full border-b flex items-center justify-between bg-transparent">
      <div className="flex items-center bg-transparent">
        <div className=" flex items-center justify-start pl-8 pr-16 py-4 border-r">
          {t("name")}
        </div>

        <ul className=" flex items-center justify-center">
          <Link href={"/"}>
            <li className=" border-r px-7 py-4">{t("home")}</li>
          </Link>

          <Link href={"/about"}>
            <li className=" border-r px-7 py-4">{t("about")}</li>
          </Link>

          <Link href={"/project"}>
            <li className=" border-r px-7 py-4">{t("project")}</li>
          </Link>

          <Link href={"contact"}>
            <li className=" border-r px-7 py-4">{t("contact")}</li>
          </Link>
        </ul>
      </div>
      <div className=" pr-8 bg-transparent flex items-center gap-2">
        <ThemeSwitcher />
        <LocaleSwitcher />
      </div>
    </section>
  );
};

export default Header;
