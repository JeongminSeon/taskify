import { useState, useEffect } from "react";
import { Card as CardType, CardListResponse } from "@/types/cards";
import { getCards } from "@/utils/api/cardsApi";
import { getRandomColor } from "@/utils/TodoForm";
import useModal from "@/hooks/modal/useModal";

export const useCardList = (columnId: number) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [tagColors, setTagColors] = useState<Record<string, string>>({});

  const {
    isOpen: isDetailOpen,
    openModal: openDetailModal,
    closeModal: closeDetailModal,
  } = useModal();

  const {
    isOpen: isUpdateOpen,
    openModal: openUpdateModal,
    closeModal: closeUpdateModal,
  } = useModal();

  const handleCardClick = (card: CardType) => {
    setSelectedCard(card);
    openDetailModal();
  };

  const handleEditClick = (): void => {
    closeDetailModal();
    openUpdateModal();
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

  return {
    cards,
    selectedCard,
    tagColors,
    isDetailOpen,
    isUpdateOpen,
    closeDetailModal,
    closeUpdateModal,
    handleCardClick,
    handleEditClick,
  };
};
