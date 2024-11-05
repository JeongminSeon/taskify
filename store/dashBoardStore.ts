import {
  ColoumnsParams,
  Columns,
  ColumnsCreateParams,
  ColumnsResponse,
} from "@/types/columns";
import { Dashboard } from "@/types/dashboards";
import { createColumn, getColumns } from "@/utils/api/columnsApi";
import { getDashboards } from "@/utils/api/dashboardsApi";
import { create } from "zustand";

interface DashboardStore {
  dashboards: Dashboard[];
  dashboardId: number;
  columns: Columns[];
  loading: boolean;
  error: string | null;
  cursorId: number;
  totalCount: number;

  setDashboards: () => Promise<void>; // 대시보드를 가져오는 비동기 함수
  setDashboardId: (id: number) => void;
  addDashboard: (dashboard: Dashboard) => void; // 대시보드를 추가하는 함수

  // 컬럼 관련 액션
  fetchColumns: (dashboardId: number) => Promise<void>;
  addColumn: (title: string, dashboardId: number) => Promise<void>;
  setColumns: (columns: Columns[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// 대시보드 관련 상태 관리
export const useDashBoardStore = create<DashboardStore>((set, get) => ({
  // 초기 상태
  dashboards: [],
  dashboardId: 0,
  columns: [],
  loading: false,
  error: null,
  cursorId: 0,
  totalCount: 0,

  // 대시보드를 설정하는 비동기 함수
  setDashboards: async () => {
    try {
      const data = await getDashboards(1, 20);
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

  // 컬럼 목록 조회
  fetchColumns: async (dashboardId: number) => {
    set({ loading: true });
    try {
      const params: ColoumnsParams = { dashboardId };
      const response: ColumnsResponse = await getColumns(params);
      set({ columns: response.data, error: null });
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // 컬럼 생성
  addColumn: async (title: string, dashboardId: number) => {
    try {
      const params: ColumnsCreateParams = { title, dashboardId };
      const newColumn = await createColumn(params);
      if (newColumn) {
        // 새로운 컬럼을 기존 상태에 추가합니다.
        set((state) => ({
          columns: [...state.columns, ...newColumn.data],
        }));
      }
      get().fetchColumns(dashboardId);
    } catch (error) {
      throw error;
    }
  },

  setColumns: (columns: Columns[]) => set({ columns }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
}));
