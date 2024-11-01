import React from "react";
import { Card } from "@/types/cards";
import { styles } from ".././styles";
import { hexToRgba } from "@/utils/TodoForm";

interface CardTagListProps {
  card: Card | null;
  columnTitle: string;
  tagColors: Record<string, string>;
}

const CardTagList: React.FC<CardTagListProps> = ({
  card,
  columnTitle,
  tagColors,
}) => {
  return (
    <div className={styles.tagContainer}>
      <span className={`${styles.tagBase} bg-indigo-100 text-indigo-800`}>
        • {columnTitle}
      </span>
      <div className={styles.tagDivider}></div>
      {card?.tags.map((tag) => (
        <span
          key={tag}
          className={styles.tagBase}
          style={{
            backgroundColor: hexToRgba(tagColors[tag], 0.1),
            color: tagColors[tag],
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default CardTagList;
