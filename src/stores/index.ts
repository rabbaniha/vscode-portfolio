import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ActiveContentTabType, ContentTabStoreType } from "@/types";

export const useContentTabStore = create<ContentTabStoreType>()(
  persist(
    (set) => ({
      activeContentTab: "bio",
      openTabs: ["bio"],
      openTabsForFolders: ["bio"],
      setActiveContentTab: (tab) =>
        set((state) => {
          if (!tab) return { activeContentTab: null };
          return {
            activeContentTab: tab,
            openTabs: state.openTabs.includes(tab)
              ? state.openTabs
              : [...state.openTabs, tab],
            openTabsForFolders: state.openTabsForFolders.includes(tab)
              ? state.openTabsForFolders
              : [...state.openTabsForFolders, tab],
          };
        }),
      closeTab: (tab) =>
        set((state) => {
          const newTabs = state.openTabs.filter((t) => t !== tab);
          return {
            openTabs: newTabs,
            openTabsForFolders: newTabs,
            activeContentTab:
              state.activeContentTab === tab
                ? newTabs.at(-1) ?? null
                : state.activeContentTab,
          };
        }),
      updateOpenTabs: (tabs) =>
        set({ openTabsForFolders: tabs as ActiveContentTabType[] }),
    }),

    { name: "content-tabs-storage" }
  )
);
