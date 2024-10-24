import {
  ColoumnsParams,
  ColumnsResponse,
  ColumnsCreateParams,
  ColumnsCreateResponse,
} from "@/types/columns";
import axiosInstance from "./axiosInstanceApi";

// 컬럼 목록 조회
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

// 컬럼 생성
export const createColumn = async ({
  teamId,
  title,
  dashboardId,
}: ColumnsCreateParams): Promise<ColumnsCreateResponse> => {
  try {
    const response = await axiosInstance.post<ColumnsCreateResponse>(
      `/columns`,
      {
        teamId,
        title,
        dashboardId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("칼럼을 생성하는 중 오류가 발생했습니다:", error);
    throw error;
  }
};
