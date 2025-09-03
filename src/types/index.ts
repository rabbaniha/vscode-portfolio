import { ReactNode } from "react";

export type ActiveContentTabType =
  | "bio"
  | "interests"
  | "education"
  | "experienc"
  | "skills"
  | "hobbies"
  | null;

export type ContentTabStoreType = {
  activeContentTab: ActiveContentTabType;
  openTabs: ActiveContentTabType[];
  openTabsForFolders: ActiveContentTabType[];
  setActiveContentTab: (tab: ActiveContentTabType) => void;
  closeTab: (tab: ActiveContentTabType) => void;
  updateOpenTabs: (tabs: string[]) => void;
};

export interface Skill{
  name: string,
  icon: (props) => React.JSX.Element
}
