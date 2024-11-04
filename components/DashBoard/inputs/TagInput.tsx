import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { boxStyle, inputStyle, labelStyle } from "../styles";
import TodoTagList from "../todo/TodoTagList";

// TagInputProps 인터페이스 정의
interface TagInputProps {
  value: string[]; // 태그 배열
  onChange: (tags: TempTagsProps[]) => void; // 태그 변경 핸들러
}

// TempTagsProps 인터페이스 정의
export interface TempTagsProps {
  text: string; // 태그 텍스트
  id: string; // 태그 ID
}

const TagInput = ({ value, onChange }: TagInputProps) => {
  const [tag, setTag] = useState<string>(""); // 현재 입력 중인 태그 상태
  const [tempTags, setTempTags] = useState<TempTagsProps[]>([]); // 태그 리스트 상태

  // value가 변경될 때마다 tempTags 업데이트
  useEffect(() => {
    setTempTags(
      value.map((item) => ({
        text: item,
        id: uuidv4(), // 각 태그에 고유 ID 생성
      }))
    );
  }, [value]);

  // 태그 추가 함수
  const handleAddTag = () => {
    const trimmedTag = tag.trim(); // 공백 제거
    if (trimmedTag.length > 0) {
      // 유효한 태그인지 확인
      const newTag = {
        text: trimmedTag,
        id: uuidv4(), // 새로운 태그에 고유 ID 생성
      };
      const updatedTags = [...tempTags, newTag]; // 태그 리스트 업데이트
      setTempTags(updatedTags);
      onChange(updatedTags); // 부모 컴포넌트에 변경 사항 알림
      setTag(""); // 입력 필드 초기화
    }
  };

  // 키 입력 처리 함수
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.nativeEvent.isComposing) return; // 한글 입력 중에는 엔터키 이벤트를 무시
      handleAddTag(); // 태그 추가 함수 호출
    }
  };

  // 입력 필드 변화 처리 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 엔터 키가 포함된 입력값 필터링
    const value = e.target.value.replace(/[\n\r]/g, ""); // 개행 문자 제거
    setTag(value); // 상태 업데이트
  };

  // 태그 삭제 함수
  const handleDelete = (id: string) => {
    const nextTags = tempTags.filter((item) => item.id !== id); // 삭제할 태그 제외한 리스트
    setTempTags(nextTags); // 상태 업데이트
    onChange(nextTags); // 부모 컴포넌트에 변경 사항 알림
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
