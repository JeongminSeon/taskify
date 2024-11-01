import {
  DashboardResponse,
  DashboardDetailResponse,
  InvitationsResponse,
  MembersResponse,
  CreateDashboardResponse,
  Invitation,
} from "@/types/dashboards";
import axiosInstance from "./axiosInstanceApi";
import axios, { AxiosError } from "axios";
import { onError } from "./error";

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

// 대시보드 생성하기
export const createDashboard = async (
  title: string,
  color: string
): Promise<CreateDashboardResponse> => {
  const formData = {
    title,
    color,
  };
  try {
    const response = await axiosInstance.post<CreateDashboardResponse>(
      "/dashboards",
      formData
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.message;
      const status = error.response?.status ?? 500;

      switch (status) {
        case 401:
          onError(status, "Unauthorizsed");
          break;
        default:
          onError(status, message);
          break;
      }
    }
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
export const getMembers = async ({
  dashboardId,
  page = 1, // 기본값 설정
  size = 20, // 기본값 설정
}: {
  dashboardId: string;
  page?: number;
  size?: number;
}): Promise<MembersResponse> => {
  console.log(dashboardId);
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

// 대시보드 초대하기
export const addInvitations = async (
  dashboardId: number,
  email: string
): Promise<Invitation> => {
  try {
    const response = await axiosInstance.post<Invitation>(
      `/dashboards/${dashboardId}/invitations`,
      {
        dashboardId,
        email,
      }
    );
    return response.data;
  } catch (error) {
    console.error("초대하는 데 실패했습니다.:", error);
    throw error;
  }
};

// 대시보드 초대 취소
export const deleteInvitations = async (
  dashboardId: number,
  invitationId: number
): Promise<void> => {
  try {
    await axiosInstance.delete(
      `/dashboards/${dashboardId}/invitations/${invitationId}`
    );
  } catch (error) {
    console.error("초대 취소하는 데 실패했습니다:", error);
    throw error;
  }
};
