import DesktopContact from "@/components/conteact/DesktopContact";
import MobileContact from "@/components/conteact/MobileContact";
import React from "react";

const ContactPage = () => {
  return (
    <div className=" w-full h-full">
      <DesktopContact />
      <MobileContact />
    </div>
  );
};

export default ContactPage;
