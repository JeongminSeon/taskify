import OneInputModal from "@/components/UI/modal/InputModal/OneInputModal";
import Portal from "@/components/UI/modal/ModalPotal";
import useModal from "@/hooks/modal/useModal";
import Image from "next/image";

const ColumnHeader = ({ title }: { title: string }) => {
  const {
    isOpen,
    inputValue,
    openModal: handleSettingColumn,
    closeModal,
    handleInputChange,
    handleConfirm: handleModalConfirm,
  } = useModal();

  const handleUpdateColumn = () => {
    console.log("update column");
  };

  const handleDeleteColumn = () => {
    console.log("delete column");
  };
  return (
    <h2 className="flex items-center gap-2 text-black100 font-bold">
      <span className="block w-2 h-2 rounded-full bg-purple100"></span>
      <p className="flex-1">컬럼 이름</p>
      <button type="button" onClick={handleSettingColumn}>
        <Image
          src="/images/icons/icon_settings.svg"
          width={22}
          height={22}
          alt="설정"
        />
      </button>
      {isOpen && (
        <Portal>
          <OneInputModal
            isOpen={isOpen}
            modalTitle="컬럼 관리"
            inputLabel="이름"
            inputPlaceholder={title}
            onCancel={() => closeModal()}
            cancelButtonText="삭제"
            onConfirm={() => handleModalConfirm(handleUpdateColumn)}
            confirmButtonText="변경"
            inputValue={inputValue}
            onInputChange={handleInputChange}
          />
        </Portal>
      )}
    </h2>
  );
};

export default ColumnHeader;
