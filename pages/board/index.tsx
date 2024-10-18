import React, { useState } from "react";
import Portal from "@/components/UI/modal/ModalPotal";
import { TestModal } from "@/components/UI/modal/TestModal";

const TestPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='p-4'>
      <button
        onClick={openModal}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        모달 열기
      </button>
      <Portal>
        <TestModal isOpen={isModalOpen} onClose={closeModal} />
      </Portal>
    </div>
  );
};

export default TestPage;
