import Image from "next/image";
import CardList from "@/components/Cards/CardList";
import useModal from "@/hooks/useModal";
import CreateTodoModal from "@/components/UI/modal/CreateTodoModal";
import { MemberProps } from "@/types/dashboards";

interface ColumnProps {
  id: number;
  title: string;
  members: MemberProps[];
}

const Column: React.FC<ColumnProps> = ({ id, title, members }) => {
  const { isOpen, openModal, closeModal } = useModal();

  const handleAddColumn = () => {
    openModal();
  };
  return (
    <div className="columnList flex-1 h-screen py-4 px-3 md:p-5 sm:border-b border-r border-[gray600]">
      <h2 className="flex items-center gap-2 text-black100 font-bold">
        <span className="block w-2 h-2 rounded-full bg-purple100"></span>
        <p className="flex-1">{title}</p>
        <span>
          <Image
            src="/images/icons/icon_settings.svg"
            width={22}
            height={22}
            alt="설정"
          />
        </span>
      </h2>
      <button
        type="button"
        className="block w-full h-8 md:h-10 mt-6 border border-gray400 rounded-md bg-white100"
        onClick={handleAddColumn}
      >
        <Image
          src="/images/icons/icon_add_column.svg"
          width={16}
          height={16}
          alt="할 일 추가"
          className="mx-auto"
        />
      </button>
      <CardList columnId={id} />
      {isOpen && (
        <CreateTodoModal
          members={members}
          isOpen={isOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Column;
