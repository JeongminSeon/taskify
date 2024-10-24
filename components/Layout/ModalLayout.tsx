import { ReactNode } from "react";

const ModalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      {children}
    </div>
  );
};

export default ModalLayout;
