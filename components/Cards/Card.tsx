import Image from "next/image";
import { getRandomColor, hexToRgba } from "@/utils/TodoForm";
import { Card as CardType } from "@/types/cards";
import useModal from "@/hooks/useModal";
import Portal from "../UI/modal/ModalPotal";
import UpdateTodoModal from "../UI/modal/UpdateTodoModal";
import { v4 as uuidv4 } from "uuid";

interface CardProps {
  card: CardType;
  id: number;
  dashboardId: number;
}

const Card: React.FC<CardProps> = ({ card, id, dashboardId }) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <li
      onClick={openModal}
      className="md:flex md:gap-5 lg:block p-3 border border-gray400 rounded-md bg-white100 cursor-pointer"
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
        <h2 className="sm:text-sm md:text-[16px] font-medium">{card.title}</h2>
        <div className="md:flex lg:block gap-4">
          <div className="tags flex items-center gap-[6px] mt-[6px]">
            {card.tags.map((tag) => {
              const tagColor = getRandomColor();
              return (
                <span
                  key={uuidv4()}
                  className="tag py-1 px-[6px] rounded"
                  style={{
                    backgroundColor: hexToRgba(tagColor, 0.2),
                    color: tagColor,
                  }}
                >
                  {tag}
                </span>
              );
            })}
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
      {isOpen && (
        <Portal>
          <UpdateTodoModal
            cardId={id}
            isOpen={isOpen}
            onClose={closeModal}
            dashboardId={dashboardId}
          />
        </Portal>
      )}
    </li>
  );
};

export default Card;
