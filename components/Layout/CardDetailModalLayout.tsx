import React from "react";
import { styles } from "../UI/modal/CardModal/styles";

interface CardDetailModalLayoutProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CardDetailModalLayout = ({
  isOpen,
  onClose,
  children,
}: CardDetailModalLayoutProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      {children}
    </div>
  );
};

export default CardDetailModalLayout;
