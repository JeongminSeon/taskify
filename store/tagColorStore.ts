import { create } from "zustand";

interface TagColorStore {
  tagColors: Record<string, Record<string, string>>;
  setTagColors: (dashboardId: string, colors: Record<string, string>) => void;
  getTagColors: (dashboardId: string) => Record<string, string>;
}

export const useTagColorStore = create<TagColorStore>((set, get) => ({
  tagColors: {},
  setTagColors: (dashboardId, colors) =>
    set((state) => ({
      tagColors: {
        ...state.tagColors,
        [dashboardId]: colors,
      },
    })),
  getTagColors: (dashboardId) => get().tagColors[dashboardId] || {},
}));
