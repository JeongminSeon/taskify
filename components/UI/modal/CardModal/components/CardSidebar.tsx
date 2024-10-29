import React from "react";
import { Card } from "@/types/cards";
import { styles } from ".././styles";
import { format } from "date-fns";

const CardSidebar: React.FC<{ card: Card | null }> = ({ card }) => (
  <div className={styles.sidebarContainer}>
    <div className={styles.sidebarBox}>
      <h3 className={styles.sidebarTitle}>담당자</h3>
      <div className="flex items-center">
        <div className={styles.assigneeAvatar}>
          {card?.assignee.nickname.charAt(0)}
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
