import React from "react";
import { hexToRgba } from "@/utils/TodoForm";

// CardTags 컴포넌트의 props 타입 정의
interface CardTagsProps {
  tags: string[]; // 카드에 할당된 태그 목록
  tagColors: Record<string, string>; // 태그와 색상 매핑
}

// 카드의 태그를 표시하는 컴포넌트 정의
const CardTags: React.FC<CardTagsProps> = ({ tags, tagColors }) => (
  <ul className="tags flex items-center gap-[6px] mt-[6px]">
    {/* 각 태그를 리스트 항목으로 표시 */}
    {tags.map((tag) => (
      <li
        key={tag}
        className="tag py-1 px-[6px] rounded"
        style={{
          backgroundColor: hexToRgba(tagColors[tag] || "#000000", 0.2),
          color: tagColors[tag] || "#000000",
        }}
      >
        {tag}
      </li>
    ))}
  </ul>
);

export default CardTags;
