import axiosInstance from "./axiosInstanceApi"; // Axios 인스턴스 가져오기
import { MemberResponse } from "@/types/members"; // 멤버 응답 타입 가져오기

// 대시보드 멤버 목록 가져오기
export const getMembers = async (
  page: number, // 페이지 번호
  size: number, // 페이지당 항목 수
  dashboardId: number // 대시보드 ID
) => {
  try {
    const response = await axiosInstance.get<MemberResponse>(`/members`, {
      params: {
        page, // 요청 파라미터로 페이지 번호
        size, // 요청 파라미터로 페이지당 항목 수
        dashboardId, // 요청 파라미터로 대시보드 ID
      },
    });
    return response.data; // 요청 성공 시 데이터 반환
  } catch (error) {
    throw error; // 오류 발생 시 오류를 던짐
  }
};

// 대시보드 멤버 삭제하기
export const deleteMember = async (memberId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/members/${memberId}`); // 해당 ID의 멤버 삭제
  } catch (error) {
    throw error; // 오류 발생 시 오류를 던짐
  }
};
