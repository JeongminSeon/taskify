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
}

const CardCommentList: React.FC<CommentProps> = ({ card }) => {
  const router = useRouter();
  const { dashboardsId } = router.query;

  // 관련된 상태와 함수들을 논리적으로 그룹화
  const {
    state: { comments, content, editCommentId, editContent },
    modal: { isOpen, modalMessage, closeModal },
    actions: {
      fetchComments,
      handleInputChange,
      handleCommentCreate,
      handleCommentChange,
      handleEditClick,
      handleCommentDelete,
    },
  } = useComments({
    card,
    dashboardId: Number(dashboardsId),
  });

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="p-4">
      <h2 className={styles.commentTitle}>댓글</h2>

      {/* 댓글 입력 컴포넌트 */}
      <CommentInput
        content={content}
        onChange={handleInputChange}
        onSubmit={handleCommentCreate}
      />

      {/* 댓글 목록 렌더링*/}
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            editCommentId={editCommentId}
            editContent={editContent}
            onInputChange={handleInputChange}
            onEditClick={handleEditClick}
            onCommentChange={handleCommentChange}
            onCommentDelete={handleCommentDelete}
          />
        ))}
      </div>

      {isOpen && (
        <ModalAlert isOpen={isOpen} onClose={closeModal} text={modalMessage} />
      )}
    </div>
  );
};

export default CardCommentList;
