import React from "react";
import { Card } from "@/types/cards";
import { styles } from "./styles";

import CardHeader from "./components/CardHeader";
import CardTagList from "./components/CardTagList";
import CardBody from "./components/CardBody";
import CardSidebar from "./components/CardSidebar";
import CardCommentList from "./components/CardCommentList";

interface CardDetailModalProps {
  card: Card;
  columnTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  tagColors: Record<string, string>;
}

const CardDetailModal: React.FC<CardDetailModalProps> = ({
  card,
  columnTitle,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  tagColors,
}) => {
  if (!isOpen) return null;
  return (
    <>
      <div className={styles.modalOverlay} onClick={onClose}>
        <div
          className={`${styles.modalContainer} custom-scrollbar`}
          onClick={(e) => e.stopPropagation()}
        >
          <CardHeader
            card={card}
            onClose={onClose}
            onEdit={onEdit}
            onDelete={onDelete}
          />
          <div className="flex flex-col md:flex-row">
            <div className="flex-grow pr-0 md:pr-4">
              <CardTagList
                card={card}
                columnTitle={columnTitle}
                tagColors={tagColors}
              />
              <CardBody card={card} />
            </div>
            <CardSidebar card={card} />
          </div>
          <CardCommentList card={card} />
        </div>
      </div>
    </>
  );
};

export default CardDetailModal;
