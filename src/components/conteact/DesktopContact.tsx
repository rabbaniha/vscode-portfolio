import React from "react";
import DesktopSidebar from "./DesktopSidebar";
import EmailForm from "./EmailForm";

const DesktopContact = () => {
  return (
    <div className=" hidden lg:grid lg:grid-cols-9 h-full w-full">
      <DesktopSidebar />
      <EmailForm />
    </div>
  );
};

export default DesktopContact;
