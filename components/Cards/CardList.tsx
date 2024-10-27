import { useEffect, useState } from "react";
import { Card, CardListResponse } from "@/types/cards";
import { getCards } from "@/utils/api/cardsApi";
import Image from "next/image";
import { getRandomColor, hexToRgba } from "@/utils/TodoForm";
import useModal from "@/hooks/modal/useModal";
import CardDetailModal from "../UI/modal/CardModal/CardDetailModal";

interface CardListProps {
  columnId: number;
}

const CardList: React.FC<CardListProps> = ({ columnId }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const { isOpen, openModal, closeModal } = useModal();
  const [tagColors, setTagColors] = useState<Record<string, string>>({});

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    openModal();
  };
  // 컴포넌트 마운트 시 한 번만 태그 색상 설정
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
  }, [cards]); // cards가 변경될 때만 실행

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
        <button
          key={card.id}
          className="w-full md:flex md:gap-5 lg:block p-3 border border-gray400 rounded-md bg-white100"
          onClick={() => handleCardClick(card)}
        >
          <div className="overflow-hidden relative w-full h-40 md:flex-[0_0_90px] lg:flex-1 md:h-[53px] lg:h-40 rounded-md">
            <Image
              src={card.imageUrl || "/images/resource/card_image1.png"}
              fill
              alt="카드 이미지"
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="w-full pt-1 md:pt-0 lg:pt-[15px]">
            <h2 className="sm:text-sm md:text-[16px] font-medium text-left">
              {card.title}
            </h2>
            <div className="md:flex lg:block gap-4">
              <div className="tags flex items-center gap-[6px] mt-[6px]">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag py-1 px-[6px] rounded"
                    style={{
                      backgroundColor: hexToRgba(
                        tagColors[tag] || "#000000",
                        0.2
                      ),
                      color: tagColors[tag] || "#000000",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="md:flex-1 flex justify-between items-center pt-[6px]">
                <p className="flex items-center text-gray200 text-xs font-medium">
                  <span>
                    <Image
                      src="/images/icons/icon_calendar.svg"
                      width={18}
                      height={18}
                      alt="캘린더"
                    />
                  </span>
                  {new Date(card.dueDate)
                    .toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })
                    .replace(/\.$/, "")}
                </p>
                <p className="overflow-hidden relative w-[34px] h-[34px] rounded-full bg-slate-500">
                  {card.assignee.nickname}
                </p>
              </div>
            </div>
          </div>
        </button>
      ))}
      {selectedCard && (
        <CardDetailModal
          {...selectedCard}
          isOpen={isOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default CardList;
