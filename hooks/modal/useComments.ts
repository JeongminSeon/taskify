import { useState, useCallback } from "react";
import { Card } from "@/types/cards";
import { Comment } from "@/types/comments";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "@/utils/api/commentsApi";
import useModal from "./useModal";

interface UseCommentsProps {
  card: Card;
  dashboardId: number;
}

interface UseCommentsReturn {
  state: {
    comments: Comment[];
    content: string;
    editCommentId: number | null;
    editContent: string;
  };
  modal: {
    isOpen: boolean;
    modalMessage: string;
    closeModal: () => void;
  };
  actions: {
    fetchComments: () => Promise<void>;
    handleInputChange: (value: string) => void;
    handleCommentCreate: () => Promise<void>;
    handleCommentChange: (commentId: number) => Promise<void>;
    handleEditClick: (commentId: number, currentContent: string) => void;
    handleCommentDelete: (commentId: number) => Promise<void>;
  };
}

export const useComments = ({
  card,
  dashboardId,
}: UseCommentsProps): UseCommentsReturn => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  const { isOpen, openModal, closeModal, modalMessage } = useModal();

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

  const handleInputChange = useCallback(
    (value: string) => {
      if (editCommentId !== null) {
        setEditContent(value);
      } else {
        setContent(value);
      }
    },
    [editCommentId]
  );

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

  const handleCommentChange = async (commentId: number) => {
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

  const handleEditClick = (commentId: number, currentContent: string) => {
    setEditCommentId(commentId);
    setEditContent(currentContent);
  };

  const handleCommentDelete = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      await fetchComments();
    } catch (error) {
      throw error;
    }
  };

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
