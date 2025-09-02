import React from "react";
import PersonalTab from "./PersonalTab";
import PrefessionalTabs from "./PrefessionalTabs";
import HobbiesTab from "./HobbiesTab";

const DetailsSidebar = ({
  tab,
}: {
  tab: "personal" | "professional" | "hobbies";
}) => {
  return (
    <div className=" py-4">
      {tab === "personal" && <PersonalTab />}
      {tab === "professional" && <PrefessionalTabs />}
      {tab === "hobbies" && <HobbiesTab />}
    </div>
  );
};

export default DetailsSidebar;
