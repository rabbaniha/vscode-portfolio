import React from "react";
import AccardionMenu from "./AccardionMenu";
import EmailForm from "./EmailForm";

const MobileContact = () => {
  return (
    <div className=" flex flex-col  gap-4 lg:hidden max-h-[83vh] overflow-y-auto scrollbar-hide">
      <AccardionMenu />
      <EmailForm />
    </div>
  );
};

export default MobileContact;
