import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ContentTabStoreType } from "@/types";

export const useContentTabStore = create<ContentTabStoreType>()(
  persist(
    (set) => ({
      activeContentTab: null,
      openTabs: [],
      setActiveContentTab: (tab) =>
        set((state) => {
          if (!tab) return { activeContentTab: null };
          return {
            activeContentTab: tab,
            openTabs: state.openTabs.includes(tab)
              ? state.openTabs
              : [...state.openTabs, tab],
          };
        }),
      closeTab: (tab) =>
        set((state) => {
          const newTabs = state.openTabs.filter((t) => t !== tab);
          return {
            openTabs: newTabs,
            activeContentTab:
              state.activeContentTab === tab
                ? newTabs.at(-1) ?? null
                : state.activeContentTab,
          };
        }),
    }),
    { name: "content-tabs-storage" }
  )
);
