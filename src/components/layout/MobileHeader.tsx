"use client";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Link, usePathname } from "@/i18n/navigation";
import { ThemeSwitcher } from "../commom/ThemeSwitcher";
import LocaleSwitcher from "../commom/LocaleSwitcher";

const MobileHeader = () => {
  const pathname = usePathname();
  const cleanPathname = pathname.replace(/^\/(en|fa|ar)/, "");

  const n = useTranslations("navigation");
  return (
    <nav className=" w-full border-b flex items-center justify-between bg-transparent lg:hidden px-5 py-3 md:px-5 md:py-3">
      <div className=" ">
        <p>{n("name")}</p>
      </div>
      <Sheet defaultOpen={false}>
        <SheetTrigger>
          <Menu size={24} />
        </SheetTrigger>
        <SheetContent className=" w-full">
          <SheetHeader className=" border-b-2">
            <SheetTitle className=" text-muted-foreground/70">
              {n("name")}
            </SheetTitle>
          </SheetHeader>
          <SheetTitle className=" flex items-center gap-2 px-4 py-2">
            <ThemeSwitcher />
            <LocaleSwitcher />
          </SheetTitle>
          <SheetTitle className="px-4 text-muted-foreground/70 pb-0 pt-3">
            {n("title")}
          </SheetTitle>
          <ul>
            <li
              className={` px-4 py-3 border-t-2 border-b-2 hover:bg-primary/90 transition-all duration-200
                 ${cleanPathname === "/" && "bg-primary"}`}
            >
              <Link href={"/"}>{n("home")}</Link>
            </li>
            <li
              className={` px-4 py-3  border-b-2 hover:bg-primary/90 transition-all duration-200
                 ${cleanPathname === "/about" && "bg-primary"}`}
            >
              <Link href={"/about"}>{n("about")}</Link>
            </li>
            <li
              className={` px-4 py-3  border-b-2 hover:bg-primary/90 transition-all duration-200
                 ${cleanPathname === "/project" && "bg-primary"}`}
            >
              <Link href={"/project"}>{n("project")}</Link>
            </li>
            <li
              className={` px-4 py-3  border-b-2 hover:bg-primary/90 transition-all duration-200
                 ${cleanPathname === "/contact" && "bg-primary"}`}
            >
              <Link href={"/contact"}>{n("contact")}</Link>
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileHeader;
