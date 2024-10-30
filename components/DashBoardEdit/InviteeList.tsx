import { addInvitations, deleteInvitations } from "@/utils/api/dashboardsApi";
import { useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import Image from "next/image";
import Pagination from "../UI/pagination/Pagination";
import UnInvited from "../MyDashBoard/UnInvited";
import InviteeItem from "./components/InviteeItem";
import useModal from "@/hooks/modal/useModal";
import Portal from "@/components/UI/modal/ModalPotal";
import OneInputModal from "../UI/modal/InputModal/OneInputModal";
import ModalAlert from "../UI/modal/ModalAlert";
import { useInvitationStore } from "@/store/invitationStore";

const InviteeList = () => {
  const { dashboardId, loadInvitations, invitations } = useInvitationStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [modalMessage, setModalMessage] = useState<string>("");

  const {
    isOpen,
    inputValue,
    openModal: handleAddInvite,
    closeModal,
    handleInputChange,
    handleConfirm: handleModalConfirm,
  } = useModal();

  // 메세지 모달
  const {
    isOpen: isMessageOpen,
    openModal: openMessageModal,
    closeModal: closeMessageModal,
  } = useModal();

  // 컴포넌트가 마운트될 때 초대 목록을 불러오기
  useEffect(() => {
    if (dashboardId !== null) {
      loadInvitations(dashboardId, 1, 10);
    }
  }, [dashboardId, loadInvitations]);

  // const fetchInvitations = useCallback(async () => {
  //   if (dashboardId) {
  //     try {
  //       const data: InvitationsResponse = await getInvitations(
  //         dashboardId,
  //         currentPage,
  //         5
  //       );
  //       console.log(data);
  //       setInvitations(data.invitations);
  //       const currentInvitations = useInvitationStore.getState().invitations;
  //       console.log("현재 초대 목록:", currentInvitations);
  //       setTotalPages(Math.ceil(data.totalCount / 5));
  //     } catch (error) {
  //       console.error("Error fetching invitations:", error);
  //     }
  //   }
  // }, [dashboardId, currentPage, setInvitations]);

  // useEffect(() => {
  //   fetchInvitations();
  // }, [fetchInvitations]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleConfirm = useCallback(
    async (inputValue: string) => {
      if (!inputValue) {
        alert("이메일을 입력해주세요.");
        return;
      }
      try {
        const newInvitation = await addInvitations(dashboardId, inputValue);
        useInvitationStore.getState().addInvitation(newInvitation);
        setModalMessage("초대 요청을 보냈습니다.");
        openMessageModal();
        closeModal();
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        if (axiosError.response) {
          setModalMessage(
            axiosError.response.data.message ||
              "초대 요청 중 오류가 발생했습니다."
          );
        }
        openMessageModal();
      }
    },
    [dashboardId, closeModal, openMessageModal]
  );

  const handleDeleteInvitation = async (invitationId: number) => {
    if (confirm("해당 이메일을 삭제하시겠습니까?")) {
      try {
        await deleteInvitations(dashboardId, invitationId);
      } catch (error) {
        console.error("초대 취소 중 오류 발생:", error);
      }
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
          className="flex items-center gap-2 md:w-[105px] h-8 px-3 text-white100 text-sm bg-purple100  rounded-[4px]"
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
      {invitations && invitations.length === 0 ? (
        <UnInvited message="초대 목록이 없어요." />
      ) : (
        <ul className="pt-4">
          {Array.isArray(invitations) &&
            invitations.map((invitation) => (
              <InviteeItem
                key={invitation.id}
                invitation={invitation}
                handleDeleteInvitation={handleDeleteInvitation}
              />
            ))}
        </ul>
      )}
      <Portal>
        <OneInputModal
          isOpen={isOpen}
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

      {/* 메세지 모달창 */}
      {isMessageOpen && (
        <ModalAlert
          isOpen={isMessageOpen}
          onClose={closeMessageModal}
          text={modalMessage}
        />
      )}
    </div>
  );
};

export default InviteeList;
