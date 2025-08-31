"use client";
import React from "react";
import { useContentTabStore } from "@/stores";
import { useTranslations } from "next-intl";
import CodeLikeText from "@/components/commom/CodeLikeText";

const DesktopContent = () => {
  const { activeContentTab } = useContentTabStore();
  const t = useTranslations("about");

  return (
    <div className="p-8 w-full flex-1 min-h-0 flex items-start justify-start bg-gray-900">
      {activeContentTab === null ? (
        <div className="w-full h-full flex items-center justify-center">
          No content to show
        </div>
      ) : (
        <>
          {activeContentTab === "bio" && (
            <div className="w-full h-[58vh] overflow-y-auto space-y-2 scrollbar-vscode">
              <CodeLikeText text={t("personal.bio.description")} />
            </div>
          )}
          {activeContentTab === "interests" && <div>Interests</div>}
          {activeContentTab === "education" && <div>Education</div>}
        </>
      )}
    </div>
  );
};

export default DesktopContent;
