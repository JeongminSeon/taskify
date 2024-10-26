import React, { useState, useEffect } from "react";
import { TodoFormProps, TodoModalProps } from "@/types/dashboards";
import TodoButton from "./TodoButton";
import "react-datepicker/dist/react-datepicker.css";
import { INITIAL_VALUES, validateForm } from "@/utils/TodoForm";
import useImagePreview from "@/hooks/dashboard/useImagePreview";
import { createCardImage } from "@/utils/api/columnsApi";
import { createCard } from "@/utils/api/cardsApi";
import { CreateCardBody } from "@/types/cards";
import TitleInput from "./inputs/TitleInput";
import DescriptionInput from "./inputs/DescriptionInput";
import DateInput from "./inputs/DateInput";
import TagInput from "./inputs/TagInput";
import ImageUpload from "./ImageUpload";
import UserInput from "./inputs/UserInput";
import { format } from "date-fns";

const DASHBOARD_ID = 12060;

const TodoForm = ({
  columnId,
  onClose,

  data = INITIAL_VALUES,
}: TodoModalProps) => {
  const [formData, setFormData] = useState<TodoFormProps>(data);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const preview = useImagePreview(
    formData.imageUrl ? formData.imageUrl[0] : null
  );

  useEffect(() => {
    const isFormComplete =
      formData.assigneeUserId &&
      formData.title &&
      formData.description &&
      formData.dueDate &&
      formData.tags.length > 0 &&
      formData.imageUrl !== null;
    setIsButtonDisabled(!isFormComplete);
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formData)) {
      console.error("폼 유효성 검사 실패");
      return;
    }

    try {
      const file = formData.imageUrl ? formData.imageUrl[0] : null;
      const updatedImage = await createCardImage({ columnId, image: file! });

      if (!updatedImage || !updatedImage.imageUrl) {
        throw new Error("이미지 업로드 실패");
      }

      const outputData: CreateCardBody = {
        assigneeUserId: formData.assigneeUserId,
        dashboardId: DASHBOARD_ID,
        columnId,
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate
          ? format(formData.dueDate, "yyyy-MM-dd HH:mm")
          : "",
        tags: formData.tags.map((tag) => tag.text),
        imageUrl: updatedImage.imageUrl,
      };

      try {
        await createCard(outputData);

        setFormData(INITIAL_VALUES);
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
      <UserInput
        value={formData.assigneeUserId}
        onChange={(value) =>
          setFormData({ ...formData, assigneeUserId: Number(value) })
        }
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
        onChange={(date) => setFormData({ ...formData, dueDate: date! })}
      />
      <TagInput formData={formData} setFormData={setFormData} />

      <ImageUpload
        setFormData={setFormData}
        preview={preview}
        columnId={columnId}
      />

      <TodoButton onClose={onClose} text="생성" disabled={isButtonDisabled} />
    </form>
  );
};

export default TodoForm;
