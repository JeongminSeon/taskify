import { ColoumnsParams, ColumnsResponse } from "@/types/columns";
import axiosInstance from "./axiosInstanceApi";

// 카드 목록 조회위한 컬럼 목록 조회
export const getColumns = async ({
  teamId,
  dashboardId,
}: ColoumnsParams): Promise<ColumnsResponse> => {
  try {
    const response = await axiosInstance.get<ColumnsResponse>(`/columns`, {
      params: {
        teamId,
        dashboardId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("칼럼 목록을 가져오는 중 오류가 발생했습니다:", error);
    throw error;
  }
};
