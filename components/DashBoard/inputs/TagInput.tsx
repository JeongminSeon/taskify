import React, { useEffect, useRef, useState } from "react";
import { boxStyle, inputStyle, labelStyle } from "../styles";
import TodoTagList from "../TodoTagList";

interface TagInputProps {
  value: string[];
}

export interface TempTagsProps {
  text: string;
  id: number;
}

const TagInput = ({ value }: TagInputProps) => {
  const [tag, setTag] = useState<string>("");
  const [tempTags, setTempTags] = useState<TempTagsProps[]>([]);
  const idRef = useRef<number>(0);

  useEffect(() => {
    setTempTags(
      value.map((item) => ({
        text: item,
        id: idRef.current++,
      }))
    );
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tag.length > 0) {
      e.preventDefault();
      const newTag = {
        text: tag,
        id: idRef.current++,
      };
      setTempTags((prevData) => ({
        ...prevData,
        tags: [...prevData, newTag],
      }));
      setTag("");
    }
  };

  const handleDelete = (id: number) => {
    const nextTags = tempTags.filter((item) => item.id !== id);
    setTempTags(nextTags);
  };

  return (
    <div className={`${boxStyle}`}>
      <label className={`${labelStyle}`} htmlFor="tag">
        태그
      </label>
      <input
        className={`${inputStyle}`}
        name="tag"
        id="tag"
        type="text"
        placeholder="입력 후 Enter"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <TodoTagList tags={tempTags} onDelete={handleDelete} />
    </div>
  );
};

export default TagInput;
