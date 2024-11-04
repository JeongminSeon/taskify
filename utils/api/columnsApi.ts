import {
  ColoumnsParams,
  ColumnsCreateParams,
  ColumnsResponse,
  ColumnsUpdateParams,
  ImageCreateParams,
  ImageCreateResponse,
} from "@/types/columns"; // 필요한 타입들 가져오기
import axiosInstance from "./axiosInstanceApi"; // Axios 인스턴스 가져오기
import axios from "axios"; // Axios 가져오기

// 컬럼 목록 조회
export const getColumns = async ({
  dashboardId,
}: ColoumnsParams): Promise<ColumnsResponse> => {
  try {
    const response = await axiosInstance.get<ColumnsResponse>(`/columns`, {
      params: {
        dashboardId, // 대시보드 ID를 파라미터로 전달
      },
    });
    return response.data; // 응답 데이터 반환
  } catch (error) {
    throw error; // 에러 발생 시 에러를 throw
  }
};

// 컬럼 생성
export const createColumn = async ({
  title,
  dashboardId,
}: ColumnsCreateParams): Promise<ColumnsResponse> => {
  try {
    const response = await axiosInstance.post<ColumnsResponse>(`/columns`, {
      title, // 생성할 컬럼의 제목
      dashboardId, // 대시보드 ID
    });
    return response.data; // 응답 데이터 반환
  } catch (error) {
    throw error; // 에러 발생 시 에러를 throw
  }
};

// 칼럼 수정
export const updateColumn = async ({
  columnId,
  title,
}: ColumnsUpdateParams): Promise<ColumnsResponse> => {
  try {
    const response = await axiosInstance.put(`/columns/${columnId}`, {
      title, // 수정할 컬럼의 제목
    });
    return response.data; // 응답 데이터 반환
  } catch (error) {
    throw error; // 에러 발생 시 에러를 throw
  }
};

// 칼럼 삭제
export const deleteColumn = async (columnId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/columns/${columnId}`); // 컬럼 삭제 요청
  } catch (error) {
    throw error; // 에러 발생 시 에러를 throw
  }
};

// 카드 이미지 업로드
export const createCardImage = async ({
  columnId,
  image,
}: ImageCreateParams): Promise<ImageCreateResponse> => {
  const formData = new FormData(); // FormData 객체 생성
  if (!image) throw new Error("이미지가 없습니다."); // 이미지가 없는 경우 에러 발생
  formData.append("image", image); // 이미지 추가

  try {
    const response = await axiosInstance.post(
      `/columns/${columnId}/card-image`, // 카드 이미지 업로드 요청
      formData,
      {
        headers: {
          Accept: "application/json", // 응답 형식 설정
          "Content-Type": "multipart/form-data", // 콘텐츠 타입 설정
        },
      }
    );
    return response.data; // 응답 데이터 반환
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 413) {
        throw new Error(
          "이미지 파일이 너무 큽니다. 최대 파일 크기를 확인해주세요." // 파일 크기 초과 시 에러 메시지
        );
      }
      throw error; // 다른 Axios 에러 처리
    } else {
      throw new Error("예상치 못한 오류가 발생했습니다."); // 예기치 않은 에러 처리
    }
  }
};
