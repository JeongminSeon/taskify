import { CommentResponse, CommentParams } from "@/types/comments";
import axiosInstance from "./axiosInstanceApi";
import { AxiosError } from "axios";

interface CommentErrorMessages {
  [key: number]: string;
}

const ERROR_MSG: CommentErrorMessages = {
  400: "댓글 내용을 입력해주세요.",
  403: "권한이 없습니다.",
  404: "대시보드의 멤버가 아닙니다.",
};

// 댓글 목록 조회
export const getComments = async ({
  size,
  cursorId,
  cardId,
}: CommentParams): Promise<CommentResponse> => {
  try {
    const response = await axiosInstance.get<CommentResponse>(`/comments`, {
      params: { size, cursorId, cardId },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      switch (status) {
        case 400:
          throw new Error("댓글 목록을 가져오는 중 오류가 발생했습니다.");
        case 404:
          throw new Error("댓글이 존재하지 않습니다.");
        default:
          throw error;
      }
    }
    throw error;
  }
};

// 댓글 생성
export const createComment = async ({
  size,
  cursorId,
  cardId,
}: CommentParams): Promise<CommentResponse> => {
  try {
    const response = await axiosInstance.post<CommentResponse>(`/comments`, {
      size,
      cursorId,
      cardId,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      switch (status) {
        case 400:
          throw new Error(ERROR_MSG[400]);
        case 403:
          throw new Error(ERROR_MSG[403]);
        case 404:
          throw new Error(ERROR_MSG[404]);
        default:
          throw error;
      }
    }
    throw error;
  }
};

// 댓글 수정
export const updateComment = async ({
  commentId,
  content,
}: {
  commentId: string;
  content: string;
}): Promise<CommentResponse> => {
  try {
    const response = await axiosInstance.put<CommentResponse>(
      `/comments/${commentId}`,
      { content }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      switch (status) {
        case 400:
          throw new Error(ERROR_MSG[400]);
        case 403:
          throw new Error(ERROR_MSG[403]);
        case 404:
          throw new Error(ERROR_MSG[404]);
        default:
          throw error;
      }
    }
    throw error;
  }
};

// 댓글 삭제
export const deleteComment = async (commentId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/comments/${commentId}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      switch (status) {
        case 403:
          throw new Error(ERROR_MSG[403]);
        case 404:
          throw new Error(ERROR_MSG[404]);
        default:
          throw error;
      }
    }
    throw error;
  }
};
