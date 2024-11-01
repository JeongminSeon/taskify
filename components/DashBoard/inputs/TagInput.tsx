import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { boxStyle, inputStyle, labelStyle } from "../styles";
import TodoTagList from "../todo/TodoTagList";

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

  const handleAddTag = () => {
    const trimmedTag = tag.trim();
    if (trimmedTag.length > 0) {
      const newTag = {
        text: trimmedTag,
        id: uuidv4(),
      };
      const updatedTags = [...tempTags, newTag];
      setTempTags(updatedTags);
      onChange(updatedTags);
      setTag("");
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.nativeEvent.isComposing) return; // 한글 입력 중에는 엔터키 이벤트를 무시
      handleAddTag();
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 엔터 키가 포함된 입력값 필터링
    const value = e.target.value.replace(/[\n\r]/g, "");
    setTag(value);
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
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      <TodoTagList tags={tempTags} onDelete={handleDelete} />
    </div>
  );
};

export default TagInput;
