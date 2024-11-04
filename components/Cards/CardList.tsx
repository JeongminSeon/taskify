import { useCardList } from "@/hooks/dashboard/useCardList";
import { Card as CardType } from "@/types/cards";
import CardListLayout from "../Layout/CardListLayout";

// CardList 컴포넌트의 props 타입 정의
interface CardListProps {
  title: string; // 카드 목록의 제목
  cards: CardType[]; // 카드 목록 데이터
  onUpdateCard: (card: CardType) => void; // 카드 업데이트 핸들러
  onDeleteCard: (cardId: number) => void; // 카드 삭제 핸들러
  onRefresh: () => void; // 목록 새로 고침 핸들러
}

const CardList: React.FC<CardListProps> = ({
  title,
  cards: initialCards,
  onUpdateCard,
  onDeleteCard,
  onRefresh,
}) => {
  // 커스텀 훅 사용하여 카드 목록 및 관련 상태 관리
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
    initialCards,
    onDeleteCard,
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
        columnTitle: title,
      }}
    />
  );
};

export default CardList;
