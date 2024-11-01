import { hdMenuBtn, hdMenuBtnIcon } from "./MyDashStyle";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/authStore";
import { addInvitations } from "@/utils/api/dashboardsApi";
import { useCallback, useState } from "react";
import { useInvitationStore } from "@/store/invitationStore";
import { AxiosError } from "axios";
import Image from "next/image";
import useModal from "@/hooks/modal/useModal";
import Portal from "@/components/UI/modal/ModalPotal";
import OneInputModal from "../UI/modal/InputModal/OneInputModal";
import ModalAlert from "../UI/modal/ModalAlert";
import { Dashboard } from "@/types/dashboards";

interface MyDashSideMenuProps {
  dashboards: Dashboard[];
}

const ITEMS_PER_PAGE = 5;

const MyDashHdr: React.FC<MyDashSideMenuProps> = ({ dashboards }) => {
  const router = useRouter();
  const { dashboardsId } = router.query;
  const { user } = useAuthStore();
  const [modalMessage, setModalMessage] = useState<string>("");
  const { loadInvitations } = useInvitationStore();

  // 대시보드 제목 : 쿼리에 id 값과 dashboards의 id 값 비교
  const currentDashboard = dashboards.find(
    (dashboard) => dashboard.id === Number(dashboardsId)
  );
  const dashboardTitle = currentDashboard
    ? currentDashboard.title
    : "내 대시보드";

  // '/mydashboard' 경로 확인
  const isMyDashboardPage = router.pathname === "/mydashboard";

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

  const handleConfirm = useCallback(
    async (inputValue: string) => {
      if (!inputValue) {
        alert("이메일을 입력해주세요.");
        return;
      }

      try {
        await addInvitations(Number(dashboardsId), inputValue);
        setModalMessage("초대 요청을 보냈습니다.");
        openMessageModal();
        closeModal();
        loadInvitations(Number(dashboardsId), 1, ITEMS_PER_PAGE);
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
    [dashboardsId, closeModal, openMessageModal, loadInvitations]
  );

  const handleManageClick = () => {
    if (currentDashboard && !currentDashboard.createdByMe) {
      openMessageModal();
      router.push(`/dashboards/${dashboardsId}`);
    } else {
      // 관리 페이지로 이동
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
          {/* '/mydashboard'에서 미노출 */}
          {!isMyDashboardPage && (
            <ul className="flex gap-[6px] md:gap-4">
              <li>
                <button onClick={handleManageClick} className={`${hdMenuBtn}`}>
                  <span className={`${hdMenuBtnIcon}`}>
                    <Image
                      src="/images/icons/icon_settings.svg"
                      width={15}
                      height={15}
                      alt="관리"
                    />
                  </span>
                  관리
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`${hdMenuBtn}`}
                  onClick={handleAddInvite}
                >
                  <span className={`${hdMenuBtnIcon}`}>
                    <Image
                      src="/images/icons/icon_add_box.svg"
                      width={15}
                      height={15}
                      alt="초대하기"
                    />
                  </span>
                  초대하기
                </button>
              </li>
            </ul>
          )}
          <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray400 md:ml-8 md:pl-8 lg:ml-9 lg:pl-9">
            <span className="overflow-hidden relative w-[34px] h-[34px] rounded-full bg-slate-500">
              {user?.profileImageUrl ? (
                <Image
                  className="object-cover"
                  src={user.profileImageUrl}
                  fill
                  alt="Profile Image"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 뷰포트에 따른 이미지 크기 설정
                />
              ) : (
                <Image
                  className="object-cover"
                  src="https://via.placeholder.com/34"
                  fill
                  alt="Default Profile"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 뷰포트에 따른 이미지 크기 설정
                />
              )}
            </span>
            <p className="hidden md:block">{user?.nickname || ""}</p>
          </div>
        </div>
      </div>
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
          text={"접근 권한이 없습니다."}
        />
      )}
    </div>
  );
};

export default MyDashHdr;
