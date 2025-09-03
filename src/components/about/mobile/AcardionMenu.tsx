"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLocale, useTranslations } from "next-intl";
import ArrowRight from "@mui/icons-material/ArrowRight";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import PersonalTab from "../desktop/PersonalTab";
import PrefessionalTabs from "../desktop/PrefessionalTabs";
import HobbiesTab from "../desktop/HobbiesTab";

const AcardionMenu = () => {
  const locale = useLocale();
  const t = useTranslations("about");
  return (
    <div>
      <Accordion
        type="multiple"
        defaultValue={["personal"] as string[]}
        className=" p-0 m-0 flex flex-col gap-2"
      >
        <AccordionItem value="personal" className=" p-0 border-0 m-0">
          <AccordionTrigger className=" rounded-none group flex items-center w-full bg-popover text-popover-foreground px-4 justify-start gap-4">
            {locale === "en" ? (
              <ArrowRight className=" group-data-[state=open]:rotate-90 transition-all" />
            ) : (
              <ArrowLeft className=" group-data-[state=open]:rotate-90 transition-all" />
            )}
            {t("personal.title")}
          </AccordionTrigger>
          <AccordionContent>
            <PersonalTab />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="professional" className=" p-0 border-0 m-0">
          <AccordionTrigger className=" rounded-none group flex items-center w-full bg-popover text-popover-foreground px-4 justify-start gap-4">
            {locale === "en" ? (
              <ArrowRight className=" group-data-[state=open]:rotate-90 transition-all" />
            ) : (
              <ArrowLeft className=" group-data-[state=open]:rotate-90 transition-all" />
            )}
            {t("professional.title")}
          </AccordionTrigger>
          <AccordionContent>
            <PrefessionalTabs />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="hobbies" className=" p-0 border-0 m-0">
          <AccordionTrigger className=" rounded-none group flex items-center w-full bg-popover text-popover-foreground px-4 justify-start gap-4">
            {locale === "en" ? (
              <ArrowRight className=" group-data-[state=open]:rotate-90 transition-all" />
            ) : (
              <ArrowLeft className=" group-data-[state=open]:rotate-90 transition-all" />
            )}
            {t("hobbies.title")}
          </AccordionTrigger>
          <AccordionContent>
            <HobbiesTab />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AcardionMenu;
