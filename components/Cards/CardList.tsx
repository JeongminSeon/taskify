import { useEffect, useState } from "react";
import { Card, CardListResponse } from "@/types/cards";
import { getCards } from "@/utils/api/cardsApi";
import Image from "next/image";

interface CardListProps {
  columnId: number;
}

const CardList: React.FC<CardListProps> = ({ columnId }) => {
  const [cards, setCards] = useState<Card[]>([]);

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
    <ul className="mt-[10px]">
      {cards.map((card) => (
        <li
          key={card.id}
          className="md:flex md:gap-5 lg:block p-3 border border-gray400 rounded-md bg-white100"
        >
          <div className="overflow-hidden relative w-full h-40 md:flex-[0_0_90px] lg:flex-1 md:h-auto lg:h-40 rounded-md">
            <Image
              src={card.imageUrl || "/images/resource/card_image1.png"}
              layout="fill"
              objectFit="cover"
              alt="카드 이미지"
            />
          </div>
          <div className="w-full pt-1 md:pt-0 lg:pt-[15px]">
            <h2 className="sm:text-sm md:text-[16px] font-medium">
              {card.title}
            </h2>
            <div className="md:flex lg:block gap-4">
              <div className="tags flex items-center gap-[6px] mt-[6px]">
                {card.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="tag py-1 px-[6px] rounded bg-[#F9EEE3] text-xs "
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
                    .replace(/\.$/, "")}{" "}
                  {/* 맨 뒤의 점(.) 제거 */}
                </p>
                <p className="overflow-hidden relative w-[34px] h-[34px] rounded-full bg-slate-500">
                  {card.assignee.nickname}
                </p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CardList;
