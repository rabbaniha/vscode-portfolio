"use client";
import React from "react";
import { easeOut, motion } from "framer-motion";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
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

const ContactData = () => {
  const t = useTranslations("contact");
  return (
    <div className=" flex flex-col gap-4 py-4 px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        className=" flex items-start gap-2"
      >
        <EmailIcon />
        <div>
          <a
            href="mailto:heydarrabbanuha@gmail.com"
            className=" w-3/4 text-wrap whitespace-pre-line"
          >
            {t("email").substring(0, 16)}
          </a>
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
        <a href="tel:+989196163235" dir="ltr">{t("phone")}</a>
      </motion.div>
    </div>
  );
};

export default ContactData;
