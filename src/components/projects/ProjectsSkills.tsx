"use client";
import { skillsList } from "@/data/skills";
import Checkbox from "@mui/material/Checkbox";
import { useLocale } from "next-intl";
import Image from "next/image";
import React from "react";

const ProjectsSkills = () => {
  const locale = useLocale();
  return (
    <div
      className={`w-[22%] py-4 px-4 h-full  ${
        locale === "en" ? "border-r" : "border-l"
      }`}
    >
      <div className=" h-[80%] overflow-y-auto scrollbar-hide">
        {skillsList.slice(0,0).map((skill, index) => {
          const Icon = skill.icon;
          return (
            <div key={index} className=" flex items-center gap-4">
              <Checkbox />
              <div className=" flex items-center gap-2">
                <Icon className=" size-6" stroke="#919191" />
                <p>{skill.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsSkills;
