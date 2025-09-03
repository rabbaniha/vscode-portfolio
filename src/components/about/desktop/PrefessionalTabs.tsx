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

const PrefessionalTabs = () => {
  const locale = useLocale();
  const p = useTranslations("about.professional");
  const {
    setActiveContentTab,
    activeContentTab,
    openTabsForFolders,
    updateOpenTabs,
  } = useContentTabStore();

  return (
    <div>
      <div className="hidden lg:flex items-center gap-2  border-b px-2 h-8 pb-2">
        <ArrowDropDownIcon />
        <p className=" text-md">{p("title")}</p>
      </div>
      <div>
        <div>
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={openTabsForFolders as string[]}
            value={openTabsForFolders as string[]}
            onValueChange={updateOpenTabs}
          >
            <AccordionItem value="experienc" className="border-b-0 ">
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

                <p>{p("experienc.title")}</p>
              </AccordionTrigger>

              <AccordionContent
                className={`transition py-2 ${
                  locale === "en" ? "pl-14" : "pr-14"
                } ${activeContentTab === "experienc" && "bg-muted/60"}`}
                onClick={() => setActiveContentTab("experienc")}
              >
                <div className="flex items-center gap-4 cursor-pointer">
                  <File size={18} />
                  <p>{p("experienc.title")}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="skills" className="border-b-0 ">
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

                <p>{p("skills.title")}</p>
              </AccordionTrigger>

              <AccordionContent
                className={`transition py-2 ${
                  locale === "en" ? "pl-14" : "pr-14"
                } ${activeContentTab === "skills" && "bg-muted/60"}`}
                onClick={() => setActiveContentTab("skills")}
              >
                <div className="flex items-center gap-4 cursor-pointer">
                  <File size={18} />
                  <p>{p("skills.title")}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default PrefessionalTabs;
