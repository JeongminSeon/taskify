// Card.tsx
import React from "react";
import { Card as CardType } from "@/types/cards";
import CardImage from "./CardImage";
import CardTags from "./CardTags";
import CardDueDate from "./CardDueDate";
import Image from "next/image";

// 카드 컴포넌트의 props 타입 정의
interface CardProps {
  card: CardType; // 카드 데이터
  tagColors: Record<string, string>; // 태그 색상 정보
  onClick: () => void; // 카드 클릭 시 실행될 함수
}

const Card: React.FC<CardProps> = ({ card, tagColors, onClick }) => (
  <div
    className="w-full p-3 border rounded-md bg-white border-gray400 lg:block md:flex md:gap-5 cursor-pointer"
    onClick={onClick}
  >
    <CardImage imageUrl={card.imageUrl} />
    <div className="w-full pt-1 lg:pt-[15px] md:pt-0">
      <h2 className="text-left font-medium sm:text-sm md:text-[16px]">
        {card.title}
      </h2>
      <div className="gap-4 md:flex lg:block">
        <CardTags tags={card.tags} tagColors={tagColors} />
        <div className="flex items-center justify-between pt-[6px] md:flex-1">
          <CardDueDate dueDate={card.dueDate} />
          <div className="relative w-[34px] h-[34px] overflow-hidden rounded-full">
            <Image
              src={card.assignee.profileImageUrl || "/default-profile.png"}
              alt={`${card.assignee.nickname}의 프로필`}
              fill
              sizes="34px"
              className="object-cover"
              priority={false}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Card;
