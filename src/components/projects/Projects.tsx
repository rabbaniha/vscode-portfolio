import React from "react";
import ProjectsSkills from "./ProjectsSkills";
import ProjectLists from "./ProjectLists";

const Projects = () => {
  return (
    <div className=" flex flex-col lg:flex-row w-full h-full">
      {/* <ProjectsSkills /> */}
      <ProjectLists />
    </div>
  );
};

export default Projects;
