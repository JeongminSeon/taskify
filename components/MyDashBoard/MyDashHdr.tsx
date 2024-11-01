import { useRouter } from "next/router";
import { useAuthStore } from "@/store/authStore";
import { addInvitations } from "@/utils/api/dashboardsApi";
import { useCallback, useState } from "react";
import { useInvitationStore } from "@/store/invitationStore";
import { Dashboard } from "@/types/dashboards";
import { removeAccessToken } from "@/utils/api/cookie";
import useModal from "@/hooks/modal/useModal";
import Portal from "@/components/UI/modal/ModalPotal";
import OneInputModal from "../UI/modal/InputModal/OneInputModal";
import ModalAlert from "../UI/modal/ModalAlert";
import ActionButton from "./dashHeader/ActionButton";
import UserMenu from "./dashHeader/UserMenu";
import useErrorModal from "@/hooks/modal/useErrorModal";

interface MyDashSideMenuProps {
  dashboards: Dashboard[];
  onEdit: () => void;
  onDelete: () => void;
}

const ITEMS_PER_PAGE = 5;

const MyDashHdr: React.FC<MyDashSideMenuProps> = ({ dashboards }) => {
  const router = useRouter();
  const { dashboardsId } = router.query;
  const { loadInvitations } = useInvitationStore();
  const { user } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {
    isOpen: isInviteModalOpen,
    inputValue,
    openModal: openInviteModal,
    closeModal: closeInviteModal,
    handleInputChange,
    handleConfirm: handleModalConfirm,
  } = useModal();

  const {
    isOpen: isErrorModalOpen,
    errorMessage,
    handleError,
    handleClose: closeErrorModal,
  } = useErrorModal();

  const [modalMessage, setModalMessage] = useState<string>("");
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const currentDashboard = dashboards.find(
    (dashboard) => dashboard.id === Number(dashboardsId)
  );

  const dashboardTitle = currentDashboard
    ? currentDashboard.title
    : "내 대시보드";
  const isMyDashboardPage = router.pathname === "/mydashboard";

  // 유저 메뉴
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

  const handleConfirm = useCallback(
    async (inputValue: string) => {
      try {
        await addInvitations(Number(dashboardsId), inputValue);
        setModalMessage("초대 요청을 보냈습니다.");
        setIsMessageModalOpen(true);
        closeInviteModal();
        loadInvitations(Number(dashboardsId), 1, ITEMS_PER_PAGE);
      } catch (error) {
        handleError(error);
      }
    },
    [dashboardsId, closeInviteModal, loadInvitations, handleError]
  );

  const handleManageClick = () => {
    if (currentDashboard && !currentDashboard.createdByMe) {
      setModalMessage("접근 권한이 없습니다.");
      setIsMessageModalOpen(true);
      router.push(`/dashboards/${dashboardsId}`);
    } else {
      router.push(`/dashboards/${dashboardsId}/edit`);
    }
  };

  return (
    <div>
      <div className="border-b border-gray400 bg-white">
        <div className="headerWrap flex justify-between items-center w-full p-[13px_8px_13px_18px] md:px-10 md:py-[15px]">
          <h2 className="pageTitle flex-1 text-x font-bold md:text-xl lg:text-[2rem]">
            {dashboardTitle}
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
