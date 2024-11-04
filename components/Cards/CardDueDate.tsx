import React from "react";
import Image from "next/image";

// CardDueDate 컴포넌트의 props 타입 정의
interface CardDueDateProps {
  dueDate: string;
}

// 마감일을 표시하는 컴포넌트 정의
const CardDueDate: React.FC<CardDueDateProps> = ({ dueDate }) => (
  <p className="flex items-center text-gray200 text-xs font-medium">
    {/* 캘린더 아이콘 */}
    <span>
      <Image
        src="/images/icons/icon_calendar.svg"
        width={18}
        height={18}
        alt="캘린더"
      />
    </span>
    {/* 마감일 문자열을 로컬 날짜 형식으로 변환하여 표시 */}
    {new Date(dueDate)
      .toLocaleDateString("ko-KR", {
        year: "numeric", // 연도
        month: "numeric", // 월
        day: "numeric", // 일
      })
      .replace(/\.$/, "")}{" "}
    {/* 불필요한 점(.) 제거 */}
  </p>
);

export default CardDueDate;
