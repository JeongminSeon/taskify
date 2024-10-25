import axiosInstance from "./axiosInstanceApi";
import { MemberResponse } from "@/types/members";

// 대시보드 멤버 목록 가져오기
export const getMembers = async (
  dashboardId: number,
  page: number,
  size: number
) => {
  try {
    const response = await axiosInstance.get<MemberResponse>(`/members`, {
      params: {
        dashboardId,
        page,
        size,
      },
    });
    return response.data;
  } catch (error) {
    console.error("멤버 목록 가져오는 데 실패했습니다:", error);
    throw error;
  }
};
