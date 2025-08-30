"use client";
import { useContentTabStore } from "@/stores";
import { ActiveContentTabType } from "@/types";
import React, { Dispatch, SetStateAction } from "react";

const DesktopContent = () => {
  const { activeContentTab } = useContentTabStore();
  return (
    <div className=" p-8 w-full h-full flex items-start justify-start bg-green-800">
      {activeContentTab === null ? (
        <div className=" w-full h-full flex items-center justify-center">
          No content to show
        </div>
      ) : (
        <>
          {activeContentTab === "bio" && <div>Bio</div>}
          {activeContentTab === "interests" && <div>Interests</div>}
          {activeContentTab === "education" && <div>Education</div>}
        </>
      )}
    </div>
  );
};

export default DesktopContent;
