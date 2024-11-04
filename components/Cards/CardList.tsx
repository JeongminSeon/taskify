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

// 카드 목록을 표시하는 컴포넌트 정의
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
        cards, // 현재 카드 목록
        selectedCard, // 선택된 카드
        tagColors, // 태그 색상
      }}
      modalProps={{
        isDetailOpen, // 상세 모달 열림 여부
        isUpdateOpen, // 업데이트 모달 열림 여부
        onCloseDetail: closeDetailModal, // 상세 모달 닫기 핸들러
        onCloseUpdate: closeUpdateModal, // 업데이트 모달 닫기 핸들러
      }}
      actionProps={{
        onCardClick: handleCardClick, // 카드 클릭 핸들러
        onEdit: handleEditClick, // 편집 클릭 핸들러
        onDelete: handleDeleteClick, // 삭제 클릭 핸들러
        onUpdateCard, // 카드 업데이트 핸들러
        onRefresh, // 새로 고침 핸들러
      }}
      metaProps={{
        columnTitle: title, // 카드 목록 제목
      }}
    />
  );
};

export default CardList;
