import { Button } from "@/components/ui/button";
import { Gamepad2, PersonStanding, Terminal } from "lucide-react";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

const InfoIcons = ({
  setActiveTab,
  acitveTab,
}: {
  setActiveTab: Dispatch<
    SetStateAction<"personal" | "professional" | "hobbies">
  >;
  acitveTab: "personal" | "professional" | "hobbies";
}) => {
  return (
    <div className=" w-full h-full flex flex-col gap-8 items-center">
      <PersonStanding
        onClick={() => setActiveTab("personal")}
        size={30}
        className={` cursor-pointer hover:text-accent-foreground hover:bg-accent/90 p-1 rounded-sm transition-all duration-200 ${
          acitveTab === "personal" && "bg-accent text-accent-foreground"
        }`}
      />
      <Terminal
        onClick={() => setActiveTab("professional")}
        size={30}
        className={` cursor-pointer hover:text-accent-foreground hover:bg-accent/90 p-1 rounded-sm transition-all duration-200 ${
          acitveTab === "professional" && "bg-accent text-accent-foreground"
        }`}
      />
      <Gamepad2
        onClick={() => setActiveTab("hobbies")}
        size={30}
        className={` cursor-pointer hover:text-accent-foreground hover:bg-accent/90 p-1 rounded-sm transition-all duration-200 ${
          acitveTab === "hobbies" && "bg-accent text-accent-foreground"
        }`}
      />
    </div>
  );
};

export default InfoIcons;
