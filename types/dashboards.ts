export type Dashboard = {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  createdByMe: boolean;
  updatedAt: string;
  userId: number;
};

export type DashboardDetailResponse = {
  cursorId: string;
  dashboards: Dashboard[];
  totalCount: number;
};
