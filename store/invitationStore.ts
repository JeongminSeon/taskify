import { Invitation } from "@/types/dashboards";
import { getInvitations } from "@/utils/api/dashboardsApi";
import { create } from "zustand";

interface InvitationStore {
  dashboardId: number | null;
  setDashboardsId: (dashboardId: number) => void;
  totalCount: number;
  invitations: Invitation[];
  setInvitations: (invitations: Invitation[]) => void;
  addInvitation: (invitation: Invitation) => void;
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
      console.log("API로부터 받은 초대 목록:", res.invitations);
      set({
        invitations: res.invitations,
        totalCount: res.totalCount,
      });
      console.log("초대 목록 업데이트됨:", useInvitationStore.getState());
    } catch (error) {
      console.error("초대 목록을 불러오는 중 오류 발생:", error);
    }
  },

  // 새로운 초대를 기존 초대 목록에 추가
  addInvitation: (invitation) =>
    set((state) => ({
      invitations: [...state.invitations, invitation], // 현재 상태의 초대 목록에 새로운 초대를 추가
    })),
}));
