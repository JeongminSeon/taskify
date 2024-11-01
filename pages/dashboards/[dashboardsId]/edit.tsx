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
import { AxiosError } from "axios";
import DashBoardLayout from "@/components/Layout/DashBoardLayout";
import MemberList from "@/components/DashBoardEdit/MemberList";
import EditBox from "@/components/DashBoardEdit/EditBox";
import InputField from "@/components/My/InputField";
import ColorChip from "@/components/UI/colorchip/ColorChip";
import InviteeList from "@/components/DashBoardEdit/InviteeList";
import LoadingSpinner from "@/components/UI/loading/LoadingSpinner";

const DashboardEdit = () => {
  const router = useRouter();
  const { dashboardsId } = router.query;
  const [dashboardId, setDashboardId] = useState<number | null>(null);
  const { setDashboardsId } = useInvitationStore();
  const [dashboardDetail, setDashboardDetail] =
    useState<DashboardDetailResponse | null>(null);
  const [title, setTitle] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

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
        const axiosError = error as AxiosError<{ message: string }>;
        if (axiosError.response) {
          alert(axiosError.response.data.message);
        } else {
          console.error("대시보드 변경하는 데 실패했습니다:", error);
        }
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
                  <MemberList dashboardId={dashboardId} />
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
          </>
        )}
      </div>
    </DashBoardLayout>
  );
};

export default DashboardEdit;
