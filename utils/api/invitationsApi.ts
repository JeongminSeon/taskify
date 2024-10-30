import { MyInviteListResponse } from "@/types/invitedList";
import axiosInstance from "./axiosInstanceApi";

// 내가 받은 초대 목록 조회
export const getMyInvitations = async () => {
  try {
    const response = await axiosInstance.get<MyInviteListResponse>(
      `/invitations`
    );
    return response.data;
  } catch (error) {
    console.error("멤버 목록 가져오는 데 실패했습니다:", error);
    throw error;
  }
};
