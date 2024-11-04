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
    throw error;
  }
};

// 대시보드 멤버 삭제하기
export const deleteMember = async (memberId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/members/${memberId}`);
  } catch (error) {
    throw error;
  }
};
