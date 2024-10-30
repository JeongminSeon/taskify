import CardList from "@/components/Cards/CardList";
import CreateTodoModal from "@/components/UI/modal/CreateTodoModal";
import Portal from "../../UI/modal/ModalPotal";
import useModal from "@/hooks/modal/useModal";
import { useEffect } from "react";
import useCardsStore from "@/store/cardsStore";
import AddCardButton from "./AddCardButton";
import ColumnHeader from "./ColumnHeader";

interface ColumnProps {
  id: number;
  title: string;
  dashboardId: number;
}

const Column: React.FC<ColumnProps> = ({ id, title, dashboardId }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const { cards, fetchCards, addCard, updateCard, deleteCard } =
    useCardsStore();

  useEffect(() => {
    fetchCards(id);
  }, [id, fetchCards]);

  return (
    <div className="columnList flex-1 h-screen py-4 px-3 md:p-5 sm:border-b border-r border-[gray600]">
      <ColumnHeader title={title} />
      <AddCardButton onClick={openModal} />
      <CardList
        onUpdateCard={(updatedCard) => updateCard(id, updatedCard)}
        onDeleteCard={(cardId) => deleteCard(id, cardId)}
        dashboardId={dashboardId}
        cards={cards[id] || []}
      />
      {isOpen && (
        <Portal>
          <CreateTodoModal
            columnId={id}
            isOpen={isOpen}
            onClose={closeModal}
            dashboardId={dashboardId}
            onCreateCard={(newCard) => addCard(id, newCard)}
          />
        </Portal>
      )}
    </div>
  );
};

export default Column;
