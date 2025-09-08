"use client";

import React from "react";
import { easeOut, motion } from "framer-motion";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "@/i18n/navigation";
import { SquareArrowOutUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

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

const SocialInfo = () => {
  const t = useTranslations("contact");

  return (
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
  );
};

export default SocialInfo;
