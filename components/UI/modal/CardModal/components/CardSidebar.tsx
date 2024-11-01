import React from "react";
import { Card } from "@/types/cards";
import { styles } from ".././styles";
import { format } from "date-fns";
import Image from "next/image";

const CardSidebar: React.FC<{ card: Card | null }> = ({ card }) => (
  <div className={styles.sidebarContainer}>
    <div className={styles.sidebarBox}>
      <h3 className={styles.sidebarTitle}>담당자</h3>
      <div className="flex items-center">
        <div className="relative w-[34px] h-[34px] overflow-hidden rounded-full">
          <Image
            src={card?.assignee.profileImageUrl || "/default-profile.png"}
            alt={`${card?.assignee.nickname}의 프로필`}
            fill
            sizes="34px"
            className="object-cover"
            priority={false}
          />
        </div>
        <span className="ml-2 text-sm">{card?.assignee.nickname}</span>
      </div>
      <h3 className={`${styles.sidebarTitle} mt-4`}>마감일</h3>
      <p className="text-sm">
        {card?.dueDate
          ? format(new Date(card.dueDate), "yyyy.MM.dd HH:mm")
          : ""}
      </p>
    </div>
  </div>
);

export default CardSidebar;
