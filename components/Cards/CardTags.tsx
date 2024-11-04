import React from "react";
import { hexToRgba } from "@/utils/TodoForm";

// CardTags 컴포넌트의 props 타입 정의
interface CardTagsProps {
  tags: string[]; // 카드에 할당된 태그 목록
  tagColors: Record<string, string>; // 태그와 색상 매핑
}

const CardTags: React.FC<CardTagsProps> = ({ tags, tagColors }) => (
  <ul className="tags flex items-center gap-[6px] mt-[6px]">
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
