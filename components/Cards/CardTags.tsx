import React from "react";
import { hexToRgba } from "@/utils/TodoForm";

interface CardTagsProps {
  tags: string[];
  tagColors: Record<string, string>;
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
