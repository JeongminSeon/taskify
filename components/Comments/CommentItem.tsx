import { formatInTimeZone } from "date-fns-tz";
import { Comment } from "@/types/comments";
import { styles } from "../UI/modal/CardModal/styles";
import { useAuthStore } from "@/store/authStore";
import React from "react";
import Image from "next/image";
import InputField from "@/components/My/InputField";

// CommentItemProps 인터페이스 정의
interface CommentItemProps {
  comment: Comment; // 댓글 객체
  editCommentId: number | null; // 현재 수정 중인 댓글 ID
  editContent: string; // 수정 중인 댓글 내용
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 입력 변화 핸들러
  onEditClick: (comment: Comment) => void; // 댓글 수정 버튼 핸들러
  onCommentChange: () => void; // 댓글 변경 완료 핸들러
  onCommentDelete: (id: number) => void; // 댓글 삭제 핸들러
}

export const CommentItem = ({
  comment,
  editCommentId,
  editContent,
  onInputChange,
  onEditClick,
  onCommentChange,
  onCommentDelete,
}: CommentItemProps) => {
  const currentUser = useAuthStore((state) => state.user); // 현재 사용자 정보 가져오기
  const isAuthor = currentUser?.id === comment.author.id; // 댓글 작성자인지 확인

  return (
    <div className={styles.commentItem}>
      <Image
        src={comment.author.profileImageUrl || "https://via.placeholder.com/30"}
        alt="Profile"
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="flex-grow">
        <div className="flex items-center">
          <p className="font-semibold">{comment.author.nickname}</p>
          <div className="text-sm text-gray-500 ml-2">
            <p className="text-sm text-gray-500 ml-2">
              <span className="text-sm text-gray-500 ml-2">
                {formatInTimeZone(
                  new Date(comment.updatedAt || comment.createdAt),
                  "UTC",
                  "yyyy.MM.dd HH:mm"
                )}
              </span>
            </p>
          </div>
        </div>

        {editCommentId === comment.id ? (
          <InputField
            label=""
            name="editComment"
            value={editContent}
            onChange={onInputChange}
          />
        ) : (
          <p className="mt-1">{comment.content}</p>
        )}

        {isAuthor && ( // 현재 사용자가 작성자일 경우 수정 및 삭제 버튼 표시
          <div className="mt-2">
            <button
              className={styles.commentActionButton}
              onClick={() => {
                if (editCommentId === comment.id) {
                  onCommentChange();
                } else {
                  onEditClick(comment);
                }
              }}
            >
              {editCommentId === comment.id ? "저장" : "수정"}
            </button>
            <button
              className={styles.commentActionButton}
              onClick={() => onCommentDelete(comment.id)}
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
