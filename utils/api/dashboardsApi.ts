import {
  DashboardResponse,
  DashboardDetailResponse,
  MembersResponse,
  CreateDashboardResponse,
} from "@/types/dashboards";
import axiosInstance from "./axiosInstanceApi";
import { AxiosError } from "axios";
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
