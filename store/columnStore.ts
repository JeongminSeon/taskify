import { create } from "zustand";

interface ColumnStore {
  columnId: number;
  setColumnId: (id: number) => void;
}
export const useColumnStore = create<ColumnStore>((set) => ({
  columnId: 0,

  setColumnId: (id: number) => {
    set({ columnId: id });
  },
}));
