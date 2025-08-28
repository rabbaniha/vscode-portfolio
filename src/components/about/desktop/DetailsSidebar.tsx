import React from "react";
import PersonalTab from "./PersonalTab";

const DetailsSidebar = ({
  tab,
}: {
  tab: "personal" | "professional" | "hobbies";
}) => {
  return (
    <div className=" py-4">
      {tab === "personal" && <PersonalTab />}
      {tab === "professional" && <div>professional</div>}
      {tab === "hobbies" && <div>hobbies</div>}
    </div>
  );
};

export default DetailsSidebar;
