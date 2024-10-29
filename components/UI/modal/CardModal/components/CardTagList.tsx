import React from "react";
import { Card } from "@/types/cards";
import { styles } from ".././styles";

const CardTagList: React.FC<{ card: Card | null }> = ({ card }) => (
  <div className={styles.tagContainer}>
    <span className={`${styles.tagBase} bg-indigo-100 text-indigo-800`}>
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
);

export default CardTagList;
