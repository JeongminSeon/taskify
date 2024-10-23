import axiosInstance from "./axiosInstanceApi";
import { MemberResponse } from "@/types/members";

// 대시보드 멤버 목록 가져오기
export const getMembers = async (
  page: number,
  size: number,
  dashboardId: number
) => {
  try {
    const response = await axiosInstance.get<MemberResponse>(`/members`, {
      params: {
        page,
        size,
        dashboardId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("대시보드 목록을 가져오는 데 실패했습니다:", error);
    throw error;
  }
};
