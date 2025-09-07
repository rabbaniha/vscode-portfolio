"use client";
import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { easeOut, motion } from "framer-motion";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

import { Link } from "@/i18n/navigation";
import { SquareArrowOutUpRight } from "lucide-react";

const DesktopSidebar = () => {
  const locale = useLocale();
  const t = useTranslations("contact");

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: easeOut,
      },
    },
  };
  return (
    <div className={`col-span-2 ${locale === "en" ? "border-r" : "border-l"}`}>
      <div className="hidden lg:flex items-center gap-2  border-b px-2  py-4">
        <ArrowDropDownIcon />
        <p className=" text-md">{t("title")}</p>
      </div>
      <div className=" flex flex-col gap-4 py-4 px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className=" flex items-start gap-2"
        >
          <EmailIcon />
          <div>
            <p className=" w-3/4 text-wrap whitespace-pre-line">
              {t("email").substring(0, 16)}
            </p>
            <p className=" ms-2">{t("email").substring(16)}</p>
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className=" flex items-center gap-2"
        >
          <PhoneIcon />
          <p>{t("phone")}</p>
        </motion.div>
      </div>
      <div className="hidden lg:flex items-center gap-2  border-b border-t px-2  py-4">
        <ArrowDropDownIcon />
        <p className=" text-md">{t("find-me.title")}</p>
      </div>
      <div className="flex flex-col gap-4 py-4 px-4">
        <motion.div initial="hidden" animate="visible" variants={itemVariants}>
          <Link href={""} className=" flex items-center gap-2">
            <SquareArrowOutUpRight className=" text-muted-foreground size-4 me-2" />

            <YouTubeIcon />
            <p>{t("find-me.youtube")}</p>
          </Link>
        </motion.div>
        <motion.div initial="hidden" animate="visible" variants={itemVariants}>
          <Link href={""} className=" flex items-center gap-2">
            <SquareArrowOutUpRight className=" text-muted-foreground size-4 me-2" />

            <InstagramIcon />
            <p>{t("find-me.instagram")}</p>
          </Link>
        </motion.div>
        <motion.div initial="hidden" animate="visible" variants={itemVariants}>
          <Link href={""} className=" flex items-center gap-2">
            <SquareArrowOutUpRight className=" text-muted-foreground size-4 me-2" />

            <GitHubIcon />
            <p>{t("find-me.github")}</p>
          </Link>
        </motion.div>
        <motion.div initial="hidden" animate="visible" variants={itemVariants}>
          <Link href={""} className=" flex items-center gap-2">
            <SquareArrowOutUpRight className=" text-muted-foreground size-4 me-2" />

            <LinkedInIcon />
            <p>{t("find-me.linkedin")}</p>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
