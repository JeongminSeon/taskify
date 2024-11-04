import React from "react";
import Image from "next/image";

// CardDueDate 컴포넌트의 props 타입 정의
interface CardDueDateProps {
  dueDate: string;
}

const CardDueDate: React.FC<CardDueDateProps> = ({ dueDate }) => (
  <p className="flex items-center text-gray200 text-xs font-medium">
    <span>
      <Image
        src="/images/icons/icon_calendar.svg"
        width={18}
        height={18}
        alt="캘린더"
      />
    </span>
    {new Date(dueDate)
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })
      .replace(/\.$/, "")}{" "}
  </p>
);

export default CardDueDate;
