import React, { useState, useEffect } from "react";
import { TodoFormProps, TodoModalProps } from "@/types/dashboards";
import TodoButton from "./TodoButton";
import "react-datepicker/dist/react-datepicker.css";
import { INITIAL_VALUES, validateForm } from "@/utils/TodoForm";
import useImagePreview from "@/hooks/dashboard/useImagePreview";
import { CreateCardBody } from "@/types/cards";
import TitleInput from "../inputs/TitleInput";
import DescriptionInput from "../inputs/DescriptionInput";
import DateInput from "../inputs/DateInput";
import TagInput from "../inputs/TagInput";
import ImageInput from "../inputs/ImageInput";
import UserInput from "../inputs/UserInput";
import ColumnInput from "../inputs/ColumnInput";
import { getCard, updateCard } from "@/utils/api/cardsApi";
import { useDashBoardStore } from "@/store/dashBoardStore";

const UpdateTodoForm = ({
  cardId,
  onClose,
  onUpdateCard,
  onRefresh,
}: TodoModalProps) => {
  const [formData, setFormData] = useState<TodoFormProps>(INITIAL_VALUES);
  const preview = useImagePreview(formData.imageUrl ? formData.imageUrl : null);
  const { dashboardId } = useDashBoardStore();

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
        throw error;
      }
    };

    fetchData();
  }, [cardId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formData)) {
      return;
    }

    if (!dashboardId) return;
    try {
      const outputData: CreateCardBody = {
        assigneeUserId: formData.assigneeUserId,
        dashboardId,
        columnId: formData.columnId,
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        tags: formData.tags,
        imageUrl: formData.imageUrl,
      };

      try {
        if (!cardId) return;
        const updatedCard = await updateCard({ cardId, formData: outputData });
        onUpdateCard?.(updatedCard);
        onRefresh!();
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
      <div className="flex md:flex-row md:gap-8 sm:flex-col sm:gap-0">
        <ColumnInput
          value={formData.columnId}
          onChange={(value) =>
            setFormData({ ...formData, columnId: Number(value) })
          }
          dashboardId={dashboardId || 0}
        />

        <UserInput
          value={formData.assigneeUserId}
          onChange={(value) =>
            setFormData({ ...formData, assigneeUserId: Number(value) })
          }
          dashboardId={dashboardId || 0}
        />
      </div>

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
        <ImageInput
          setFormData={setFormData}
          preview={preview}
          columnId={formData.columnId}
        />
      )}

      <TodoButton
        onClose={onClose}
        text="수정"
        disabled={!validateForm(formData)}
      />
    </form>
  );
};

export default UpdateTodoForm;
