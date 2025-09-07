"use client";
import React from "react";
import { useContentTabStore } from "@/stores";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { easeOut, motion, AnimatePresence } from "framer-motion";

const MobileContent = () => {
  const t = useTranslations("about");
  const { activeContentTab, setActiveContentTab } = useContentTabStore();
  const parentTab =
    activeContentTab === "bio" ||
    activeContentTab === "education" ||
    activeContentTab === "interests"
      ? "personal"
      : activeContentTab === "experienc" || activeContentTab === "skills"
      ? "professional"
      : "hobbies";

  const itemVariants = {
    hidden: {
      opacity: 0.7,
      y: "100%",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  return (
    <AnimatePresence>
      {activeContentTab !== null && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={itemVariants}
          className=" fixed bg-background text-foreground inset-0 top-5  w-[95%] mx-auto h-[95vh] z-[999]  rounded-sm border-border p-8 overflow-y-auto scrollbar-hide"
        >
          <X
            className=" size-10 cursor-pointer transition-all absolute top-0 left-0 p-2  hover:text-destructive"
            onClick={() => setActiveContentTab(null)}
          />
          <p className=" text-justify">
            {t(`${parentTab}.${activeContentTab}.description`)}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileContent;
