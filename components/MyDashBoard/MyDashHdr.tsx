import { useRouter } from "next/router";
import { useAuthStore } from "@/store/authStore";
import { useDashBoardStore } from "@/store/dashBoardStore";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Dropdown from "../UI/dropdown/Dropdown";
import ActionButton from "./dashHeader/ActionButton";

const MyDashHdr = () => {
  const router = useRouter();
  const { dashboardsId } = router.query;
  const { user } = useAuthStore();
  const { dashboards } = useDashBoardStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownItems = [
    {
      label: "로그아웃",
      onClick: () => {
        onEdit();
        onClose();
      },
    },
    {
      label: "삭제하기",
      onClick: () => {
        onDelete();
        onClose();
      },
    },
  ];

  // 대시보드 제목 : 쿼리에 id 값과 dashboards의 id 값 비교
  const currentDashboard = dashboards.find(
    (dashboard) => dashboard.id === Number(dashboardsId)
  );
  const dashboardTitle = currentDashboard
    ? currentDashboard.title
    : "내 대시보드";

  return (
    <div className="border-b border-gray400 bg-white">
      <div className="headerWrap flex justify-between items-center w-full p-[13px_8px_13px_18px] md:px-10 md:py-[15px]">
        <h2 className="pageTitle flex-1 text-x font-bold md:text-xl lg:text-[2rem]">
          {dashboardTitle}
        </h2>
        <ActionButton dashboardsId={dashboardsId} />
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="relative flex items-center gap-3 ml-4 pl-4 border-l border-gray400 md:ml-8 md:pl-8 lg:ml-9 lg:pl-9"
        >
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
          <Dropdown isOpen={isDropdownOpen} items={dropdownItems} />
        </button>
      </div>
    </div>
  );
};

export default MyDashHdr;
