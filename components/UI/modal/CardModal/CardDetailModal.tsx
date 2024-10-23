import React, { useState } from "react";
import Image from "next/image";
import { CardProps } from "@/types/cards";
import Dropdown from "../../Dropdown/Dropdown";
import { styles } from "./styles";

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

const CardDetailModal: React.FC<CardProps> = ({
  title,
  // description,
  // tags,
  // dueDate,
  // assignee,
  // imageUrl,
  // createdAt,
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
            <h1 className="text-xl font-bold">{title}</h1>
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
                  • To Do
                </span>
                <div className={styles.tagDivider}></div>
                {[
                  { text: "프로젝트", color: "bg-orange-100 text-orange-800" },
                  { text: "일반", color: "bg-green-100 text-green-800" },
                  { text: "백엔드", color: "bg-pink-100 text-pink-800" },
                  { text: "상", color: "bg-purple-100 text-purple-800" },
                ].map((tag) => (
                  <span
                    key={tag.text}
                    className={`${styles.tagBase} ${tag.color}`}
                  >
                    {tag.text}
                  </span>
                ))}
              </div>
              {/* 본문 */}
              <div className="p-4">
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum finibus nibh arcu, quis consequat ante cursus eget.
                  Cras mattis, nulla non lacerat porttitor, diam justo laoreet
                  eros, vel aliquet diam elit at leo.
                </p>
                <div className={styles.imageContainer}>
                  <Image
                    src="https://via.placeholder.com/300"
                    alt="Two women looking at a book"
                    fill
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
            {/* 담당자 */}
            <div className={styles.sidebarContainer}>
              <div className={styles.sidebarBox}>
                <h3 className={styles.sidebarTitle}>담당자</h3>
                <div className="flex items-center">
                  <div className={styles.assigneeAvatar}>B</div>
                  <span className="ml-2 text-sm">배유정</span>
                </div>
                <h3 className={`${styles.sidebarTitle} mt-4`}>마감일</h3>
                <p className="text-sm">2022.12.30 19:00</p>
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
