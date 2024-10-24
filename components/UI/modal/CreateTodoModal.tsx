import TodoForm from "@/components/DashBoard/TodoForm";
import ModalLayout from "@/components/Layout/ModalLayout";
import { MemberProps } from "@/types/dashboards";

const CreateTodoModal = ({
  members,
  isOpen,
  onClose,
}: {
  members: MemberProps[];
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <ModalLayout>
      <div className="flex flex-col justify-center items-center bg-white rounded-2xl md:w-[584px] md:h-[1000px] sm:w-[327px] sm:h-[766px] md:px-8 md:py-8 sm:px-5 sm:py-5">
        <div className="overflow-y-auto scrollbar-hidden">
          <h2 className="md:text-[24px] sm:text-[20px] font-[700] md:mb-8 sm:mb-6">
            할 일 생성
          </h2>
          <TodoForm members={members} onClose={onClose} />
        </div>
      </div>
    </ModalLayout>
  );
};

export default CreateTodoModal;
