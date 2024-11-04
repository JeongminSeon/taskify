import { useEffect } from "react";
import { useRouter } from "next/router";
import { Card } from "@/types/cards";
import { useComments } from "@/hooks/modal/useComments";
import { styles } from "../styles";
import { CommentInput } from "@/components/Comments/CommentInput";
import { CommentItem } from "@/components/Comments/CommentItem";
import ModalAlert from "../../ModalAlert";

// 컴포넌트에 전달되는 props 인터페이스 정의
interface CommentProps {
  card: Card;
  dashboardId?: number;
}

const CardCommentList: React.FC<CommentProps> = ({ card }) => {
  const router = useRouter();
  const dashboardId = Number(router.query.dashboardsId); // URL에서 대시보드 ID 추출

  // useComments 훅을 사용하여 상태, 모달, 액션 불러오기
  const { state, modal, actions } = useComments({
    card,
    dashboardId,
  });

  // 댓글 상태 값 추출
  const { comments, content, editCommentId, editContent } = state;

  // 모달 상태 및 메세지 추출
  const { isOpen, modalMessage, closeModal } = modal;

  // 댓글 관련 액션들
  const {
    fetchComments, // 댓글 가져오기
    handleInputChange, // 입력 변경 핸들러
    handleCommentCreate, // 댓글 생성 핸들러
    handleCommentChange, // 댓글 수정 핸들러
    handleEditClick, // 댓글 수정 모드 활성화
    handleCommentDelete, // 댓글 삭제 핸들러
  } = actions;

  // 컴포넌트 마운트 시 댓글 목록 가져오기
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
