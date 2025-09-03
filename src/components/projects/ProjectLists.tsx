import { useTranslations } from "next-intl";
import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectLists = () => {
  const t = useTranslations("projects");
  return (
    <div className=" p-8 grid grid-cols-3  gap-8">
      <ProjectCard
        title={t("mazraebaan.title")}
        link={t("mazraebaan.link")}
        description={t("mazraebaan.description")}
        technologies={t("mazraebaan.technologies").split(", ")}
      />
      <ProjectCard
        title={t("portfolio.title")}
        link={t("portfolio.link")}
        description={t("portfolio.description")}
        technologies={t("portfolio.technologies").split(", ")}
      />
    </div>
  );
};

export default ProjectLists;
