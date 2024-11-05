import React, { useState } from "react";
import { TodoFormProps, TodoModalProps } from "@/types/dashboards";
import { INITIAL_VALUES, validateForm } from "@/utils/TodoForm";
import { createCard } from "@/utils/api/cardsApi";
import { CreateCardBody } from "@/types/cards";
import { useDashBoardStore } from "@/store/dashBoardStore";
import { useColumnStore } from "@/store/columnStore";
import TodoButton from "./TodoButton";
import "react-datepicker/dist/react-datepicker.css";
import useImagePreview from "@/hooks/dashboard/useImagePreview";
import TitleInput from "../inputs/TitleInput";
import DescriptionInput from "../inputs/DescriptionInput";
import DateInput from "../inputs/DateInput";
import TagInput from "../inputs/TagInput";
import ImageInput from "../inputs/ImageInput";
import UserInput from "../inputs/UserInput";

// CreateTodoForm 컴포넌트 정의
const CreateTodoForm = ({ onClose, onCreateCard }: TodoModalProps) => {
  const [formData, setFormData] = useState<TodoFormProps>(INITIAL_VALUES); // 폼 데이터 상태
  const preview = useImagePreview(formData.imageUrl ? formData.imageUrl : null); // 이미지 미리보기
  const { dashboardId } = useDashBoardStore(); // 대시보드 ID 가져오기
  const { columnId } = useColumnStore(); // column ID 가져오기

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formData)) {
      return;
    }

    if (!columnId) return; // column ID가 없으면 리턴
    if (!dashboardId) return; // 대시보드 ID가 없으면 리턴
    try {
      // 카드 생성 데이터 준비
      const outputData: CreateCardBody = {
        assigneeUserId: formData.assigneeUserId,
        dashboardId,
        columnId,
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        tags: formData.tags,
        imageUrl: formData.imageUrl,
      };

      // 카드 생성 API 호출
      try {
        const newCard = await createCard(outputData);
        onCreateCard?.(newCard); // 카드 생성 후 콜백 호출
        setFormData(INITIAL_VALUES); // 폼 초기화
        onClose();
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <form className="flex flex-col w-full text-[16px]" onSubmit={handleSubmit}>
      <UserInput
        value={formData.assigneeUserId}
        onChange={(value) =>
          setFormData({ ...formData, assigneeUserId: Number(value) })
        }
        dashboardId={dashboardId || 0}
      />

      <TitleInput
        value={formData.title}
        onChange={(value) => setFormData({ ...formData, title: value })}
      />
      <DescriptionInput
        value={formData.description}
        onChange={(value) => setFormData({ ...formData, description: value })}
      />
      <DateInput
        value={formData.dueDate}
        onChange={(date) => setFormData({ ...formData, dueDate: date })}
      />

      <TagInput
        value={formData.tags}
        onChange={(tags) =>
          setFormData({ ...formData, tags: tags.map((tag) => tag.text) })
        }
      />

      {columnId && (
        <ImageInput
          setFormData={setFormData}
          preview={preview}
          columnId={columnId}
        />
      )}

      <TodoButton
        onClose={onClose}
        text="생성"
        disabled={!validateForm(formData)}
      />
    </form>
  );
};

export default CreateTodoForm;
