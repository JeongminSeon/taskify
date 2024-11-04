import { Card as CardType } from "@/types/cards";
import Card from "../Cards/Card";
import CardDetailModal from "../UI/modal/CardModal/CardDetailModal";
import UpdateTodoModal from "../UI/modal/UpdateTodoModal";
import Portal from "../UI/modal/ModalPotal";

// CardListLayoutProps 인터페이스 정의
interface CardListLayoutProps {
  cardProps: {
    cards: CardType[]; // 카드 배열
    selectedCard: CardType | null; // 선택된 카드
    tagColors: Record<string, string>; // 태그 색상 매핑
  };
  modalProps: {
    isDetailOpen: boolean; // 카드 상세 모달 열림 상태
    isUpdateOpen: boolean; // 업데이트 모달 열림 상태
    onCloseDetail: () => void; // 카드 상세 모달 닫기 함수
    onCloseUpdate: () => void; // 업데이트 모달 닫기 함수
  };
  actionProps: {
    onCardClick: (card: CardType) => void; // 카드 클릭 시 호출되는 함수
    onEdit: () => void; // 수정 함수
    onDelete: () => void; // 삭제 함수
    onUpdateCard: (card: CardType) => void; // 카드 업데이트 함수
    onRefresh: () => void; // 새로 고침 함수
  };
  metaProps: { columnTitle: string }; // 열 제목
}

const CardListLayout: React.FC<CardListLayoutProps> = ({
  cardProps: { cards, selectedCard, tagColors },
  modalProps: { isDetailOpen, isUpdateOpen, onCloseDetail, onCloseUpdate },
  actionProps: { onCardClick, onEdit, onDelete, onUpdateCard, onRefresh },
  metaProps: { columnTitle },
}) => {
  return (
    <ul className="flex flex-col gap-4 mt-[10px] lg:h-[886px] md:h-[212px] sm:h-[290px] overflow-y-auto custom-scrollbar">
      {cards.map((card) => (
        <li key={card.id}>
          <Card
            card={card}
            tagColors={tagColors}
            onClick={() => onCardClick(card)}
          />
        </li>
      ))}
      {selectedCard && (
        <Portal>
          <CardDetailModal
            card={selectedCard}
            columnTitle={columnTitle}
            tagColors={tagColors}
            isOpen={isDetailOpen}
            onClose={onCloseDetail}
            onEdit={onEdit}
            onDelete={onDelete}
          />
          <UpdateTodoModal
            cardId={selectedCard.id}
            isOpen={isUpdateOpen}
            onClose={onCloseUpdate}
            onUpdateCard={onUpdateCard}
            onRefresh={onRefresh}
          />
        </Portal>
      )}
    </ul>
  );
};

export default CardListLayout;
