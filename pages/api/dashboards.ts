import { DashboardDetailResponse } from "@/types/dashboards";
import axiosInstance from "./axiosInstance";

const teamId = "9-1";

// 대시보드 목록 가져오기
export const fetchDashboards = async (page: number, size: number) => {
  try {
    const response = await axiosInstance.get<DashboardDetailResponse>(
      `/${teamId}/dashboards`,
      {
        params: {
          navigationMethod: "pagination",
          page,
          size,
        },
      }
    );
    return response.data.dashboards;
  } catch (error) {
    console.error("대시보드 목록을 가져오는 데 실패했습니다:", error);
    throw error;
  }
};

// 대시보드 상세 정보 가져오기
export const getDashboardDetail = async (
  dashboardId: number
): Promise<DashboardDetailResponse> => {
  try {
    const response = await axiosInstance.get<DashboardDetailResponse>(
      `/${teamId}/dashboards/${dashboardId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch dashboard detail:", error);
    throw error;
  }
};
