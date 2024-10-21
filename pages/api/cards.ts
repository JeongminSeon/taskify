import axiosInstance from "./axiosInstance";
import { CardListResponse, CreateCardBody } from "@/types/cards";

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
