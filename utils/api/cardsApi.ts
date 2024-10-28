import axiosInstance from "./axiosInstanceApi";
import { CardResponse, CardListResponse, CreateCardBody } from "@/types/cards";

interface CardsParams {
  columnId?: number;
  size?: number;
  cursorId?: number;
}

export const createCard = async (cardData: CreateCardBody) => {
  try {
    const response = await axiosInstance.post("/cards", cardData);
    console.log("카드 생성 응답 데이터:", response.data);
    return response.data;
  } catch (error) {
    console.error("카드 생성 중 오류가 발생했습니다:", error);
    throw error;
  }
};

export const getCards = async ({
  columnId,
  size = 10,
  cursorId,
}: CardsParams): Promise<CardListResponse> => {
  try {
    const response = await axiosInstance.get<CardListResponse>(`/cards`, {
      params: {
        columnId,
        size,
        cursorId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("카드 목록을 가져오는 중 오류가 발생했습니다:", error);
    throw error;
  }
};

// 카드 상세 조회
export const getCard = async ({
  cardId,
}: {
  cardId: number;
}): Promise<CardResponse> => {
  try {
    const response = await axiosInstance.get(`/cards/${cardId}`);
    return response.data;
  } catch (error) {
    console.error("카드를 조회하는 중 오류가 발생했습니다:", error);
    throw error;
  }
};

// 카드 상세 수정
export const UpdateCard = async ({
  cardId,
  formData,
}: {
  cardId: number;
  formData: CreateCardBody;
}): Promise<CardResponse> => {
  try {
    const response = await axiosInstance.put(`/cards/${cardId}`, formData);
    return response.data;
  } catch (error) {
    console.error("카드를 조회하는 중 오류가 발생했습니다:", error);
    throw error;
  }
};

//카드 삭제

export const DeleteCard = async ({ cardId }: { cardId: number }) => {
  try {
    const response = await axiosInstance.delete(`/cards/${cardId}`);
    return response.data;
  } catch (error) {
    console.error("카드를 삭제하는 중 오류가 발생했습니다:", error);
    throw error;
  }
};
