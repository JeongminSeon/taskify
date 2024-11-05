import { ReactNode } from "react";

// TodoModalLayout 컴포넌트 정의
const TodoModalLayout = ({
  text, // 모달 제목 (optional)
  children, // 모달 내부에 렌더링할 자식 요소
}: {
  text?: string; // 텍스트는 선택 사항
  children: ReactNode; // 자식 요소는 필수
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center bg-white rounded-2xl md:w-[584px] md:h-[966px] sm:w-[327px] sm:h-[100%] md:px-8 md:py-8 sm:px-5 sm:py-5">
        <div className="overflow-y-auto scrollbar-hidden">
          <h2 className="md:text-[24px] sm:text-[20px] font-[700] md:mb-8 sm:mb-6">
            {text}
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default TodoModalLayout;
