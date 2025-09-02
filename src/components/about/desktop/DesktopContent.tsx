"use client";
import React from "react";
import { motion } from "framer-motion";
import { useContentTabStore } from "@/stores";
import { useTranslations } from "next-intl";
import CodeLikeText from "@/components/commom/CodeLikeText";

const DesktopContent = () => {
  const { activeContentTab } = useContentTabStore();
  const t = useTranslations("about");

  return (
    <div className="p-8 w-full flex-1 min-h-0 flex items-start justify-start ">
      {activeContentTab === null ? (
        <div className="w-full h-full flex items-center justify-center">
          No content to show
        </div>
      ) : (
        <>
          {activeContentTab === "bio" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0, duration: 0.5 }}
              className="w-full h-[58vh] overflow-y-auto space-y-2 scrollbar-vscode"
            >
              <CodeLikeText
                text={t("personal.bio.description")}
                uniqueKey={"about-bio"}
              />
            </motion.div>
          )}
          {activeContentTab === "interests" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0, duration: 0.5 }}
              className="w-full h-[58vh] overflow-y-auto space-y-2 scrollbar-vscode"
            >
              <CodeLikeText
                text={t("personal.interests.description")}
                uniqueKey={"about-interests"}
              />
            </motion.div>
          )}
          {activeContentTab === "education" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0, duration: 0.5 }}
              className="w-full h-[58vh] overflow-y-auto space-y-2 scrollbar-vscode"
            >
              <CodeLikeText
                text={t("personal.education.description")}
                uniqueKey={"about-education"}
              />
            </motion.div>
          )}
          {activeContentTab === "experienc" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0, duration: 0.5 }}
              className="w-full h-[58vh] overflow-y-auto space-y-2 scrollbar-vscode"
            >
              <CodeLikeText
                text={t("professional.experienc.description")}
                uniqueKey={"about-experienc"}
              />
            </motion.div>
          )}
          {activeContentTab === "skills" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0, duration: 0.5 }}
              className="w-full h-[58vh] overflow-y-auto space-y-2 scrollbar-vscode"
            >
              <CodeLikeText
                text={t("professional.skills.description")}
                uniqueKey={"about-skills"}
              />
            </motion.div>
          )}
          {activeContentTab === "hobbies" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0, duration: 0.5 }}
              className="w-full h-[58vh] overflow-y-auto space-y-2 scrollbar-vscode"
            >
              <CodeLikeText
                text={t("hobbies.hobbies.description")}
                uniqueKey={"about-hobbies"}
              />
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default DesktopContent;
