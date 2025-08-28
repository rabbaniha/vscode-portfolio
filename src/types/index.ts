export type ActiveContentTabType = "bio" | "interests" | "education" | null;

export type ContentTabStoreType = {
  activeContentTab: ActiveContentTabType;
  openTabs: ActiveContentTabType[];
  setActiveContentTab: (tab: ActiveContentTabType) => void;
  closeTab: (tab: ActiveContentTabType) => void;
};
