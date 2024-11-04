import { useState, useEffect } from "react";
import { Card as CardType } from "@/types/cards";
import { getRandomColor } from "@/utils/TodoForm";
import useModal from "@/hooks/modal/useModal";

// UseCardListProps 인터페이스 정의
// initialCards: 초기 카드 배열
// onDeleteCard: 카드 삭제 함수 (카드 ID를 인자로 받음)
interface UseCardListProps {
  initialCards: CardType[];
  onDeleteCard: (cardId: number) => void;
}

// useCardList 커스텀 훅
export const useCardList = ({
  initialCards,
  onDeleteCard,
}: UseCardListProps) => {
  // cards: 카드 배열 상태, 초기값은 initialCards
  const [cards, setCards] = useState<CardType[]>(initialCards);

  // selectedCard: 선택된 카드 상태, 초기값은 null
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);

  // tagColors: 태그별 색상 객체 상태, 초기값은 빈 객체
  const [tagColors, setTagColors] = useState<Record<string, string>>({});

  // 상세 모달의 열림 상태와 관련된 함수
  const {
    isOpen: isDetailOpen, // 상세 모달 열림 상태
    openModal: openDetailModal, // 상세 모달 열기 함수
    closeModal: closeDetailModal, // 상세 모달 닫기 함수
  } = useModal();

  // 수정 모달의 열림 상태와 관련된 함수
  const {
    isOpen: isUpdateOpen, // 수정 모달 열림 상태
    openModal: openUpdateModal, // 수정 모달 열기 함수
    closeModal: closeUpdateModal, // 수정 모달 닫기 함수
  } = useModal();

  // 카드 클릭 시 상세 모달을 열고 선택된 카드를 설정
  const handleCardClick = (card: CardType) => {
    setSelectedCard(card); // 선택된 카드 설정
    openDetailModal(); // 상세 모달 열기
  };

  // 수정 버튼 클릭 시 상세 모달을 닫고 수정 모달을 엶
  const handleEditClick = () => {
    closeDetailModal(); // 상세 모달 닫기
    openUpdateModal(); // 수정 모달 열기
  };

  // 삭제 버튼 클릭 시 선택된 카드를 삭제하고 상세 모달을 닫음
  const handleDeleteClick = async () => {
    if (!selectedCard) return; // 선택된 카드가 없으면 함수 종료
    await onDeleteCard(selectedCard.id); // 카드 삭제
    closeDetailModal(); // 상세 모달 닫기
  };

  // initialCards가 변경될 때마다 cards 상태 업데이트
  useEffect(() => {
    setCards(initialCards); // initialCards로 cards 설정
  }, [initialCards]);

  // cards 배열이 변경될 때 태그 색상 설정
  useEffect(() => {
    const newTagColors: Record<string, string> = {};
    cards.forEach((card) => {
      card.tags.forEach((tag) => {
        if (!newTagColors[tag]) {
          // 태그가 새로운 경우 색상 할당
          newTagColors[tag] = getRandomColor();
        }
      });
    });
    setTagColors(newTagColors); // 태그 색상 업데이트
  }, [cards]);

  // useCardList 훅에서 반환하는 값과 함수들
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
