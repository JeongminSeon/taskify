import React, { useState, useEffect } from "react";
import { TodoFormProps, TodoModalProps } from "@/types/dashboards";
import { INITIAL_VALUES, validateForm } from "@/utils/TodoForm";
import { CreateCardBody } from "@/types/cards";
import { getCard, updateCard } from "@/utils/api/cardsApi";
import { useDashBoardStore } from "@/store/dashBoardStore";
import TodoButton from "./TodoButton";
import "react-datepicker/dist/react-datepicker.css";
import useImagePreview from "@/hooks/dashboard/useImagePreview";
import TitleInput from "../inputs/TitleInput";
import DescriptionInput from "../inputs/DescriptionInput";
import DateInput from "../inputs/DateInput";
import TagInput from "../inputs/TagInput";
import ImageInput from "../inputs/ImageInput";
import UserInput from "../inputs/UserInput";
import ColumnInput from "../inputs/ColumnInput";

const UpdateTodoForm = ({
  cardId, // 수정할 카드 ID
  onClose, // 모달 닫기 함수
  onUpdateCard, // 카드 업데이트 후 호출되는 함수
  onRefresh, // 카드 목록 갱신 함수
}: TodoModalProps) => {
  const [formData, setFormData] = useState<TodoFormProps>(INITIAL_VALUES); // 폼 데이터 상태
  const preview = useImagePreview(formData.imageUrl ? formData.imageUrl : null); // 이미지 미리보기
  const { dashboardId } = useDashBoardStore(); // 대시보드 ID 가져오기

  useEffect(() => {
    if (!cardId) return; // 카드 ID가 없으면 아무것도 하지 않음

    const fetchData = async () => {
      try {
        const data = await getCard({ cardId }); // 카드 데이터 가져오기
        setFormData({
          assigneeUserId: data.assignee.id, // 담당자 ID
          title: data.title, // 제목
          description: data.description, // 설명
          dueDate: data.dueDate, // 마감일
          tags: data.tags, // 태그
          imageUrl: data.imageUrl, // 이미지 URL
          columnId: data.columnId, // 열 ID
        });
      } catch (error) {
        throw error;
      }
    };

    fetchData(); // 데이터 가져오기 호출
  }, [cardId]); // 카드 ID가 변경될 때마다 호출

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formData)) {
      return;
    }

    if (!dashboardId) return; // 대시보드 ID가 없으면 종료
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
        if (!cardId) return; // 카드 ID가 없으면 종료
        const updatedCard = await updateCard({ cardId, formData: outputData }); // 카드 업데이트
        onUpdateCard?.(updatedCard); // 업데이트된 카드 호출
        onRefresh!(); // 카드 목록 갱신
        onClose(); // 모달 닫기
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
