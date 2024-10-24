import { useState, useCallback } from "react";
import { CardProps } from "@/types/cards";

export const useCardDetailModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardProps | null>(null);

  const openModal = useCallback((card: CardProps) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedCard(null);
  }, []);

  return {
    isModalOpen,
    selectedCard,
    openModal,
    closeModal,
  };
};
