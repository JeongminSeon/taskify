import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  deleteDashboard,
  getDashboardDetail,
  updateDashboard,
} from "@/utils/api/dashboardsApi";
import { useDashBoardStore } from "@/store/dashBoardStore";
import { DashboardDetailResponse } from "@/types/dashboards";
import { useInvitationStore } from "@/store/invitationStore";
import DashBoardLayout from "@/components/Layout/DashBoardLayout";
import MemberList from "@/components/DashBoardEdit/MemberList";
import EditBox from "@/components/DashBoardEdit/EditBox";
import InputField from "@/components/My/InputField";
import ColorChip from "@/components/UI/colorchip/ColorChip";
import InviteeList from "@/components/DashBoardEdit/InviteeList";
import LoadingSpinner from "@/components/UI/loading/LoadingSpinner";

import useErrorModal from "@/hooks/modal/useErrorModal";
import MetaHead from "@/components/MetaHead";
import ModalAlert from "@/components/UI/modal/ModalAlert";
import { GetServerSideProps } from "next";
import { parse } from "cookie";
import { getUserInfo } from "@/utils/api/authApi";

interface DashboardEditProps {
  initialUser: {
    id: number;
  };
}

const DashboardEdit: React.FC<DashboardEditProps> = ({ initialUser }) => {
  const router = useRouter();
  const { dashboardsId } = router.query;
  const [dashboardId, setDashboardId] = useState<number | null>(null);
  const { setDashboardsId } = useInvitationStore();
  const [dashboardDetail, setDashboardDetail] =
    useState<DashboardDetailResponse | null>(null);
  const [title, setTitle] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, errorMessage, handleError, handleClose } = useErrorModal();

  useEffect(() => {
    if (dashboardsId) {
      const id = Number(dashboardsId);
      setDashboardId(id);
      setDashboardsId(id);
    }
  }, [dashboardsId, setDashboardsId]);

  useEffect(() => {
    const fetchDashboardDetail = async () => {
      if (dashboardId !== null) {
        setIsLoading(true);
        try {
          const detail = await getDashboardDetail(dashboardId);
          setDashboardDetail(detail);
          setTitle(detail.title);
          setColor(detail.color);
        } catch (error) {
          console.error("대시보드 세부정보를 가져오는 데 실패했습니다:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchDashboardDetail();
  }, [dashboardId]);

  const returnButton = () => {
    router.back();
  };

  const COLOR_CHIPS = [
    { id: 1, color: "#7AC555" },
    { id: 2, color: "#760DDE" },
    { id: 3, color: "#FFA500" },
    { id: 4, color: "#76A5EA" },
    { id: 5, color: "#E876EA" },
  ];

  const handleColorChange = (selectedColor: string) => {
    setColor(selectedColor);
  };

  const handleUpdate = async () => {
    if (dashboardId) {
      try {
        const updatedDashboard = await updateDashboard(
          dashboardId,
          title,
          color
        );
        setColor(updatedDashboard.color);
        setDashboardDetail(updatedDashboard);
        await useDashBoardStore.getState().setDashboards();
      } catch (error) {
        handleError(error);
      }
    }
  };

  const handleDeleteDashboard = async () => {
    if (dashboardId && confirm("이 대시보드를 정말 삭제하시겠습니까?")) {
      try {
        await deleteDashboard(dashboardId);
        router.push("/mydashboard");
      } catch (error) {
        console.error("대시보드 삭제하는 데 실패했습니다:", error);
      }
    }
  };

  return (
    <>
      <MetaHead
        title="대시보드 수정🎯"
        description="대시보드를 수정하여 일정관리해보세요!"
      />
      <DashBoardLayout>
        <div className="max-w-[640px] py-4 px-3 md:p-5">
          <button
            onClick={returnButton}
            className="text-[16px] font-[500] mb-[29px]"
          >
            &lt; 돌아가기
          </button>
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4">
                <EditBox title={dashboardDetail?.title || ""}>
                  <div className="px-4 md:px-7">
                    <InputField
                      label="대시보드 이름"
                      name="dashName"
                      type="text"
                      placeholder="대시보드 이름 입력"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className="flex gap-2 pt-4">
                      {COLOR_CHIPS.map((chip) => (
                        <ColorChip
                          key={chip.id}
                          color={chip.color}
                          onClick={() => handleColorChange(chip.color)}
                          isSelected={color === chip.color}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={handleUpdate}
                      className="w-full h-[54px] mt-10 sm:mt-[38px] rounded-lg bg-purple100 text-white100 text-sm font-semibold"
                    >
                      변경
                    </button>
                  </div>
                </EditBox>
                <EditBox title="구성원">
                  {dashboardId !== null ? (
                    <MemberList
                      dashboardId={dashboardId}
                      currentUserId={initialUser.id}
                    />
                  ) : (
                    <p>구성원이 없습니다.</p>
                  )}
                </EditBox>
                <EditBox title="초대 내역">
                  <InviteeList dashboardId={dashboardId} />
                </EditBox>
              </div>
              <button
                type="button"
                onClick={handleDeleteDashboard}
                className="w-full max-w-80 mt-6 py-3 border border-gray400 rounded-lg bg-white100 text-black300 md:text-lg font-medium"
              >
                대시보드 삭제하기
              </button>
              {/* 에러 모달 */}
              {isOpen && (
                <ModalAlert
                  isOpen={isOpen}
                  onClose={handleClose}
                  text={errorMessage}
                />
              )}
            </>
          )}
        </div>
      </DashBoardLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;

  if (!accessToken) {
    // 로그인 토큰이 없으면 로그인 페이지로 리다이렉트
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    // 로그인 토큰이 있을 경우 사용자 정보 가져오기
    const user = await getUserInfo(accessToken);
    return {
      props: {
        initialUser: user,
      },
    };
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
export default DashboardEdit;
