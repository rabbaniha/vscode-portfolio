"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronRight, File, Folder, FolderOpen } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useContentTabStore } from "@/stores";

const PersonalTab = () => {
  const locale = useLocale();
  const p = useTranslations("about.personal");
  const { setActiveContentTab, activeContentTab, openTabs } =
    useContentTabStore();

  return (
    <div>
      <div className=" flex items-center gap-2  border-b px-2 h-8 pb-2">
        <ArrowDropDownIcon />
        <p className=" text-md">{p("title")}</p>
      </div>
      <div>
        <div>
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={openTabs as string[]}
          >
            <AccordionItem value="bio" className="border-b-0 ">
              <AccordionTrigger
                className={`flex items-center justify-start gap-4  py-2 group ${
                  locale === "en" ? "pl-6" : "pr-6"
                }`}
              >
                {/* Chevron */}
                <ChevronRight
                  size={16}
                  className="transition-transform duration-200 group-data-[state=open]:rotate-90"
                />

                {/* Folder icons */}
                <Folder
                  size={18}
                  className="text-primary group-data-[state=open]:hidden"
                />
                <FolderOpen
                  size={18}
                  className="text-primary hidden group-data-[state=open]:block"
                />

                <p>{p("bio.title")}</p>
              </AccordionTrigger>

              <AccordionContent
                className={`transition py-2 ${
                  locale === "en" ? "pl-14" : "pr-14"
                } ${activeContentTab === "bio" && "bg-muted/60"}`}
                onClick={() => setActiveContentTab("bio")}
              >
                <div className="flex items-center gap-4 cursor-pointer">
                  <File size={18} />
                  <p>{p("bio.title")}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="interests" className="border-b-0 ">
              <AccordionTrigger
                className={`flex items-center justify-start gap-4  py-2 group ${
                  locale === "en" ? "pl-6" : "pr-6"
                }`}
              >
                {/* Chevron */}
                <ChevronRight
                  size={16}
                  className="transition-transform duration-200 group-data-[state=open]:rotate-90"
                />

                {/* Folder icons */}
                <Folder
                  size={18}
                  className="text-primary group-data-[state=open]:hidden"
                />
                <FolderOpen
                  size={18}
                  className="text-primary hidden group-data-[state=open]:block"
                />

                <p>{p("interests.title")}</p>
              </AccordionTrigger>

              <AccordionContent
                className={`transition py-2 ${
                  locale === "en" ? "pl-14" : "pr-14"
                } ${activeContentTab === "interests" && "bg-muted/60"}`}
                onClick={() => setActiveContentTab("interests")}
              >
                <div className="flex items-center gap-4 cursor-pointer">
                  <File size={18} />
                  <p>{p("interests.title")}</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="education" className="border-b-0 ">
              <AccordionTrigger
                className={`flex items-center justify-start gap-4  py-2 group ${
                  locale === "en" ? "pl-6" : "pr-6"
                }`}
              >
                {/* Chevron */}
                <ChevronRight
                  size={16}
                  className="transition-transform duration-200 group-data-[state=open]:rotate-90"
                />

                {/* Folder icons */}
                <Folder
                  size={18}
                  className="text-primary group-data-[state=open]:hidden"
                />
                <FolderOpen
                  size={18}
                  className="text-primary hidden group-data-[state=open]:block"
                />

                <p>{p("education.title")}</p>
              </AccordionTrigger>

              <AccordionContent
                className={`transition py-2 ${
                  locale === "en" ? "pl-14" : "pr-14"
                } ${activeContentTab === "education" && "bg-muted/60"}`}
                onClick={() => setActiveContentTab("education")}
              >
                <div className="flex items-center gap-4 cursor-pointer">
                  <File size={18} />
                  <p>{p("education.title")}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default PersonalTab;
