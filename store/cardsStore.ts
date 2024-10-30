// stores/cardsStore.ts
import { create } from "zustand";
import { Card as CardType } from "@/types/cards";
import { deleteCard, getCards } from "@/utils/api/cardsApi";

interface CardsStore {
  cards: { [columnId: number]: CardType[] };
  fetchCards: (columnId: number) => Promise<void>;
  addCard: (columnId: number, newCard: CardType) => void;
  updateCard: (columnId: number, updatedCard: CardType) => void;
  deleteCard: (columnId: number, cardId: number) => Promise<void>;
}

const useCardsStore = create<CardsStore>((set) => ({
  cards: {},

  fetchCards: async (columnId) => {
    try {
      const cardData = await getCards({ columnId });
      set((state) => ({
        cards: { ...state.cards, [columnId]: cardData.cards },
      }));
    } catch (err) {
      console.error("카드를 불러오는데 실패했습니다.", err);
    }
  },

  addCard: (columnId, newCard) =>
    set((state) => ({
      cards: {
        ...state.cards,
        [columnId]: [...(state.cards[columnId] || []), newCard],
      },
    })),

  updateCard: (columnId, updatedCard) =>
    set((state) => ({
      cards: {
        ...state.cards,
        [columnId]: state.cards[columnId]?.map((card) =>
          card.id === updatedCard.id ? updatedCard : card
        ),
      },
    })),

  deleteCard: async (columnId, cardId) => {
    try {
      await deleteCard(cardId);
      set((state) => ({
        cards: {
          ...state.cards,
          [columnId]: state.cards[columnId]?.filter(
            (card) => card.id !== cardId
          ),
        },
      }));
    } catch (err) {
      console.error("카드를 삭제하는 데 실패했습니다.", err);
    }
  },
}));

export default useCardsStore;
