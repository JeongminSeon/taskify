import {
  ColoumnsParams,
  ColumnsResponse,
  ColumnsCreateParams,
  ColumnsCreateResponse,
  ImageCreateParams,
  ImageCreateResponse,
} from "@/types/columns";
import axiosInstance from "./axiosInstanceApi";
import axios from "axios";

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

// 카드 이미지 업로드
export const createCardImage = async ({
  columnId,
  image,
}: ImageCreateParams): Promise<ImageCreateResponse> => {
  const formData = new FormData();
  if (!image) throw new Error("이미지가 없습니다.");
  formData.append("image", image); // 이미지 파일 추가

  try {
    const response = await axiosInstance.post(
      `/columns/${columnId}/card-image`,
      formData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 413) {
        console.error("이미지 파일이 너무 큽니다. 업로드할 수 없습니다.");
        throw new Error(
          "이미지 파일이 너무 큽니다. 최대 파일 크기를 확인해주세요."
        );
      }
      console.error("이미지를 생성하는 중 오류가 발생했습니다:", error.message);
      throw error;
    } else {
      console.error("예상치 못한 오류가 발생했습니다:", error);
      throw new Error("예상치 못한 오류가 발생했습니다.");
    }
  }
};
