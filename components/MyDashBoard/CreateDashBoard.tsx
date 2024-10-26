import React from "react";
import Portal from "../UI/modal/ModalPotal";
import ModalLayout from "../Layout/ModalLayout";

interface DashBoardProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateDashBoard = ({ isOpen, onClose }: DashBoardProps) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <ModalLayout>
        <div>
          <div>새로운 대쉬보드 생성</div>
          <div>
            <button onClick={onClose}>취소</button>
            <button onClick={onClose}>생성</button>
          </div>
        </div>
      </ModalLayout>
    </Portal>
  );
};

export default CreateDashBoard;
