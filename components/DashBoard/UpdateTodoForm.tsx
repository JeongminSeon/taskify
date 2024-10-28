import React, { useState, useEffect } from "react";
import { TodoFormProps, TodoModalProps } from "@/types/dashboards";
import TodoButton from "./TodoButton";
import "react-datepicker/dist/react-datepicker.css";
import { INITIAL_VALUES, validateForm } from "@/utils/TodoForm";
import useImagePreview from "@/hooks/dashboard/useImagePreview";

import { getCard, UpdateCard } from "@/utils/api/cardsApi";
import { CreateCardBody } from "@/types/cards";
import TitleInput from "./inputs/TitleInput";
import DescriptionInput from "./inputs/DescriptionInput";
import DateInput from "./inputs/DateInput";
import TagInput from "./inputs/TagInput";
import ImageUpload from "./ImageUpload";
import UserInput from "./inputs/UserInput";

const UpdateTodoForm = ({ cardId, onClose, dashboardId }: TodoModalProps) => {
  const [formData, setFormData] = useState<TodoFormProps>(INITIAL_VALUES);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const preview = useImagePreview(formData.imageUrl ? formData.imageUrl : null);

  useEffect(() => {
    if (!cardId) return;

    const fetchData = async () => {
      try {
        const data = await getCard({ cardId });
        setFormData({
          assigneeUserId: data.assignee.id,
          title: data.title,
          description: data.description,
          dueDate: data.dueDate,
          tags: data.tags,
          imageUrl: data.imageUrl,
          columnId: data.columnId,
        });
      } catch (error) {
        console.error("카드 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [cardId]);

  useEffect(() => {
    const isFormComplete =
      formData.assigneeUserId &&
      formData.title &&
      formData.description &&
      formData.dueDate &&
      formData.tags.length > 0 &&
      formData.imageUrl !== "";
    setIsButtonDisabled(!isFormComplete);
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formData)) {
      console.error("폼 유효성 검사 실패");
      return;
    }

    const columnId = formData.columnId;

    if (!columnId) return;
    if (!dashboardId) return;
    try {
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

      try {
        if (!cardId) return;
        await UpdateCard({ cardId, formData: outputData });
        onClose();
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error("제출 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <form className="flex flex-col w-full text-[16px]" onSubmit={handleSubmit}>
      {/* <ColumnInput value={formData.columnId}/> dashboardId={dashboardId || 0}*/}

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

      {formData.columnId && (
        <ImageUpload
          setFormData={setFormData}
          preview={preview}
          columnId={formData.columnId}
        />
      )}

      <TodoButton onClose={onClose} text="수정" disabled={isButtonDisabled} />
    </form>
  );
};

export default UpdateTodoForm;
