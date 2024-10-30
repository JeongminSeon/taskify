import {
  CommentResponse,
  CommentParams,
  CommentCreateParams,
  CommentListResponse,
} from "@/types/comments";
import axiosInstance from "./axiosInstanceApi";
import { AxiosError } from "axios";

// 댓글 목록 조회
export const getComments = async (
  params: CommentParams
): Promise<CommentListResponse> => {
  try {
    const response = await axiosInstance.get<CommentListResponse>(`/comments`, {
      params,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || error.message;
      const status = error.response?.status ?? 500;

      console.error(`Error: ${status} - ${message}`);
      throw new Error(message);
    }
    throw error;
  }
};

// 댓글 생성
export const createComment = async (
  params: CommentCreateParams
): Promise<CommentResponse> => {
  try {
    const response = await axiosInstance.post<CommentResponse>(`/comments`, {
      params,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || error.message;
      const status = error.response?.status ?? 500;

      console.error(`Error: ${status} - ${message}`);
      throw new Error(message);
    }
    throw error;
  }
};

// 댓글 수정
export const updateComment = async ({
  commentId,
  content,
}: {
  commentId: number;
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
      const message = error.response?.data?.message || error.message;
      const status = error.response?.status ?? 500;

      console.error(`Error: ${status} - ${message}`);
      throw new Error(message);
    }
    throw error;
  }
};

// 댓글 삭제
export const deleteComment = async (commentId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/comments/${commentId}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || error.message;
      const status = error.response?.status ?? 500;

      console.error(`Error: ${status} - ${message}`);
      throw new Error(message);
    }
    throw error;
  }
};
