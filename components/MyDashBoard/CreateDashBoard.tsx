import React from "react";
import Portal from "../UI/modal/ModalPotal";
import ModalLayout from "../Layout/ModalLayout";

interface DashBoardProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateDashBoard = ({ isOpen, onClose }: DashBoardProps) => {
  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Portal>
      <ModalLayout>
        <div className="bg-white rounded-2xl md:w-[584px] p-5">
          <h2>새로운 대시보드 생성</h2>
          <form onSubmit={handleSubmit}>
            <h3>대시보드 이름</h3>
            <div className="flex gap-1">
              <li>그린</li>
              <li>블루</li>
              <li>주황</li>
              <li>파랑</li>
              <li>핑크</li>
            </div>
          </form>
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
