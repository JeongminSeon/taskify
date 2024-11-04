import Image from "next/image";

// AddCardButton 컴포넌트 정의
const AddCardButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      type="button"
      className="block w-full h-8 md:h-10 mt-6 border border-gray400 rounded-md bg-white100"
      onClick={onClick}
    >
      <Image
        src="/images/icons/icon_add_column.svg"
        width={16}
        height={16}
        alt="할 일 추가"
        className="mx-auto"
      />
    </button>
  );
};

export default AddCardButton;
