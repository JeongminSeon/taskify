import React from "react";
import Image from "next/image";
import { styles } from ".././styles";

const CardCommentList: React.FC = () => (
  <div className="p-4">
    <h2 className={styles.commentTitle}>댓글</h2>
    <div className="mb-6 relative">
      <textarea placeholder="댓글 작성하기" className={styles.commentInput} />
      <button className={styles.commentSubmitButton}>입력</button>
    </div>
    <div className="space-y-4">
      <div className={styles.commentItem}>
        <Image
          src="https://via.placeholder.com/30"
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex-grow">
          <div className="flex items-center">
            <p className="font-semibold">정민호</p>
            <p className="text-sm text-gray-500 ml-2">2023.12.27 14:05</p>
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

export default CardCommentList;
