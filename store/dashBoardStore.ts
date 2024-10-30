import { Dashboard } from "@/types/dashboards";
import { getDashboards } from "@/utils/api/dashboardsApi";
import { create } from "zustand";

interface DashboardStore {
  dashboards: Dashboard[];
  cursorId: number;
  totalCount: number;
  setDashboards: () => Promise<void>; // 대시보드를 가져오는 비동기 함수
  addDashboard: (dashboard: Dashboard) => void; // 대시보드를 추가하는 함수 (추후 생성하고 연동 필요)
  //removeDashboard: (id: number) => void;
}

// 대시보드 관련 상태 관리
export const useDashBoardStore = create<DashboardStore>((set) => ({
  // 초기 상태
  dashboards: [],
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
      console.log("대시보드 업데이트됨:", useDashBoardStore.getState());
    } catch (error) {
      console.error("대시보드 가져오기 실패:", error);
    }
  },

  // 대시보드를 추가하는 함수
  addDashboard: (dashboard: Dashboard) =>
    set((state) => ({
      dashboards: [...state.dashboards, dashboard],
    })),
}));
