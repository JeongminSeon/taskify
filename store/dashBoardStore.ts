import { Dashboard } from "@/types/dashboards";
import { getDashboards } from "@/utils/api/dashboardsApi";
import { create } from "zustand";

interface DashboardStore {
  dashboards: Dashboard[];
  dashboardId: number;
  cursorId: number;
  totalCount: number;
  setDashboards: () => Promise<void>; // 대시보드를 가져오는 비동기 함수
  setDashboardId: (id: number) => void;
  addDashboard: (dashboard: Dashboard) => void; // 대시보드를 추가하는 함수
}

// 대시보드 관련 상태 관리
export const useDashBoardStore = create<DashboardStore>((set) => ({
  // 초기 상태
  dashboards: [],
  dashboardId: 0,
  cursorId: 0,
  totalCount: 0,

  // 대시보드를 설정하는 비동기 함수
  setDashboards: async () => {
    try {
      const data = await getDashboards(1, 20); // 대시보드 목록 api 요청
      set({
        dashboards: data.dashboards,
        cursorId: data.cursorId,
        totalCount: data.totalCount,
      });
    } catch (error) {
      throw error;
    }
  },

  // 대시보드를 추가하는 함수
  addDashboard: (dashboard: Dashboard) =>
    set((state) => ({
      dashboards: [...state.dashboards, dashboard],
    })),

  // 대시보드 ID를 설정하는 함수
  setDashboardId: (id: number) => set({ dashboardId: id }),
}));
