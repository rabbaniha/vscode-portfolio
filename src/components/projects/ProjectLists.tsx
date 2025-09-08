import { useTranslations } from "next-intl";
import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectLists = () => {
  const t = useTranslations("projects");
  return (
    <div className="p-8 flex flex-col lg:flex-row gap-8 overflow-y-auto lg:overflow-y-hidden lg:overflow-x-auto scrollbar-hide lg:max-h-[75vh] max-h-[83vh] lg:h-full lg:w-full">
      <ProjectCard
        title={t("mazraebaan.title")}
        link={t("mazraebaan.link")}
        description={t("mazraebaan.description")}
        technologies={t("mazraebaan.technologies").split(", ")}
        status={t("mazraebaan.status.state") as "active" | "in-active"}
        statusText={t("mazraebaan.status.text")}
      />
      <ProjectCard
        title={t("portfolio.title")}
        link={t("portfolio.link")}
        description={t("portfolio.description")}
        technologies={t("portfolio.technologies").split(", ")}
        status={t("portfolio.status.state") as "active" | "in-active"}
        statusText={t("portfolio.status.text")}
      />
    </div>
  );
};

export default ProjectLists;
