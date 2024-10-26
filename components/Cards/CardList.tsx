import { useEffect, useState } from "react";
import { Card as CardType, CardListResponse } from "@/types/cards";
import { getCards } from "@/utils/api/cardsApi";
import Card from "./Card";

interface CardListProps {
  columnId: number;
}

const CardList: React.FC<CardListProps> = ({ columnId }) => {
  const [cards, setCards] = useState<CardType[]>([]);

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
    <ul className="mt-4 flex flex-col gap-4">
      {cards.map((card) => (
        <Card key={card.id} card={card} id={card.id} />
      ))}
    </ul>
  );
};

export default CardList;
