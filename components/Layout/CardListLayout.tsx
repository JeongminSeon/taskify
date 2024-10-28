import { Card as CardType } from "@/types/cards";
import Card from "../Cards/Card";
import CardDetailModal from "../UI/modal/CardModal/CardDetailModal";
import UpdateTodoModal from "../UI/modal/UpdateTodoModal";

interface CardListLayoutProps {
  cards: CardType[];
  selectedCard: CardType | null;
  columnTitle: string;
  tagColors: Record<string, string>;
  isDetailOpen: boolean;
  isUpdateOpen: boolean;
  dashboardId: number;
  onCardClick: (card: CardType) => void;
  onCloseDetail: () => void;
  onCloseUpdate: () => void;
  onEdit: () => void;
}

const CardListLayout: React.FC<CardListLayoutProps> = ({
  cards,
  selectedCard,
  columnTitle,
  tagColors,
  isDetailOpen,
  isUpdateOpen,
  dashboardId,
  onCardClick,
  onCloseDetail,
  onCloseUpdate,
  onEdit,
}) => {
  return (
    <div className="mt-[10px]">
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
        <>
          <CardDetailModal
            card={selectedCard}
            columnTitle={columnTitle}
            tagColors={tagColors}
            isOpen={isDetailOpen}
            onClose={onCloseDetail}
            onEdit={onEdit}
          />
          <UpdateTodoModal
            cardId={selectedCard.id}
            isOpen={isUpdateOpen}
            onClose={onCloseUpdate}
            dashboardId={dashboardId}
          />
        </>
      )}
    </div>
  );
};

export default CardListLayout;
