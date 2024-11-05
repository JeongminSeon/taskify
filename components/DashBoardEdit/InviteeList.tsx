import { addInvitations, deleteInvitations } from "@/utils/api/dashboardsApi";
import { useCallback, useEffect, useState } from "react";
import { useInvitationStore } from "@/store/invitationStore";
import Image from "next/image";
import Pagination from "../UI/pagination/Pagination";
import UnInvited from "../MyDashBoard/UnInvited";
import InviteeItem from "./components/InviteeItem";
import useModal from "@/hooks/modal/useModal";
import Portal from "@/components/UI/modal/ModalPotal";
import OneInputModal from "../UI/modal/InputModal/OneInputModal";
import ModalAlert from "../UI/modal/ModalAlert";
import useErrorModal from "@/hooks/modal/useErrorModal";

interface InviteeListProps {
  dashboardId: number | null;
}

const ITEMS_PER_PAGE = 5; // 페이지당 아이템 수

const InviteeList: React.FC<InviteeListProps> = ({ dashboardId }) => {
  const { loadInvitations, invitations, totalCount } = useInvitationStore(); // 초대 상태 불러오기
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState<number>(0); // 총 페이지 수 상태
  const [modalMessage, setModalMessage] = useState<string>(""); // 모달 메시지 상태
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null); // 삭제 확인용 ID 상태
  const { isOpen, errorMessage, handleError, handleClose } = useErrorModal(); // 에러 모달 훅

  const {
    isOpen: isModalOpen,
    inputValue,
    openModal: handleAddInvite,
    closeModal,
    handleInputChange,
    handleConfirm: handleModalConfirm,
  } = useModal(); // 초대 추가 모달 훅

  // 메세지 모달
  const {
    isOpen: isMessageOpen,
    openModal: openMessageModal,
    closeModal: closeMessageModal,
  } = useModal();

  useEffect(() => {
    if (totalCount) {
      setTotalPages(Math.ceil(totalCount / ITEMS_PER_PAGE)); // 총 페이지 수 계산
    }
  }, [totalCount]);

  // 초대 목록을 불러오기
  useEffect(() => {
    if (dashboardId !== null) {
      loadInvitations(dashboardId, currentPage, ITEMS_PER_PAGE); // 초대 목록 불러오기
    }
  }, [dashboardId, currentPage, loadInvitations]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1); // 다음 페이지로 이동
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1)); // 이전 페이지로 이동
  };

  const handleConfirm = useCallback(
    async (inputValue: string) => {
      if (!dashboardId) return;

      try {
        await addInvitations(dashboardId, inputValue); // 초대 추가
        setModalMessage("초대 요청을 보냈습니다."); // 메시지 설정
        openMessageModal(); // 메시지 모달 열기
        closeModal(); // 초대 추가 모달 닫기
        loadInvitations(dashboardId, currentPage, ITEMS_PER_PAGE); // 초대 목록 갱신
      } catch (error) {
        handleError(error);
      }
    },
    [
      dashboardId,
      closeModal,
      openMessageModal,
      currentPage,
      loadInvitations,
      handleError,
    ]
  );

  const handleDeleteInvitation = async () => {
    if (!dashboardId || confirmDeleteId === null) return;

    try {
      await deleteInvitations(dashboardId, confirmDeleteId); // 초대 삭제
      setConfirmDeleteId(null); // 확인 후 초기화
      loadInvitations(dashboardId, currentPage, ITEMS_PER_PAGE); // 초대 목록 갱신
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div>
      <div className="overflow-hidden absolute right-4 md:right-7 top-5 flex flex-col items-end md:flex-row md:items-center gap-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
        />
        <button
          type="button"
          className="flex items-center gap-2 md:w-[105px] h-8 px-3 text-white100 text-sm bg-purple100 rounded-[4px]"
          onClick={handleAddInvite}
        >
          <Image
            src="/images/icons/icon_add_box_white.svg"
            width={16}
            height={16}
            alt="초대하기"
          />
          초대하기
        </button>
      </div>
      <p className="px-4 md:px-7 text-xs md:text-sm text-gray-300">이메일</p>
      {invitations.length === 0 ? (
        <UnInvited message="초대 목록이 없어요." />
      ) : (
        <ul className="pt-4">
          {Array.isArray(invitations) &&
            invitations.map((invitation) => (
              <InviteeItem
                key={invitation.id}
                invitation={invitation}
                handleDeleteInvitation={() => setConfirmDeleteId(invitation.id)} // 확인 모달 열기
              />
            ))}
        </ul>
      )}

      {/* 초대 모달 */}
      <Portal>
        <OneInputModal
          isOpen={isModalOpen}
          modalTitle="초대하기"
          inputLabel="이메일"
          inputPlaceholder="이메일을 입력해주세요"
          onCancel={closeModal}
          cancelButtonText="취소"
          onConfirm={() => handleModalConfirm(handleConfirm)}
          confirmButtonText="생성"
          inputValue={inputValue}
          onInputChange={handleInputChange}
        />
      </Portal>

      {/* 메시지 모달 */}
      {isMessageOpen && (
        <ModalAlert
          isOpen={isMessageOpen}
          onClose={closeMessageModal}
          text={modalMessage}
        />
      )}

      {/* 삭제 확인 모달 */}
      {confirmDeleteId !== null && (
        <ModalAlert
          isOpen={confirmDeleteId !== null}
          type="confirm"
          text="해당 이메일을 삭제하시겠습니까?"
          onClose={() => setConfirmDeleteId(null)}
          onConfirm={handleDeleteInvitation}
        />
      )}

      {/* 에러 모달 */}
      {isOpen && (
        <ModalAlert isOpen={isOpen} onClose={handleClose} text={errorMessage} />
      )}
    </div>
  );
};

export default InviteeList;
