import {
  DashboardResponse,
  DashboardDetailResponse,
  InvitationsResponse,
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

// 대시보드 업데이트
export const updateDashboard = async (
  dashboardId: number,
  title: string,
  color: string
): Promise<DashboardDetailResponse> => {
  const requestBody = {
    title,
    color,
  };

  try {
    const response = await axiosInstance.put<DashboardDetailResponse>(
      `/dashboards/${dashboardId}`,
      requestBody
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update dashboard:", error);
    throw error;
  }
};

// 대시보드 삭제
export const deleteDashboard = async (dashboardId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/dashboards/${dashboardId}`);
  } catch (error) {
    console.error("Failed to fetch dashboard detail:", error);
    throw error;
  }
};

// 대시보드 초대 목록 불러오기 함수
export const getInvitations = async (
  dashboardId: number,
  page: number,
  size: number
): Promise<InvitationsResponse> => {
  try {
    const response = await axiosInstance.get<InvitationsResponse>(
      `/dashboards/${dashboardId}/invitations`,
      {
        params: {
          page,
          size,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("초대 목록을 가져오는 데 실패했습니다:", error);
    throw error;
  }
};
