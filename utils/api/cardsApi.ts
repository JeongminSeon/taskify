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
    return response.data;
  } catch (error) {
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
    throw error;
  }
};

// 카드 상세 수정
export const updateCard = async ({
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
    throw error;
  }
};

//카드 삭제

export const deleteCard = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/cards/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
