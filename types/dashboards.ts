import { CardResponse } from "./cards";

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
  cursorId: number;
  totalCount: number;
  dashboards: Dashboard[];
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

export type CreateDashboardResponse = {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
};

export interface Member {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}

export interface MembersResponse {
  members: Member[];
  totalCount: number;
}

export interface TodoFormProps {
  dashboardId?: number;
  columnId: number;
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}

export interface TodoModalProps {
  cardId?: number;
  columnId?: number;
  isOpen?: boolean;
  onClose: () => void;
  dashboardId?: number;
  onUpdateCard?: (card: CardResponse) => void;
  onCreateCard?: (card: CardResponse) => void;
}
