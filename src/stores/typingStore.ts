// stores/typingStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TypingState {
  typedTexts: Set<string>;
  markAsTyped: (key: string) => void;
  hasBeenTyped: (key: string) => boolean;
  resetTyping: () => void;
  resetSpecificText: (key: string) => void;
}

export const useTypingStore = create<TypingState>()(
  persist(
    (set, get) => ({
      typedTexts: new Set<string>(),

      markAsTyped: (key: string) => {
        set((state) => ({
          typedTexts: new Set([...state.typedTexts, key]),
        }));
      },

      hasBeenTyped: (key: string) => {
        return get().typedTexts.has(key);
      },

      resetTyping: () => {
        set({ typedTexts: new Set() });
      },

      resetSpecificText: (key: string) => {
        set((state) => {
          const newSet = new Set(state.typedTexts);
          newSet.delete(key);
          return { typedTexts: newSet };
        });
      },
    }),
    {
      name: "typing-storage",
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name);
          if (!str) return null;
          const parsed = JSON.parse(str);
          return {
            ...parsed,
            state: {
              ...parsed.state,
              typedTexts: new Set(parsed.state.typedTexts || []),
            },
          };
        },
        setItem: (name, value) => {
          const serialized = JSON.stringify({
            ...value,
            state: {
              ...value.state,
              typedTexts: Array.from(value.state.typedTexts),
            },
          });
          sessionStorage.setItem(name, serialized);
        },
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    }
  )
);
