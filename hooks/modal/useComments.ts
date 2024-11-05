import { useState, useCallback } from "react";
import { Comment, UseCommentsProps, UseCommentsReturn } from "@/types/comments";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "@/utils/api/commentsApi";
import useModal from "./useModal";

// 댓글 관련 상태와 행동을 관리하는 커스텀 훅
export const useComments = ({
  card,
  dashboardId,
}: UseCommentsProps): UseCommentsReturn => {
  const [comments, setComments] = useState<Comment[]>([]); // 댓글 목록 상태
  const [content, setContent] = useState(""); // 현재 입력 중인 댓글 내용
  const [editCommentId, setEditCommentId] = useState<number | null>(null); // 수정 중인 댓글의 ID
  const [editContent, setEditContent] = useState(""); // 수정 중인 댓글의 내용

  // 모달 상태와 관련된 훅 사용
  const { isOpen, openModal, closeModal, modalMessage } = useModal();

  // 댓글 조회하는 함수
  const fetchComments = useCallback(async () => {
    try {
      const response = await getComments({
        cardId: card.id,
        size: 20,
        cursorId: undefined,
      });
      setComments(response.comments);
    } catch (error) {
      throw error;
    }
  }, [card.id]);

  // 댓글 입력값 변경 핸들러
  const handleInputChange = useCallback(
    (value: string) => {
      // 수정 중인 댓글이 있다면 수정 내용 업데이트, 아니면 새 댓글 내용 업데이트
      if (editCommentId !== null) {
        setEditContent(value);
      } else {
        setContent(value);
      }
    },
    [editCommentId]
  );

  // 새 댓글 생성 함수
  const handleCommentCreate = async () => {
    if (!content.trim()) {
      openModal("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      await createComment({
        cardId: card.id,
        dashboardId,
        columnId: card.columnId,
        content,
      });
      setContent("");
      await fetchComments();
    } catch (error) {
      openModal(error);
    }
  };

  // 댓글 수정 함수
  const handleCommentChange = async (commentId: number) => {
    // 수정 내용이 비어 있으면 모달을 통해 경고
    if (!editContent.trim()) {
      openModal("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      await updateComment({
        commentId,
        content: editContent,
      });
      setEditCommentId(null);
      setEditContent("");
      await fetchComments();
    } catch (error) {
      throw error;
    }
  };

  // 댓글 수정 클릭 시 수정 상태로 변경
  const handleEditClick = (commentId: number, currentContent: string) => {
    setEditCommentId(commentId);
    setEditContent(currentContent);
  };

  // 댓글 삭제 함수
  const handleCommentDelete = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      await fetchComments();
    } catch (error) {
      throw error;
    }
  };

  // 훅의 반환값: 댓글 상태, 모달 상태, 댓글 관련 액션들
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
