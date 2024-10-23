export type DashboardDetailResponse = {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  createdByMe: boolean;
};

export type Dashboard = {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
};

export type DashboardResponse = {
  cursorId: string;
  dashboards: Dashboard[];
  totalCount: number;
};

interface Inviter {
  id: number;
  email: string;
  nickname: string;
}

interface Invitee {
  id: number;
  email: string;
  nickname: string;
}

export interface Invitation {
  id: number;
  inviter: Inviter;
  teamId: string;
  dashboard: Dashboard;
  invitee: Invitee;
  inviteAccepted: boolean | null;
  createdAt: string;
  updatedAt: string;
}

export interface InvitationsResponse {
  invitations: Invitation[];
  totalCount: number;
}
