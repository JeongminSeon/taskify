import { useState, useEffect } from "react";
import { Card as CardType } from "@/types/cards";
import { getRandomColor } from "@/utils/TodoForm";
import useModal from "@/hooks/modal/useModal";

interface UseCardListProps {
  initialCards: CardType[];
  onDeleteCard: (cardId: number) => void;
}

export const useCardList = ({
  initialCards,
  onDeleteCard,
}: UseCardListProps) => {
  const [cards, setCards] = useState<CardType[]>(initialCards);
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

  const handleEditClick = () => {
    closeDetailModal();
    openUpdateModal();
  };

  const handleDeleteClick = async () => {
    if (!selectedCard) return;
    await onDeleteCard(selectedCard.id);
    closeDetailModal();
  };

  useEffect(() => {
    setCards(initialCards);
  }, [initialCards]);

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
    handleDeleteClick,
  };
};
