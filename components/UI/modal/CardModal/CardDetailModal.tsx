import React, { useState } from "react";
import Image from "next/image";
import { Card, CardProps } from "@/types/cards";
import { styles } from "./styles";
import Dropdown from "../../dropdown/Dropdown";

// 부모에서 해당 컴포넌트 사용시 컴포넌트 명을 호버하면 props를 미리 확인할 수 있음
/**
 * @param title 카드 제목
 * @param description 카드 설명
 * @param tags 카드 태그
 * @param dueDate 마감일
 * @param assignee 담당자
 * @param imageUrl 이미지 URL
 * @param createdAt 생성일
 * @param isOpen 모달 오픈 여부
 * @param onClose 모달 닫기 함수
 */
interface CardDetailModalProps {
  card: Card | null; // Card 타입의 객체
  isOpen: boolean;
  onClose: () => void;
}

const CardDetailModal: React.FC<CardDetailModalProps> = ({
  card,
  isOpen,
  onClose,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownItems = [
    { label: "수정하기", onClick: () => console.log("수정하기 클릭") },
    { label: "삭제하기", onClick: () => console.log("삭제하기 클릭") },
  ];

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalContent}>
          {/* 헤더 */}
          <div className={styles.modalHeader}>
            <h1 className="text-xl font-bold">{card?.title}</h1>
            <div className="flex items-center">
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={styles.kebabButton}
                >
                  <Image
                    src="/images/icons/icon_kebab.svg"
                    width={4}
                    height={16}
                    alt="더보기"
                  />
                </button>
                <Dropdown isOpen={isDropdownOpen} items={dropdownItems} />
              </div>
              <button className={styles.closeButton} onClick={onClose}>
                <Image
                  src="/images/icons/icon_close.svg"
                  width={16}
                  height={16}
                  alt="닫기"
                />
              </button>
            </div>
          </div>

          <div className="flex">
            <div className="flex-grow pr-4">
              {/* 태그 섹션 */}
              <div className={styles.tagContainer}>
                <span
                  className={`${styles.tagBase} bg-indigo-100 text-indigo-800`}
                >
                  {card?.columnId}
                </span>
                <div className={styles.tagDivider}></div>
                {card?.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`${styles.tagBase} bg-orange-100 text-orange-800`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {/* 본문 */}
              <div className="p-4">
                <p className="mb-4">{card?.description}</p>
                <div className={styles.imageContainer}>
                  <Image
                    src={card?.imageUrl || "https://via.placeholder.com/300"}
                    alt="Two women looking at a book"
                    fill
                    style={{ objectFit: "cover" }} // CSS 스타일로 objectFit 설정
                    className="rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 뷰포트에 따른 이미지 크기 설정
                  />
                </div>
              </div>
            </div>
            {/* 담당자 */}
            <div className={styles.sidebarContainer}>
              <div className={styles.sidebarBox}>
                <h3 className={styles.sidebarTitle}>담당자</h3>
                <div className="flex items-center">
                  <div className={styles.assigneeAvatar}>
                    {card?.assignee.nickname.charAt(0)}
                  </div>
                  <span className="ml-2 text-sm">
                    {card?.assignee.nickname}
                  </span>
                </div>
                <h3 className={`${styles.sidebarTitle} mt-4`}>마감일</h3>
                <p className="text-sm">
                  {new Date(card?.dueDate || "").toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* 댓글 섹션 */}
          <div className="p-4">
            <h2 className={styles.commentTitle}>댓글</h2>
            <div className="mb-6 relative">
              <textarea
                placeholder="댓글 작성하기"
                className={styles.commentInput}
              />
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
                    <p className="text-sm text-gray-500 ml-2">
                      2023.12.27 14:05
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
        </div>
      </div>
    </div>
  );
};

export default CardDetailModal;
