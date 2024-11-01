import { Card as CardType } from "@/types/cards";
import Card from "../Cards/Card";
import CardDetailModal from "../UI/modal/CardModal/CardDetailModal";
import UpdateTodoModal from "../UI/modal/UpdateTodoModal";
import Portal from "../UI/modal/ModalPotal";

interface CardListLayoutProps {
  cardProps: {
    cards: CardType[];
    selectedCard: CardType | null;
    tagColors: Record<string, string>;
  };
  modalProps: {
    isDetailOpen: boolean;
    isUpdateOpen: boolean;
    onCloseDetail: () => void;
    onCloseUpdate: () => void;
  };
  actionProps: {
    onCardClick: (card: CardType) => void;
    onEdit: () => void;
    onDelete: () => void;
    onUpdateCard: (card: CardType) => void;
    onRefresh: () => void;
  };
  metaProps: { columnTitle: string; dashboardId: number };
}

const CardListLayout: React.FC<CardListLayoutProps> = ({
  cardProps: { cards, selectedCard, tagColors },
  modalProps: { isDetailOpen, isUpdateOpen, onCloseDetail, onCloseUpdate },
  actionProps: { onCardClick, onEdit, onDelete, onUpdateCard, onRefresh },
  metaProps: { dashboardId, columnTitle },
}) => {
  return (
    <ul className="flex flex-col gap-4 mt-[10px]">
      {cards.map((card) => (
        <li key={card.id}>
          <Card
            card={card}
            tagColors={tagColors}
            onClick={() => onCardClick(card)}
            dashboardId={dashboardId}
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
            dashboardId={dashboardId}
            onUpdateCard={onUpdateCard}
            onRefresh={onRefresh}
          />
        </Portal>
      )}
    </ul>
  );
};

export default CardListLayout;
