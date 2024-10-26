import {
  DashboardResponse,
  DashboardDetailResponse,
  MembersResponse,
} from "@/types/dashboards";
import axiosInstance from "./axiosInstanceApi";

// 대시보드 목록 가져오기
export const getDashboards = async (page: number, size: number) => {
  try {
    const response = await axiosInstance.get<DashboardResponse>(`/dashboards`, {
      params: {
        navigationMethod: "pagination",
        page,
        size,
      },
    });
    return response.data;
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
      `/dashboards/${dashboardId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch dashboard detail:", error);
    throw error;
  }
};

// 대시보드 맴버 정보 가져오기
export const getMembers = async (
  dashboardId: number,
  page: number = 1,
  size: number = 10
): Promise<MembersResponse> => {
  try {
    const response = await axiosInstance.get(
      `/members?page=${page}&size=${size}&dashboardId=${dashboardId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Members:", error);
    throw error;
  }
};
