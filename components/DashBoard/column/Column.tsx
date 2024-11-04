import { useEffect } from "react";
import { useColumnStore } from "@/store/columnStore";
import CardList from "@/components/Cards/CardList";
import CreateTodoModal from "@/components/UI/modal/CreateTodoModal";
import Portal from "../../UI/modal/ModalPotal";
import useModal from "@/hooks/modal/useModal";
import AddCardButton from "./AddCardButton";
import ColumnHeader from "./ColumnHeader";
import useCardsStore from "@/store/cardsStore";

interface ColumnProps {
  id: number; // 열 ID
  title: string; // 열 제목
  onRefresh: () => void; // 새로 고침 함수
}

// Column 컴포넌트 정의
const Column: React.FC<ColumnProps> = ({ id, title, onRefresh }) => {
  const { isOpen, openModal, closeModal } = useModal(); // 모달 상태 및 함수
  const { cards, fetchCards, addCard, updateCard, deleteCard } =
    useCardsStore(); // 카드 관련 상태 및 함수
  const { setColumnId } = useColumnStore(); // 열 ID 설정 함수

  // 컴포넌트가 마운트되면 카드 데이터를 가져오고 열 ID를 설정
  useEffect(() => {
    fetchCards(id); // 해당 열의 카드 데이터를 가져옴
    setColumnId(id); // 현재 열 ID 설정
  }, [id, fetchCards, setColumnId]);

  return (
    <div className="columnList flex-1 h-[1010px] py-4 px-3 sm:border-b border-r border-[gray600]">
      {/* 열 헤더 렌더링 */}
      <ColumnHeader title={title} columnId={id} onRefresh={onRefresh} />
      {/* 카드 추가 버튼 렌더링 */}
      <AddCardButton onClick={openModal} />
      <CardList
        cards={cards[id] || []} // 해당 열의 카드 리스트
        title={title}
        onUpdateCard={(updatedCard) => updateCard(id, updatedCard)} // 카드 업데이트 핸들러
        onDeleteCard={(cardId) => deleteCard(id, cardId)} // 카드 삭제 핸들러
        onRefresh={onRefresh} // 새로 고침 핸들러
      />
      {isOpen && ( // 모달이 열려 있을 경우
        <Portal>
          <CreateTodoModal
            isOpen={isOpen}
            onClose={closeModal} // 모달 닫기 핸들러
            onCreateCard={(newCard) => addCard(id, newCard)} // 카드 생성 핸들러
          />
        </Portal>
      )}
    </div>
  );
};

export default Column;
