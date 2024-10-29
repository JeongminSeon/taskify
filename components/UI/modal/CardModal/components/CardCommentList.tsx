import React from "react";
import Image from "next/image";
import { styles } from ".././styles";
import { Card } from "@/types/cards";
import { format } from "date-fns";

interface CommentProps {
  card: Card;
}

const CardCommentList: React.FC<CommentProps> = ({ card }) => {
  console.log("댓글", card);

  return (
    <div className="p-4">
      <h2 className={styles.commentTitle}>댓글</h2>
      <div className="mb-6 relative">
        <textarea placeholder="댓글 작성하기" className={styles.commentInput} />
        <button className={styles.commentSubmitButton}>입력</button>
      </div>
      <div className="space-y-4">
        <div className={styles.commentItem}>
          {/* 뎃글단프로필 */}
          <Image
            src={
              card.assignee.profileImageUrl || "https://via.placeholder.com/30"
            }
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex-grow">
            <div className="flex items-center">
              <p className="font-semibold">댓글단닉네임</p>
              <p className="text-sm text-gray-500 ml-2">
                {/* 뎃글단시간 */}
                {card?.dueDate
                  ? format(new Date(card.dueDate), "yyyy.MM.dd HH:mm")
                  : ""}
              </p>
            </div>
            <p className="mt-1">오늘까지 CCC 개발 완료 수 있을까요?</p>
            <div className="mt-2">
              <button className={styles.commentActionButton}>수정</button>
              <button className={styles.commentActionButton}>삭제</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCommentList;
