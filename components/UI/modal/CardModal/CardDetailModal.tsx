import React from "react";
import { Card } from "@/types/cards";
import { styles } from "./styles";
import CardHeader from "./components/CardHeader";
import CardTagList from "./components/CardTagList";
import CardBody from "./components/CardBody";
import CardSidebar from "./components/CardSidebar";
import CardCommentList from "./components/CardCommentList";

interface CardDetailModalProps {
  card: Card | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const CardDetailModal: React.FC<CardDetailModalProps> = ({
  card,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.modalOverlay} onClick={onClose}>
        <div
          className={styles.modalContainer}
          onClick={(e) => e.stopPropagation()}
        >
          <CardHeader
            card={card}
            onClose={onClose}
            onEdit={onEdit}
            onDelete={onDelete}
          />
          <div className="flex">
            <div className="flex-grow pr-4">
              <CardTagList card={card} />
              <CardBody card={card} />
            </div>
            <CardSidebar card={card} />
          </div>
          <CardCommentList />
        </div>
      </div>
    </>
  );
};

export default CardDetailModal;
