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

const CardHeader: React.FC<HeaderProps> = ({
  card,
  onClose,
  onEdit,
  onDelete,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
