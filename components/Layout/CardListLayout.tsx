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
  };
  metaProps: { columnTitle: string; dashboardId: number };
}

const CardListLayout: React.FC<CardListLayoutProps> = ({
  cardProps: { cards, selectedCard, tagColors },
  modalProps: { isDetailOpen, isUpdateOpen, onCloseDetail, onCloseUpdate },
  actionProps: { onCardClick, onEdit, onDelete, onUpdateCard },
  metaProps: { dashboardId, columnTitle },
}) => {
  return (
    <div className="flex flex-col gap-4 mt-[10px]">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          tagColors={tagColors}
          onClick={() => onCardClick(card)}
          dashboardId={dashboardId}
        />
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
          />
        </Portal>
      )}
    </div>
  );
};

export default CardListLayout;
