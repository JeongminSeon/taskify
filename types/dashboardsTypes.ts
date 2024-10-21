export interface Dashboard {
  id: number;
  title: string;
  color: string;
  createdAt: number;
  updatedAt: number;
  createdByMe: boolean;
  userId: number;
}

export interface DashboardResponse {
  dashboards: Dashboard[];
  totalCount: number;
  cursorId: number | null;
}

export interface InviteList {
  id: number;
  inviter: {
    id: number;
    email: string;
    nickname: string;
  };
  teamId: string;
  dashboard: {
    id: number;
    title: string;
  };
  invitee: {
    id: number;
    email: string;
    nickname: string;
  };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InviteListResponse {
  invitations: InviteList[];
  cursorId: number;
  nextCursor?: number; // 다음 페이지의 커서 ID (선택적)
  totalInvitations?: number; // 전체 초대 수 (선택적)
}
