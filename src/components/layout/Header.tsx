"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef } from "react";
import { ThemeSwitcher } from "../commom/ThemeSwitcher";
import LocaleSwitcher from "../commom/LocaleSwitcher";

const Header = () => {
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const cleanPathname = pathname.replace(/^\/(en|fa|ar)/, "");
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    // مقدار قبلی رو ذخیره می‌کنیم
    previousPath.current = cleanPathname;
  }, [cleanPathname]);

  return (
    <section className=" w-full border-b  items-center justify-between bg-transparent hidden lg:flex">
      <div className="flex items-center bg-transparent">
        <div className=" flex items-center justify-start pl-8 pr-16 py-4 border-r w-64">
          {t("name")}
        </div>

        <ul className=" flex items-center justify-center ">
          <Link href={"/"} className=" relative">
            <li className=" border-r px-7 py-4">{t("home")}</li>
            <div
              className={`absolute h-2 bottom-0 right-0 left-0 bg-primary  ${
                cleanPathname === "/" ? "visible" : "hidden"
              } ${
                previousPath.current === "/about"
                  ? "animate-entry-right-100"
                  : previousPath.current === "/project"
                  ? "animate-entry-right-200"
                  : previousPath.current === "/contact"
                  ? "animate-entry-right-300"
                  : ""
              }`}
            ></div>
          </Link>

          <Link href={"/about"} className=" relative">
            <li className=" border-r px-7 py-4">{t("about")}</li>
            <div
              className={`absolute h-2 bottom-0 right-0 left-0 bg-primary  ${
                cleanPathname === "/about" ? "visible" : "hidden"
              } ${
                previousPath.current === "/"
                  ? "animate-entry-left-100"
                  : previousPath.current === "/project"
                  ? "animate-entry-right-100"
                  : previousPath.current === "/contact"
                  ? "animate-entry-right-200"
                  : ""
              }`}
            ></div>
          </Link>

          <Link href={"/project"} className=" relative">
            <li className=" border-r px-7 py-4">{t("project")}</li>
            <div
              className={`absolute h-2 bottom-0 right-0 left-0 bg-primary ${
                cleanPathname === "/project" ? "visible" : "hidden"
              }  ${
                previousPath.current === "/"
                  ? "animate-entry-left-200"
                  : previousPath.current === "/about"
                  ? "animate-entry-left-100"
                  : previousPath.current === "/contact"
                  ? "animate-entry-right-100"
                  : ""
              }`}
            ></div>
          </Link>

          <Link href={"contact"} className=" relative">
            <li className=" border-r px-7 py-4">{t("contact")}</li>
            <div
              className={`absolute h-2 bottom-0 right-0 left-0 bg-primary ${
                cleanPathname === "/contact" ? "visible" : "hidden"
              } ${
                previousPath.current === "/"
                  ? "animate-entry-left-300"
                  : previousPath.current === "/about"
                  ? "animate-entry-left-200"
                  : previousPath.current === "/project"
                  ? "animate-entry-left-100"
                  : ""
              }`}
            ></div>
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
