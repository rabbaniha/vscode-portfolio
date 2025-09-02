"use client";
import { useContentTabStore } from "@/stores";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const DesktopTabbar = () => {
  const locale = useLocale();
  const t = useTranslations();
  const { openTabs, activeContentTab, setActiveContentTab, closeTab } =
    useContentTabStore();

  return (
    <>
      {activeContentTab !== null && (
        <div className="max-w-full h-12  border-b flex items-center overflow-x-auto whitespace-nowrap scrollbar-hide">
          {openTabs.map((tab) => (
            <div
              key={tab}
              className={` px-4 py-0 h-full  flex items-center gap-20 transition ${
                activeContentTab === tab ? "bg-muted" : ""
              } ${locale === "en" ? "border-r" : "border-l"}`}
            >
              <span
                className="cursor-pointer text-sm"
                onClick={() => setActiveContentTab(tab)}
              >
                {tab}
              </span>
              <button
                onClick={() => closeTab(tab)}
                className="cursor-pointer text-muted-foreground hover:text-muted-foreground/80 transition-all"
              >
                <CloseIcon style={{ width: "15px", height: "15px" }} />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DesktopTabbar;
