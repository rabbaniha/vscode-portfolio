import React from "react";
import DesktopSidebar from "./DesktopSidebar";
import EmailForm from "./EmailForm";
import CodeSnippet from "./CodeSnippet";

const DesktopContact = () => {
  return (
    <div className=" hidden lg:grid lg:grid-cols-9 h-full w-full">
      <DesktopSidebar />
      <EmailForm />
      <CodeSnippet />
    </div>
  );
};

export default DesktopContact;
