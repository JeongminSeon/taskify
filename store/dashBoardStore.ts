import { Dashboard } from "@/types/dashboards";
import { getDashboards } from "@/utils/api/dashboardsApi";
import { create } from "zustand";

interface DashboardStore {
  dashboards: Dashboard[];
  cursorId: number;
  totalCount: number;
  setDashboards: () => Promise<void>;
  addDashboard: (dashboard: Dashboard) => void;
  //removeDashboard: (id: number) => void;
  //setDashboards: (dashboard: DashboardResponse) => void;
}

export const useDashBoardStore = create<DashboardStore>((set) => ({
  // 초기 상태
  dashboards: [],
  cursorId: 0,
  totalCount: 0,

  setDashboards: async () => {
    try {
      const data = await getDashboards(1, 20); // 대시보드 목록 api 요청
      set({
        dashboards: data.dashboards,
        cursorId: data.cursorId,
        totalCount: data.totalCount,
      });
      console.log("대시보드 업데이트됨:", useDashBoardStore.getState());
    } catch (error) {
      console.error("대시보드 가져오기 실패:", error);
    }
  },

  addDashboard: (dashboard: Dashboard) =>
    set((state) => ({
      dashboards: [...state.dashboards, dashboard],
    })),
}));
