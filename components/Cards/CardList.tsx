import { useCardList } from "@/hooks/dashboard/useCardList";
import CardListLayout from "../Layout/CardListLayout";

interface CardListProps {
  columnId: number;
  dashboardId: number;
}

const CardList: React.FC<CardListProps> = ({ columnId, dashboardId }) => {
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
  } = useCardList(columnId);

  return (
    <CardListLayout
      cards={cards}
      selectedCard={selectedCard}
      tagColors={tagColors}
      isDetailOpen={isDetailOpen}
      isUpdateOpen={isUpdateOpen}
      dashboardId={dashboardId}
      onCardClick={handleCardClick}
      onCloseDetail={closeDetailModal}
      onCloseUpdate={closeUpdateModal}
      onEdit={handleEditClick}
    />
  );
};

export default CardList;
