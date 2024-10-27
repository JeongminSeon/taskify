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

export type CreateDashboardResponse = {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
};

export interface MemberProps {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  isOwner?: boolean;
}
export interface MembersResponse {
  members: MemberProps[];
  totalCount: number;
}

export interface TodoFormProps {
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate: Date | null;
  tags: {
    text: string;
    id: number;
  }[];
  imageUrl: File[] | null;
}

export interface TodoModalProps {
  columnId: number;
  isOpen?: boolean;
  onClose: () => void;
  data?: TodoFormProps;
}
