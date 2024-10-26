import UpdateTodoForm from "@/components/DashBoard/UpdateTodoForm";
import TodoModalLayout from "@/components/Layout/TodoModalLayout";
import { TodoModalProps } from "@/types/dashboards";

const UpdateTodoModal = ({
  cardId,
  isOpen,
  onClose,
  dashboardId,
}: TodoModalProps) => {
  if (!isOpen) return null;

  return (
    <TodoModalLayout text="할 일 수정">
      <UpdateTodoForm
        cardId={cardId}
        onClose={onClose}
        dashboardId={dashboardId}
      />
    </TodoModalLayout>
  );
};

export default UpdateTodoModal;
