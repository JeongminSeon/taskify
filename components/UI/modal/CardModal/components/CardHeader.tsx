import React, { useState } from "react";
import Image from "next/image";
import Dropdown from "../../../dropdown/Dropdown";
import { Card } from "@/types/cards";
import { styles } from ".././styles";

interface HeaderProps {
  card: Card | null;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

// CardHeader 컴포넌트의 props 인터페이스 정의
const CardHeader: React.FC<HeaderProps> = ({
  card, // 카드 정보
  onClose, // 모달 닫기 함수
  onEdit, // 카드 수정 함수
  onDelete, // 카드 삭제 함수
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 열심 상태

  // 드롭다운 메뉴 항목 정의
  const dropdownItems = [
    {
      label: "수정하기",
      onClick: () => {
        onEdit();
        onClose();
      },
    },
    { label: "삭제하기", onClick: () => onDelete() },
  ];

  return (
    <div className={styles.modalHeader}>
      <h1 className="text-xl font-bold">{card?.title}</h1>
      <div className="flex items-center">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`${styles.kebabButton} relative cursor-pointer`}
        >
          <div>
            <Image
              src="/images/icons/icon_kebab.svg"
              width={30}
              height={30}
              alt="더보기"
            />
            <Dropdown isOpen={isDropdownOpen} items={dropdownItems} />
          </div>
        </button>

        <button className={styles.closeButton} onClick={onClose}>
          <Image
            src="/images/icons/icon_close.svg"
            width={30}
            height={30}
            alt="닫기"
          />
        </button>
      </div>
    </div>
  );
};

export default CardHeader;
