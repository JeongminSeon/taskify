import ModalLayout from "@/components/Layout/ModalLayout";
import Portal from "./ModalPotal";

interface ModalAlertProps {
  isOpen: boolean;
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onConfirm?: () => void;
  text: string;
}

const ModalAlert = ({ isOpen, onClose, onConfirm, text }: ModalAlertProps) => {
  if (!isOpen) return null;

  const handleConfirmClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose(e);
    }
  };

  return (
    <Portal>
      <ModalLayout>
        <div className="flex flex-col justify-center items-center bg-white rounded-2xl md:w-[368px] md:h-48 sm:w-[272px] sm:h-[164px]">
          <p className="md:text-[20px] sm:text-[16px] font-[500] mb-8">
            {text}
          </p>
          <button
            className="bg-purple100 text-white md:px-[106px] md:py-[11px] sm:px-[84px] sm:py-[9px] rounded-lg hover:opacity-85"
            onClick={handleConfirmClick}
          >
            닫기
          </button>
        </div>
      </ModalLayout>
    </Portal>
  );
};

export default ModalAlert;
