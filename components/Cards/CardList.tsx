// CardList.tsx
import { useEffect, useState } from "react";
import { Card as CardType, CardListResponse } from "@/types/cards";
import { getCards } from "@/utils/api/cardsApi";
import { getRandomColor } from "@/utils/TodoForm";
import useModal from "@/hooks/modal/useModal";
import CardDetailModal from "../UI/modal/CardModal/CardDetailModal";
import Card from "./Card";

interface CardListProps {
  columnId: number;
  dashboardId: number;
}

const CardList: React.FC<CardListProps> = ({ columnId, dashboardId }) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const { isOpen, openModal, closeModal } = useModal();
  const [tagColors, setTagColors] = useState<Record<string, string>>({});

  const handleCardClick = (card: CardType) => {
    setSelectedCard(card);
    openModal();
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

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const cardData: CardListResponse = await getCards({ columnId });
        setCards(cardData.cards);
      } catch (err) {
        console.error("Error fetching cards:", err);
      }
    };

    if (columnId) {
      fetchCards();
    }
  }, [columnId]);

  return (
    <div className="mt-[10px]">
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
        <CardDetailModal
          card={selectedCard}
          isOpen={isOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default CardList;
