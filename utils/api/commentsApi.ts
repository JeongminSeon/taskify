import {
  CommentResponse,
  CommentParams,
  CommentCreateParams,
  CommentListResponse,
} from "@/types/comments"; // 필요한 타입들 가져오기
import axiosInstance from "./axiosInstanceApi"; // Axios 인스턴스 가져오기
import { AxiosError } from "axios"; // AxiosError 가져오기

// 댓글 목록 조회
export const getComments = async (
  params: CommentParams
): Promise<CommentListResponse> => {
  try {
    const response = await axiosInstance.get<CommentListResponse>(`/comments`, {
      params, // 댓글 조회에 필요한 파라미터 전달
    });
    return response.data; // 응답 데이터 반환
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
    throw error; // 다른 에러 발생
  }
};

// 댓글 생성
export const createComment = async (
  params: CommentCreateParams
): Promise<CommentResponse> => {
  try {
    const response = await axiosInstance.post<CommentResponse>(
      `/comments`,
      params // 댓글 생성에 필요한 데이터 전달
    );
    return response.data; // 응답 데이터 반환
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || error.message;

      throw new Error(message); // 에러 발생
    }
    throw error; // 다른 에러 발생
  }
};

// 댓글 수정
export const updateComment = async ({
  commentId,
  content,
}: {
  commentId: number; // 수정할 댓글 ID
  content: string; // 수정할 댓글 내용
}): Promise<CommentResponse> => {
  try {
    const response = await axiosInstance.put<CommentResponse>(
      `/comments/${commentId}`, // 댓글 수정 요청
      { content } // 수정할 내용 전달
    );
    return response.data; // 응답 데이터 반환
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || error.message; // 에러 메시지 설정
      throw new Error(message); // 에러 발생
    }
    throw error; // 다른 에러 발생
  }
};

// 댓글 삭제
export const deleteComment = async (commentId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/comments/${commentId}`); // 댓글 삭제 요청
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || error.message;

      throw new Error(message); // 에러 발생
    }
    throw error; // 다른 에러 발생
  }
};
