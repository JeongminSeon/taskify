import { ReactNode } from "react";

const TodoModalLayout = ({
  text,
  children,
}: {
  text: string;
  children: ReactNode;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center bg-white rounded-2xl md:w-[584px] md:h-[1000px] sm:w-[327px] sm:h-[766px] md:px-8 md:py-8 sm:px-5 sm:py-5">
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
