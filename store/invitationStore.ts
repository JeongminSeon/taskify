import { Invitation } from "@/types/dashboards";
import { getInvitations } from "@/utils/api/dashboardsApi";
import { create } from "zustand";

interface InvitationStore {
  dashboardId: number | null;
  setDashboardsId: (dashboardId: number) => void;
  totalCount: number;
  invitations: Invitation[];
  setInvitations: (invitations: Invitation[]) => void;
  loadInvitations: (
    dashboardId: number,
    currentPage: number,
    size: number
  ) => Promise<void>;
}
export const useInvitationStore = create<InvitationStore>((set) => ({
  dashboardId: null,
  setDashboardsId: (id: number | null) => set({ dashboardId: id }),
  invitations: [],
  totalCount: 0,

  // 주어진 초대 목록으로 상태를 업데이트
  setInvitations: (invitations: Invitation[]) => {
    set({ invitations });
  },

  loadInvitations: async (
    dashboardId: number,
    currentPage: number,
    size: number
  ) => {
    try {
      const res = await getInvitations(dashboardId, currentPage, size);
      set({
        dashboardId,
        invitations: res.invitations,
        totalCount: res.totalCount,
      });
    } catch (error) {
      throw error;
    }
  },
}));
