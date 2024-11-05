import { MyInviteListResponse } from "@/types/invitedList"; // 초대 목록의 타입 가져오기
import axiosInstance from "./axiosInstanceApi"; // Axios 인스턴스 가져오기

// 내가 받은 초대 목록 조회
export const getMyInvitations = async () => {
  try {
    const response = await axiosInstance.get<MyInviteListResponse>(
      `/invitations` // API 엔드포인트
    );
    return response.data; // 요청 성공 시 데이터 반환
  } catch (error) {
    throw error; // 오류 발생 시 오류를 던짐
  }
};
