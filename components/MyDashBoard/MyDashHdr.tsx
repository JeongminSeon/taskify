import { useRouter } from "next/router";
import { useAuthStore } from "@/store/authStore";
import { addInvitations } from "@/utils/api/dashboardsApi";
import { useCallback, useEffect, useState } from "react";
import { useInvitationStore } from "@/store/invitationStore";
import { removeAccessToken } from "@/utils/api/cookie";
import { useDashBoardStore } from "@/store/dashBoardStore";
import useModal from "@/hooks/modal/useModal";
import Portal from "@/components/UI/modal/ModalPotal";
import OneInputModal from "../UI/modal/InputModal/OneInputModal";
import ModalAlert from "../UI/modal/ModalAlert";
import ActionButton from "./dashHeader/ActionButton";
import UserMenu from "./dashHeader/UserMenu";
import useErrorModal from "@/hooks/modal/useErrorModal";
import useResponsiveThreshold from "@/hooks/dashboard/useResponsiveThreshold";

interface MyDashSideMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

const ITEMS_PER_PAGE = 5; // 페이지당 아이템 수
const SMALL_SCREEN_THRESHOLD = 768; // 작은 화면 임계값
const LARGE_SCREEN_THRESHOLD = 1200; // 큰 화면 임계값

const MyDashHdr: React.FC<MyDashSideMenuProps> = () => {
  const router = useRouter();
  const { dashboardsId } = router.query; // URL에서 대시보드 ID 가져오기
  const { dashboards, setDashboardId } = useDashBoardStore(); // 대시보드 상태 가져오기
  const { loadInvitations } = useInvitationStore(); // 초대 상태 가져오기
  const { user } = useAuthStore(); // 사용자 정보 가져오기
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태
  const [modalMessage, setModalMessage] = useState<string>(""); // 모달 메시지 상태
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false); // 메시지 모달 열림 상태
  const threshold = useResponsiveThreshold(
    SMALL_SCREEN_THRESHOLD,
    LARGE_SCREEN_THRESHOLD
  ); // 반응형 임계값

  // 대시보드 ID 설정
  useEffect(() => {
    setDashboardId(Number(dashboardsId));
  }, [dashboardsId, setDashboardId]);

  // 초대 모달
  const {
    isOpen: isInviteModalOpen,
    inputValue,
    openModal: openInviteModal,
    closeModal: closeInviteModal,
    handleInputChange,
    handleConfirm: handleModalConfirm,
  } = useModal();

  // 에러 메세지 모달
  const {
    isOpen: isErrorModalOpen,
    errorMessage,
    handleError,
    handleClose: closeErrorModal,
  } = useErrorModal();

  // 현재 대시보드 찾기
  const currentDashboard = dashboards.find(
    (dashboard) => dashboard.id === Number(dashboardsId)
  );

  // 대시보드 제목 설정
  const dashboardTitle = currentDashboard
    ? currentDashboard.title
    : "내 대시보드";

  // 현재 페이지가 내 대시보드인지 확인
  const isMyDashboardPage = router.pathname === "/mydashboard";

  // 유저 메뉴 항목
  const dropdownItems = [
    {
      label: "로그아웃",
      onClick: () => {
        removeAccessToken();
        router.push("/");
      },
    },
    {
      label: "내 정보",
      href: `/my`,
    },
    {
      label: "내 대시보드",
      href: `/mydashboard`,
    },
  ];

  // 초대 요청 핸들러
  const handleConfirm = useCallback(
    async (inputValue: string) => {
      try {
        await addInvitations(Number(dashboardsId), inputValue); // 초대 요청 API 호출
        setModalMessage("초대 요청을 보냈습니다."); // 성공 메시지 설정
        setIsMessageModalOpen(true); // 메시지 모달 열기
        closeInviteModal(); // 초대 모달 닫기
        loadInvitations(Number(dashboardsId), 1, ITEMS_PER_PAGE); // 초대 목록 로드
      } catch (error) {
        handleError(error);
      }
    },
    [dashboardsId, closeInviteModal, loadInvitations, handleError]
  );

  // 관리 버튼 핸들러
  const handleManageClick = () => {
    if (currentDashboard && !currentDashboard.createdByMe) {
      setModalMessage("접근 권한이 없습니다."); // 접근 권한 메시지 설정
      setIsMessageModalOpen(true); // 메시지 모달 열기
      router.push(`/dashboards/${dashboardsId}`); // 대시보드 페이지로 리다이렉트
    } else {
      router.push(`/dashboards/${dashboardsId}/edit`); // 대시보드 편집 페이지로 리다이렉트
    }
  };

  return (
    <div>
      <div className="border-b border-gray400 bg-white">
        <div className="headerWrap flex justify-between items-center w-full p-[13px_8px_13px_18px] md:px-10 md:py-[15px]">
          <h2 className="pageTitle flex-1 text-x font-bold md:text-xl lg:text-[2rem]">
            {isMyDashboardPage
              ? "내 대시보드"
              : threshold === LARGE_SCREEN_THRESHOLD
              ? dashboardTitle
              : null}
          </h2>
          <ActionButton
            onManageClick={handleManageClick}
            onInviteClick={openInviteModal}
            isMyDashboardPage={isMyDashboardPage}
          />
          <UserMenu
            user={user}
            isDropdownOpen={isDropdownOpen}
            onDropdownToggle={() => setIsDropdownOpen(!isDropdownOpen)}
            dropdownItems={dropdownItems}
          />
        </div>
      </div>

      <Portal>
        <OneInputModal
          isOpen={isInviteModalOpen}
          modalTitle="초대하기"
          inputLabel="이메일"
          inputPlaceholder="이메일을 입력해주세요"
          onCancel={closeInviteModal}
          cancelButtonText="취소"
          onConfirm={() => handleModalConfirm(handleConfirm)}
          confirmButtonText="생성"
          inputValue={inputValue}
          onInputChange={handleInputChange}
        />
      </Portal>

      {isErrorModalOpen && (
        <ModalAlert
          isOpen={isErrorModalOpen}
          onClose={closeErrorModal}
          text={errorMessage}
        />
      )}

      {isMessageModalOpen && (
        <ModalAlert
          isOpen={isMessageModalOpen}
          onClose={() => setIsMessageModalOpen(false)}
          text={modalMessage}
        />
      )}
    </div>
  );
};

export default MyDashHdr;
