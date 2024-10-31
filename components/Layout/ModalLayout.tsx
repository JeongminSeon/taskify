import { ReactNode } from "react";

const ModalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center bg-white rounded-2xl md:px-8 md:py-8 sm:px-5 sm:py-5">
        <div className="overflow-y-auto scrollbar-hidden">{children}</div>
      </div>
    </div>
  );
};

export default ModalLayout;
