import { useState } from "react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { useDashboardContext } from "@/context/DashboardContext";
import {
  deleteDashboard,
  getDashboards,
  updateDashboard,
} from "@/utils/api/dashboardsApi";
import { getMembers } from "@/utils/api/membersApi";
import { Member, MemberResponse } from "@/types/members";
import DashBoardLayout from "@/components/Layout/DashBoardLayout";
import MemberList from "@/components/DashBoardEdit/MemberList";
import EditBox from "@/components/DashBoardEdit/EditBox";
import InputField from "@/components/My/InputField";
import ColorChip from "@/components/UI/colorchip/ColorChip";
import InviteeList from "@/components/DashBoardEdit/InviteeList";

interface EditDashboardProps {
  dashboardId: number;
  initialMembers: Member[]; // 타입 지정
  totalCount: number;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { dashboardsId } = context.query;

  let initialMembers: Member[] = []; // Member[] 타입으로 초기화
  let totalCount = 0;

  try {
    const data: MemberResponse = await getMembers(1, 5, Number(dashboardsId));
    initialMembers = data.members;
    totalCount = data.totalCount;
  } catch (error) {
    console.error("Failed to fetch members:", error);
  }

  return {
    props: {
      dashboardId: Number(dashboardsId),
      initialMembers,
      totalCount,
    },
  };
}

const DashboardEdit: React.FC<EditDashboardProps> = ({
  dashboardId,
  initialMembers,
  totalCount,
}) => {
  const router = useRouter();
  const { dashboardDetail, setDashboardDetail, setDashboards } =
    useDashboardContext();
  const [title, setTitle] = useState<string>("");
  const [color, setColor] = useState<string>("");

  // 뒤로가기 버튼
  const returnButton = () => {
    router.back();
  };

  // 기본 컬러칩
  const colorChips = [
    { id: 1, color: "#7AC555" },
    { id: 2, color: "#760DDE" },
    { id: 3, color: "#FFA500" },
    { id: 4, color: "#76A5EA" },
    { id: 5, color: "#E876EA" },
  ];

  // 컬러 변경
  const handleColorChange = (selectedColor: string) => {
    setColor(selectedColor);
  };

  // 대시보드 변경 사항 업데이트
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

        const updatedDashboards = await getDashboards(1, 10);
        setDashboards(updatedDashboards);
      } catch (error) {
        console.error("Failed to update dashboard:", error);
      }
    }
  };

  // 대시보드 삭제
  const handleDeleteDashboard = async () => {
    if (dashboardId) {
      const confirmDelete = confirm("이 대시보드를 정말 삭제하시겠습니까?");
      if (confirmDelete) {
        try {
          await deleteDashboard(dashboardId);
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
          <EditBox title={dashboardDetail ? dashboardDetail.title : ""}>
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
          </EditBox>
          <EditBox title="구성원">
            <MemberList
              dashboardId={dashboardId}
              initialMembers={initialMembers}
              totalCount={totalCount}
            />
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
      </div>
    </DashBoardLayout>
  );
};

export default DashboardEdit;
