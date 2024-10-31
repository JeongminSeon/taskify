import { useEffect, useState } from "react";
import { Card as CardType } from "@/types/cards";
import { getRandomColor } from "@/utils/TodoForm";
import useModal from "@/hooks/modal/useModal";
import CardDetailModal from "../UI/modal/CardModal/CardDetailModal";
import Portal from "../UI/modal/ModalPotal";
import UpdateTodoModal from "../UI/modal/UpdateTodoModal";
import Card from "./components/Card";

interface CardListProps {
  dashboardId: number;
  cards: CardType[];
  onUpdateCard: (card: CardType) => void;
  onDeleteCard: (cardId: number) => void;
}

const CardList: React.FC<CardListProps> = ({
  dashboardId,
  cards,
  onUpdateCard,
  onDeleteCard,
}) => {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const {
    isOpen: isDetailOpen,
    openModal: openDetailModal,
    closeModal: closeDetailModal,
  } = useModal();
  const {
    isOpen: isUpdateOpen,
    openModal: openUpdateModal,
    closeModal: closeUpdateModal,
  } = useModal();
  const [tagColors, setTagColors] = useState<Record<string, string>>({});

  const handleCardClick = (card: CardType) => {
    setSelectedCard(card);
    openDetailModal();
  };

  const handleEditClick = () => {
    closeDetailModal();
    openUpdateModal();
  };

  const handleDeleteClick = async () => {
    closeDetailModal();

    if (!selectedCard) return;
    const id = selectedCard.id;
    await onDeleteCard(id);
  };

  useEffect(() => {
    const newTagColors: Record<string, string> = {};
    cards.forEach((card) => {
      card.tags.forEach((tag) => {
        if (!newTagColors[tag]) {
          newTagColors[tag] = getRandomColor();
        }
      });
    });
    setTagColors(newTagColors);
  }, [cards]);

  return (
    <div className="flex flex-col gap-4 mt-[10px]">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          tagColors={tagColors}
          onClick={() => handleCardClick(card)}
          dashboardId={dashboardId}
        />
      ))}
      {selectedCard && (
        <Portal>
          <CardDetailModal
            card={selectedCard}
            isOpen={isDetailOpen}
            onClose={closeDetailModal}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
          <UpdateTodoModal
            cardId={selectedCard.id}
            isOpen={isUpdateOpen}
            onClose={closeUpdateModal}
            dashboardId={dashboardId}
            onUpdateCard={onUpdateCard}
          />
        </Portal>
      )}
    </div>
  );
};

export default CardList;
