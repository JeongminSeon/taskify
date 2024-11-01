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
  onRefresh: () => void;
}

const CardList: React.FC<CardListProps> = ({
  columnId,
  title,
  dashboardId,
  cards: initialCards,
  onUpdateCard,
  onDeleteCard,
  onRefresh,
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
    dashboardId,
  });

  return (
    <CardListLayout
      cardProps={{
        cards,
        selectedCard,
        tagColors,
      }}
      modalProps={{
        isDetailOpen,
        isUpdateOpen,
        onCloseDetail: closeDetailModal,
        onCloseUpdate: closeUpdateModal,
      }}
      actionProps={{
        onCardClick: handleCardClick,
        onEdit: handleEditClick,
        onDelete: handleDeleteClick,
        onUpdateCard,
        onRefresh,
      }}
      metaProps={{
        dashboardId,
        columnTitle: title,
      }}
    />
  );
};

export default CardList;
