import { create } from "zustand";

interface ColumnState {
  columnId: number;
  columnTitle: string;
  setColumnInfo: (columnId: number, columnTitle: string) => void;
}

export const useColumnStore = create<ColumnState>((set) => ({
  columnId: 0,
  columnTitle: "",
  setColumnInfo: (columnId: number, columnTitle: string) =>
    set({ columnId, columnTitle }),
}));
