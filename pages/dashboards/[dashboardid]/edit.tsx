import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  deleteDashboard,
  getDashboardDetail,
  updateDashboard,
} from "@/utils/api/dashboardsApi";
import { DashboardDetailResponse } from "@/types/dashboards";
import DashBoardLayout from "@/components/Layout/DashBoardLayout";
import InputField from "@/components/My/InputField";
import ColorChip from "@/components/UI/colorchip/ColorChip";
import MemberList from "@/components/DashBoardEdit/MemberList";
import EditBoxUI from "@/components/DashBoardEdit/EditBox";
import InviteeList from "@/components/DashBoardEdit/InviteeList";

const DashboardEdit = () => {
  const router = useRouter();
  const { dashboardid } = router.query;
  const dashboardId = Number(dashboardid);
  const [dashboardDetail, setDashboardDetail] =
    useState<DashboardDetailResponse | null>(null);
  const [title, setTitle] = useState<string>("");
  const [originalTitle, setOriginalTitle] = useState<string>("");
  const [color, setColor] = useState<string>("");

  const colorChips = [
    { id: 1, color: "#7AC555" },
    { id: 2, color: "#760DDE" },
    { id: 3, color: "#FFA500" },
    { id: 4, color: "#76A5EA" },
    { id: 5, color: "#E876EA" },
  ];

  const returnButton = () => {
    router.back();
  };

  useEffect(() => {
    const fetchDashboardDetail = async () => {
      if (dashboardId) {
        try {
          const detail = await getDashboardDetail(dashboardId);
          setDashboardDetail(detail);
          setTitle(detail.title);
          setOriginalTitle(detail.title);
          setColor(detail.color);
        } catch (error) {
          console.error("Error fetching dashboard details:", error);
        }
      }
    };

    fetchDashboardDetail();
  }, [dashboardId]);

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
        console.log("Updated Dashboard:", updatedDashboard);
        // 업데이트 후 추가적인 동작 (예: 리다이렉트)
      } catch (error) {
        console.error("Failed to update dashboard:", error);
      }
    }
  };

  const handleDeleteDashboard = async () => {
    if (dashboardId) {
      const confirmDelete = confirm("이 대시보드를 정말 삭제하시겠습니까?");
      if (confirmDelete) {
        try {
          await deleteDashboard(dashboardId);
          console.log("Dashboard deleted successfully");
          router.push("/mydashboard");
        } catch (error) {
          console.error("Failed to delete dashboard:", error);
        }
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
        <div className="flex flex-col gap-4">
          <EditBoxUI title={originalTitle}>
            <div className="px-4 md:px-7">
              <InputField
                label="대시보드 이름"
                name="dashName"
                type="text"
                placeholder="새 비밀번호 입력"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="flex gap-2 pt-4">
                {colorChips.map((chip) => (
                  <ColorChip
                    key={chip.id}
                    color={chip.color}
                    onClick={() => handleColorChange(chip.color)} // 클릭 시 색상 변경
                    isSelected={color === chip.color} // 선택된 색상 확인
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
          </EditBoxUI>
          <EditBoxUI title="구성원">
            <MemberList dashboardId={dashboardId} />
          </EditBoxUI>
          <EditBoxUI title="초대 내역">
            <InviteeList dashboardId={dashboardId} />
          </EditBoxUI>
        </div>
        <button
          type="button"
          onClick={handleDeleteDashboard}
          className="w-full max-w-80 mt-6 py-3 border border-gray400 rounded-lg bg-white100 text-black300 md:text-lg font-medium"
        >
          대시보드 삭제하기
        </button>
      </div>
    </DashBoardLayout>
  );
};

export default DashboardEdit;
