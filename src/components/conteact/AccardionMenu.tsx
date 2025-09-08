"use client";
import React from "react";
import ArrowRight from "@mui/icons-material/ArrowRight";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useLocale, useTranslations } from "next-intl";
import ContactData from "./ContactData";
import SocialInfo from "./SocialInfo";

const AccardionMenu = () => {
  const locale = useLocale();
  const t = useTranslations("contact");
  return (
    <Accordion
      type="multiple"
      defaultValue={["contact", "social"] as string[]}
      className=" p-0 m-0 flex flex-col gap-2 "
    >
      <AccordionItem value="contact" className=" p-0 border-0 m-0">
        <AccordionTrigger className=" rounded-none group flex items-center w-full bg-popover text-popover-foreground px-4 justify-start gap-4">
          {locale === "en" ? (
            <ArrowRight className=" group-data-[state=open]:rotate-90 transition-all" />
          ) : (
            <ArrowLeft className=" group-data-[state=open]:rotate-90 transition-all" />
          )}
          {t("title")}
        </AccordionTrigger>
        <AccordionContent>
          <ContactData />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="social" className=" p-0 border-0 m-0">
        <AccordionTrigger className=" rounded-none group flex items-center w-full bg-popover text-popover-foreground px-4 justify-start gap-4">
          {locale === "en" ? (
            <ArrowRight className=" group-data-[state=open]:rotate-90 transition-all" />
          ) : (
            <ArrowLeft className=" group-data-[state=open]:rotate-90 transition-all" />
          )}
          {t("find-me.title")}
        </AccordionTrigger>
        <AccordionContent>
          <SocialInfo />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccardionMenu;
