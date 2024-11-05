import { styles } from "../UI/modal/CardModal/styles";
import React from "react";

// 카드 상세 모달 레이아웃 인터페이스 정의
interface CardDetailModalLayoutProps {
  isOpen: boolean; // 모달의 열림 상태
  onClose: () => void; // 모달 닫기 함수
  children: React.ReactNode; // 모달 안에 포함될 자식 요소
}

// 카드 상세 모달 레이아웃 컴포넌트
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
