import { useState } from "react";
import {
  Comment,
  CommentParams,
  CommentCreateParams,
  UseCommentsProps,
  UseCommentsReturn,
} from "@/types/comments";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "@/utils/api/commentsApi";
import useModal from "@/hooks/modal/useModal";

// 커멘트 관련 훅
export const useComments = ({
  card,
  dashboardId,
}: UseCommentsProps): UseCommentsReturn => {
  const { isOpen, openModal, closeModal } = useModal(); // 모달 상태 관리
  const [comments, setComments] = useState<Comment[]>([]); // 댓글 목록 상태
  const [content, setContent] = useState<string>(""); // 새로운 댓글 내용 상태
  const [editCommentId, setEditCommentId] = useState<number | null>(null); // 수정할 댓글 ID 상태
  const [editContent, setEditContent] = useState<string>(""); // 수정할 댓글 내용 상태
  const [modalMessage, setModalMessage] = useState<string>(""); // 모달에 표시할 메시지 상태

  // 댓글 목록 가져오기
  const fetchComments = async (): Promise<void> => {
    try {
      const params: CommentParams = {
        size: 10,
        cardId: card.id,
      };
      const response = await getComments(params); // API 호출
      setComments(response.comments); // 댓글 목록 업데이트
    } catch (error) {
      if (error instanceof Error) {
        setModalMessage(error.message); // 오류 메시지 설정
        openModal(); // 모달 열기
      }
    }
  };

  // 댓글 생성 핸들러
  const handleCommentCreate = async (): Promise<void> => {
    try {
      const params: CommentCreateParams = {
        content,
        cardId: card.id,
        columnId: card.columnId,
        dashboardId: Number(dashboardId),
      };
      const newComment = await createComment(params); // API 호출
      setComments((prev) => [...prev, newComment]); // 상태 업데이트
      setContent(""); // 입력 필드 초기화
    } catch (error) {
      if (error instanceof Error) {
        setModalMessage(error.message); // 오류 메시지 설정
        openModal(); // 모달 열기
      }
    }
  };

  // 댓글 수정 input 핸들러
  const handleCommentChange = async (): Promise<void> => {
    try {
      if (editCommentId) {
        const updatedComment = await updateComment({
          commentId: editCommentId,
          content: editContent,
        }); // API 호출
        setComments((prev) =>
          prev.map((comment) =>
            comment.id === editCommentId
              ? {
                  ...comment,
                  content: updatedComment.content,
                  updatedAt: updatedComment.updatedAt,
                }
              : comment
          )
        ); // 댓글 목록 업데이트
        setEditCommentId(null); // 수정 상태 초기화
      }
    } catch (error) {
      if (error instanceof Error) {
        setModalMessage(error.message); // 오류 메시지 설정
        openModal(); // 모달 열기
      }
    }
  };

  // 댓글 삭제 핸들러
  const handleCommentDelete = async (commentId: number): Promise<void> => {
    try {
      await deleteComment(commentId); // API 호출
      setComments((prev) => prev.filter((comment) => comment.id !== commentId)); // 댓글 목록 업데이트
    } catch (error) {
      if (error instanceof Error) {
        setModalMessage(error.message); // 오류 메시지 설정
        openModal(); // 모달 열기
      }
    }
  };

  // 댓글 입력 input 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (name === "editComment") {
      setEditContent(value); // 수정할 댓글 내용 설정
    } else {
      setContent(value); // 새로운 댓글 내용 설정
    }
  };

  // 댓글 수정 클릭 핸들러
  const handleEditClick = (comment: Comment): void => {
    setEditCommentId(comment.id); // 수정할 댓글 ID 설정
    setEditContent(comment.content); // 수정할 댓글 내용 설정
  };

  // 반환값: 상태, 모달, 액션 함수들
  return {
    state: {
      comments,
      content,
      editCommentId,
      editContent,
    },
    modal: {
      isOpen,
      modalMessage,
      closeModal,
    },
    actions: {
      fetchComments,
      handleInputChange,
      handleCommentCreate,
      handleCommentChange,
      handleEditClick,
      handleCommentDelete,
    },
  };
};
