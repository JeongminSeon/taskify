import { Dashboard, DashboardResponse } from "@/types/dashboards";
import { create } from "zustand";

interface DashboardStore {
  dashboards: Dashboard[];
  cursorId: number;
  totalCount: number;
  addDashboard: (dashboard: Dashboard) => void;
  //removeDashboard: (id: number) => void;
  setDashboards: (dashboard: DashboardResponse) => void;
}

export const useDashDetailStore = create<DashboardStore>((set) => ({
  dashboards: [],
  cursorId: 0,
  totalCount: 0,
  addDashboard: (dashboard: Dashboard) =>
    set((state) => ({
      dashboards: [...state.dashboards, dashboard],
    })),
  setDashboards: (dashboard: DashboardResponse) => {
    console.log("dashboard 호출됨:", dashboard);
    set({
      dashboards: dashboard.dashboards,
      cursorId: dashboard.cursorId,
      totalCount: dashboard.totalCount,
    });
    console.log("dashboard 업데이트됨:", useDashDetailStore.getState());
  },
}));
