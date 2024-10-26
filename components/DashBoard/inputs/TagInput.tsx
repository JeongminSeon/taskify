import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { boxStyle, inputStyle, labelStyle } from "../styles";
import TodoTagList from "../TodoTagList";

interface TagInputProps {
  value: string[];
  onChange: (tags: TempTagsProps[]) => void;
}

export interface TempTagsProps {
  text: string;
  id: string;
}

const TagInput = ({ value, onChange }: TagInputProps) => {
  const [tag, setTag] = useState<string>("");
  const [tempTags, setTempTags] = useState<TempTagsProps[]>([]);

  useEffect(() => {
    setTempTags(
      value.map((item) => ({
        text: item,
        id: uuidv4(),
      }))
    );
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tag.trim().length > 0) {
      e.preventDefault();
      const newTag = {
        text: tag,
        id: uuidv4(),
      };
      const updatedTags = [...tempTags, newTag];
      setTempTags(updatedTags);
      onChange(updatedTags);
      setTag("");
    }
  };

  const handleDelete = (id: string) => {
    const nextTags = tempTags.filter((item) => item.id !== id);
    setTempTags(nextTags);
    onChange(nextTags);
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
