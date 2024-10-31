import { useCardList } from "@/hooks/dashboard/useCardList";
import CardListLayout from "../Layout/CardListLayout";
import { Card as CardType } from "@/types/cards";

interface CardListProps {
  dashboardId: number;
  columnId: number;
  title: string;
  cards: CardType[];
  onUpdateCard: (card: CardType) => void;
  onDeleteCard: (cardId: number) => void;
}

const CardList: React.FC<CardListProps> = ({
  columnId,
  title,
  dashboardId,
  cards: initialCards,
  onUpdateCard,
  onDeleteCard,
}) => {
  const {
    cards,
    selectedCard,
    tagColors,
    isDetailOpen,
    isUpdateOpen,
    closeDetailModal,
    closeUpdateModal,
    handleCardClick,
    handleEditClick,
    handleDeleteClick,
  } = useCardList({
    columnId,
    initialCards,
    onDeleteCard,
    dashboardId, // dashboardId 추가
  });

  return (
    <CardListLayout
      cards={cards}
      selectedCard={selectedCard}
      tagColors={tagColors}
      isDetailOpen={isDetailOpen}
      isUpdateOpen={isUpdateOpen}
      dashboardId={dashboardId}
      columnTitle={title}
      onCardClick={handleCardClick}
      onCloseDetail={closeDetailModal}
      onCloseUpdate={closeUpdateModal}
      onEdit={handleEditClick}
      onDelete={handleDeleteClick}
      onUpdateCard={onUpdateCard}
    />
  );
};

export default CardList;
