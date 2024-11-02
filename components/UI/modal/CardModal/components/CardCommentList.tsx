import { useEffect } from "react";
import { useRouter } from "next/router";
import { Card } from "@/types/cards";
import { useComments } from "@/hooks/modal/useComments";
import { styles } from "../styles";
import { CommentInput } from "@/components/Comments/CommentInput";
import { CommentItem } from "@/components/Comments/CommentItem";
import ModalAlert from "../../ModalAlert";

interface CommentProps {
  card: Card;
  dashboardId?: number;
}

const CardCommentList: React.FC<CommentProps> = ({ card }) => {
  const router = useRouter();
  const dashboardId = Number(router.query.dashboardsId);

  const { state, modal, actions } = useComments({
    card,
    dashboardId,
  });

  const { comments, content, editCommentId, editContent } = state;
  const { isOpen, modalMessage, closeModal } = modal;
  const {
    fetchComments,
    handleInputChange,
    handleCommentCreate,
    handleCommentChange,
    handleEditClick,
    handleCommentDelete,
  } = actions;

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div className="p-4">
      <h2 className={styles.commentTitle}>댓글</h2>
      <CommentInput
        content={content}
        onChange={(e) => handleInputChange(e.target.value)}
        onSubmit={handleCommentCreate}
      />
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment.id}>
            <CommentItem
              comment={comment}
              editCommentId={editCommentId}
              editContent={editContent}
              onInputChange={(e) => handleInputChange(e.target.value)}
              onEditClick={() => handleEditClick(comment.id, comment.content)}
              onCommentChange={() => handleCommentChange(comment.id)}
              onCommentDelete={handleCommentDelete}
            />
          </li>
        ))}
      </ul>
      {isOpen && (
        <ModalAlert isOpen={isOpen} onClose={closeModal} text={modalMessage} />
      )}
    </div>
  );
};

export default CardCommentList;
