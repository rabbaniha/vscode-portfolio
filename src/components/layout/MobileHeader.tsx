import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const MobileHeader = () => {
  const t = useTranslations("home.hero");
  return (
    <nav className=" w-full border-b flex items-center justify-between bg-transparent lg:hidden px-5 py-3 md:px-5 md:py-3">
      <div className=" ">
        <p>{t("name")}</p>
      </div>
      <Menu size={24} />
    </nav>
  );
};

export default MobileHeader;
