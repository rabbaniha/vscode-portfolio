"use client";
import { useContentTabStore } from "@/stores";
import { ActiveContentTabType } from "@/types";
import React, { Dispatch, SetStateAction } from "react";

const DesktopContent = () => {
  const { activeContentTab } = useContentTabStore();
  return (
    <div>
      {activeContentTab === "bio" && <div>Bio</div>}
      {activeContentTab === "interests" && <div>Interests</div>}
      {activeContentTab === "education" && <div>Education</div>}
    </div>
  );
};

export default DesktopContent;
