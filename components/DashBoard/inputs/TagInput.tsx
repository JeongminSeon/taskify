import React, { useRef, useState } from "react";
import { boxStyle, inputStyle, labelStyle } from "../styles";
import TodoTagList from "../TodoTagList";
import { TodoFormProps } from "@/types/dashboards";

interface TagInputProps {
  formData: TodoFormProps;
  setFormData: React.Dispatch<React.SetStateAction<TodoFormProps>>;
}

const TagInput = ({ formData, setFormData }: TagInputProps) => {
  const [tag, setTag] = useState<string>("");
  const idRef = useRef<number>(0);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tag.length > 0) {
      e.preventDefault();
      const newTag = {
        text: tag,
        id: idRef.current++,
      };
      setFormData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, newTag],
      }));
      setTag("");
    }
  };

  const handleDelete = (id: number) => {
    const nextTags = formData.tags.filter((item) => item.id !== id);
    setFormData((prevData) => ({
      ...prevData,
      tags: nextTags,
    }));
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
      <TodoTagList formData={formData} onDelete={handleDelete} />
    </div>
  );
};

export default TagInput;
