import CreateTodoForm from "@/components/DashBoard/CreateTodoForm";
import TodoModalLayout from "@/components/Layout/TodoModalLayout";
import { TodoModalProps } from "@/types/dashboards";

const CreateTodoModal = ({
  columnId,
  isOpen,
  onClose,
  dashboardId,
}: TodoModalProps) => {
  if (!isOpen) return null;

  return (
    <TodoModalLayout text="할 일 생성">
      <CreateTodoForm
        columnId={columnId}
        onClose={onClose}
        dashboardId={dashboardId}
      />
    </TodoModalLayout>
  );
};

export default CreateTodoModal;
