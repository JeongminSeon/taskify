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

export const useComments = ({
  card,
  dashboardId,
}: UseCommentsProps): UseCommentsReturn => {
  const { isOpen, openModal, closeModal } = useModal();
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState<string>("");
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string>("");

  const fetchComments = async (): Promise<void> => {
    try {
      const params: CommentParams = {
        size: 10,
        cardId: card.id,
      };
      const response = await getComments(params);
      setComments(response.comments);
    } catch (error) {
      if (error instanceof Error) {
        setModalMessage(error.message);
        openModal();
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (name === "editComment") {
      setEditContent(value);
    } else {
      setContent(value);
    }
  };

  const handleCommentCreate = async (): Promise<void> => {
    try {
      const params: CommentCreateParams = {
        content,
        cardId: card.id,
        columnId: card.columnId,
        dashboardId: Number(dashboardId),
      };
      const newComment = await createComment(params);
      setComments((prev) => [...prev, newComment]); // 직접 상태 업데이트
      setContent("");
    } catch (error) {
      if (error instanceof Error) {
        setModalMessage(error.message);
        openModal();
      }
    }
  };

  const handleCommentChange = async (): Promise<void> => {
    try {
      if (editCommentId) {
        const updatedComment = await updateComment({
          commentId: editCommentId,
          content: editContent,
        });
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
        );
        setEditCommentId(null);
      }
    } catch (error) {
      if (error instanceof Error) {
        setModalMessage(error.message);
        openModal();
      }
    }
  };

  const handleEditClick = (comment: Comment): void => {
    setEditCommentId(comment.id);
    setEditContent(comment.content);
  };

  const handleCommentDelete = async (commentId: number): Promise<void> => {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (error) {
      if (error instanceof Error) {
        setModalMessage(error.message);
        openModal();
      }
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
