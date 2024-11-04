import axiosInstance from "./axiosInstanceApi"; // Axios 인스턴스 가져오기
import { CardResponse, CardListResponse, CreateCardBody } from "@/types/cards"; // 타입 가져오기

// 카드 요청에 필요한 매개변수 인터페이스 정의
interface CardsParams {
  columnId?: number; // 열 ID (선택적)
  size?: number; // 요청할 카드 수 (기본값 10)
  cursorId?: number; // 페이징을 위한 커서 ID (선택적)
}

// 카드 생성 API 호출
export const createCard = async (cardData: CreateCardBody) => {
  try {
    const response = await axiosInstance.post("/cards", cardData); // 카드 생성 요청
    return response.data; // 응답 데이터 반환
  } catch (error) {
    throw error; // 에러 발생 시 에러를 throw
  }
};

// 카드 목록 조회 API 호출
export const getCards = async ({
  columnId,
  size = 10,
  cursorId,
}: CardsParams): Promise<CardListResponse> => {
  try {
    const response = await axiosInstance.get<CardListResponse>(`/cards`, {
      params: {
        columnId, // 요청할 카드의 열 ID
        size, // 요청할 카드 수
        cursorId, // 페이징을 위한 커서 ID
      },
    });
    return response.data; // 응답 데이터 반환
  } catch (error) {
    throw error; // 에러 발생 시 에러를 throw
  }
};

// 카드 상세 조회 API 호출
export const getCard = async ({
  cardId,
}: {
  cardId: number; // 조회할 카드의 ID
}): Promise<CardResponse> => {
  try {
    const response = await axiosInstance.get(`/cards/${cardId}`); // 카드 상세 조회 요청
    return response.data; // 응답 데이터 반환
  } catch (error) {
    throw error; // 에러 발생 시 에러를 throw
  }
};

// 카드 상세 수정 API 호출
export const updateCard = async ({
  cardId,
  formData,
}: {
  cardId: number; // 수정할 카드의 ID
  formData: CreateCardBody; // 수정할 카드 데이터
}): Promise<CardResponse> => {
  try {
    const response = await axiosInstance.put(`/cards/${cardId}`, formData); // 카드 수정 요청
    return response.data; // 응답 데이터 반환
  } catch (error) {
    throw error; // 에러 발생 시 에러를 throw
  }
};

// 카드 삭제 API 호출
export const deleteCard = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/cards/${id}`); // 카드 삭제 요청
    return response.data; // 응답 데이터 반환
  } catch (error) {
    throw error; // 에러 발생 시 에러를 throw
  }
};
