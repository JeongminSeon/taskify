import { DashboardDetailResponse } from "@/types/dashboards";
import axiosInstance from "./axiosInstance";

// 대시보드 상세 정보 가져오기
export const getDashboardDetail = async (
  dashboardId: number
): Promise<DashboardDetailResponse> => {
  try {
    const response = await axiosInstance.get<DashboardDetailResponse>(
      `/9-1/dashboards/${dashboardId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch dashboard detail:", error);
    throw error;
  }
};
