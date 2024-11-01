import CreateTodoForm from "@/components/DashBoard/todo/CreateTodoForm";
import TodoModalLayout from "@/components/Layout/TodoModalLayout";
import { TodoModalProps } from "@/types/dashboards";

const CreateTodoModal = ({ isOpen, onClose, onCreateCard }: TodoModalProps) => {
  if (!isOpen) return null;

  return (
    <TodoModalLayout text="할 일 생성">
      <CreateTodoForm onClose={onClose} onCreateCard={onCreateCard} />
    </TodoModalLayout>
  );
};

export default CreateTodoModal;
