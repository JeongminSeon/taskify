import React from "react";
import Image from "next/image";
import { formatInTimeZone } from "date-fns-tz";
import { Comment } from "@/types/comments";
import InputField from "@/components/My/InputField";
import { styles } from "../UI/modal/CardModal/styles";

interface CommentItemProps {
  comment: Comment;
  editCommentId: number | null;
  editContent: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditClick: (comment: Comment) => void;
  onCommentChange: () => void;
  onCommentDelete: (id: number) => void;
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
                {/* 서버시간 기준으로 날짜 포맷 변경 */}
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

        <div className="mt-2">
          <button
            className={styles.commentActionButton}
            onClick={() => {
              // 수정 중인 댓글인지 확인
              if (editCommentId === comment.id) {
                onCommentChange();
              } else {
                // 수정 중이 아닌 경우 수정 버튼 클릭
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
      </div>
    </div>
  );
};
