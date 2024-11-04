import ModalLayout from "@/components/Layout/ModalLayout";
import Portal from "./ModalPotal";

interface ModalAlertProps {
  isOpen: boolean;
  onClose: () => void; // 이벤트 객체 제거
  onConfirm?: () => void;
  text: string;
  type?: "alert" | "confirm";
}

const ModalAlert = ({
  isOpen,
  onClose,
  onConfirm,
  text,
  type = "alert",
}: ModalAlertProps) => {
  if (!isOpen) return null;

  const handleConfirmClick = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

  return (
    <Portal>
      <ModalLayout>
        <div className="flex flex-col justify-center items-center bg-white rounded-2xl md:w-[368px] md:h-48 sm:w-[272px] sm:h-[164px]">
          <p className="md:text-[20px] sm:text-[16px] font-[500] mb-8">
            {text}
          </p>
          <div className="flex gap-2">
            <button
              className={`md:px-[40px] md:py-[11px] sm:px-[30px] sm:py-[9px] rounded-lg hover:opacity-85 ${
                type === "confirm"
                  ? "bg-white100 text-black border border-[gray500]"
                  : "bg-purple100 text-white"
              }`}
              onClick={onClose}
            >
              닫기
            </button>
            {type === "confirm" && (
              <button
                className="bg-purple100 text-white md:px-[40px] md:py-[11px] sm:px-[30px] sm:py-[9px] rounded-lg hover:opacity-85"
                onClick={handleConfirmClick}
              >
                확인
              </button>
            )}
          </div>
        </div>
      </ModalLayout>
    </Portal>
  );
};

export default ModalAlert;
