import React, { useEffect, useState } from "react";
import Image from "next/image";
import { styles } from ".././styles";
import { Card } from "@/types/cards";
import { format } from "date-fns";
import InputField from "@/components/My/InputField";
import { useRouter } from "next/router";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "@/utils/api/commentsApi";
import useModal from "@/hooks/modal/useModal";
import ModalAlert from "../../ModalAlert";
import { Comment, CommentParams, CommentListResponse } from "@/types/comments";

interface CommentProps {
  card: Card;
}

const CardCommentList: React.FC<CommentProps> = ({ card }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();
  const { dashboardsId } = router.query;

  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState<string>("");
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string>("");

  const fetchComments = async () => {
    try {
      const params: CommentParams = {
        size: 10,
        cardId: card.id,
      };
      const response: CommentListResponse = await getComments(params);
      console.log(response);

      setComments(response.comments);
    } catch (error) {
      if (error instanceof Error) {
        setModalMessage(error.message);
        openModal();
      }
    }
  };

  useEffect(() => {
    fetchComments();
  }, [card.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "editComment") {
      setEditContent(value);
    } else {
      setContent(value);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      await createComment({
        content,
        cardId: card.id,
        columnId: card.columnId,
        dashboardId: Number(dashboardsId),
      });
      setContent("");
      fetchComments();
    } catch (error) {
      if (error instanceof Error) {
        setModalMessage(error.message);
        openModal();
      }
    }
  };

  const handleCommentChange = async () => {
    try {
      if (editCommentId) {
        await updateComment({
          commentId: editCommentId,
          content: editContent,
        });
        setEditCommentId(null);
        fetchComments();
      }
    } catch (error) {
      if (error instanceof Error) {
        setModalMessage(error.message);
        openModal();
      }
    }
  };

  const handleEditClick = (comment: Comment) => {
    setEditCommentId(comment.id);
    setEditContent(comment.content);
  };

  const handleCommentDelete = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      fetchComments();
    } catch (error) {
      if (error instanceof Error) {
        setModalMessage(error.message);
        openModal();
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className={styles.commentTitle}>댓글</h2>
      <div className="mb-6 relative w-full">
        <InputField
          label=""
          name="content"
          placeholder="댓글 작성하기"
          value={content}
          onChange={handleInputChange}
        />
        <button
          className={styles.commentSubmitButton}
          type="submit"
          onClick={handleCommentSubmit}
        >
          입력
        </button>
      </div>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className={styles.commentItem}>
            <Image
              src={
                comment.author.profileImageUrl ||
                "https://via.placeholder.com/30"
              }
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex-grow">
              <div className="flex items-center">
                <p className="font-semibold">{comment.author.nickname}</p>
                <p className="text-sm text-gray-500 ml-2">
                  {format(new Date(comment.createdAt), "yyyy.MM.dd HH:mm")}
                </p>
              </div>

              {editCommentId === comment.id ? (
                <InputField
                  label=""
                  name="editComment"
                  value={editContent}
                  onChange={handleInputChange}
                />
              ) : (
                <p className="mt-1">{comment.content}</p>
              )}

              <div className="mt-2">
                <button
                  className={styles.commentActionButton}
                  onClick={() => {
                    if (editCommentId === comment.id) {
                      handleCommentChange();
                    } else {
                      handleEditClick(comment);
                    }
                  }}
                >
                  {editCommentId === comment.id ? "저장" : "수정"}
                </button>
                <button
                  className={styles.commentActionButton}
                  onClick={() => handleCommentDelete(comment.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isOpen && (
        <ModalAlert isOpen={isOpen} onClose={closeModal} text={modalMessage} />
      )}
    </div>
  );
};

export default CardCommentList;
