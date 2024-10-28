import Link from "next/link";
import Image from "next/image";
import DashBoardLink from "./DashBoardLink";
import Pagination from "../UI/pagination/Pagination";
import { useEffect, useState } from "react";
import { Dashboard } from "@/types/dashboards";
import { useDashBoardStore } from "@/store/dashBoardStore";

interface MyDashSideMenuProps {
  initialDashboards: Dashboard[];
}

const MyDashSideMenu: React.FC<MyDashSideMenuProps> = ({
  initialDashboards,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const totalPages = initialDashboards
    ? Math.ceil(initialDashboards.length / itemsPerPage)
    : 0;

  // 인증 관련 상태와 메서드 불러오기
  const { dashboards, setDashboards } = useDashBoardStore();

  // 컴포넌트가 마운트될 때 초기 대시보드 설정
  useEffect(() => {
    // 상태 업데이트: initialDashboards를 Zustand에 저장
    if (initialDashboards) {
      setDashboards();
    }
  }, [initialDashboards, setDashboards]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const currentDashboards = dashboards?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="sticky top-0 h-screen py-5 px-[14px] border-r border-gray400 bg-white lg:px-2 ">
      <h1 className="md:hidden">
        <Link href="#">
          <Image
            src="/images/logos/logo-small.svg"
            width={24}
            height={30}
            alt="로고"
          />
        </Link>
      </h1>
      <h1 className="hidden md:block">
        <Link href="#">
          <Image
            src="/images/logos/logo-large.svg"
            width={109}
            height={33}
            alt="로고"
            priority
            style={{ width: "auto", height: "auto" }}
          />
        </Link>
      </h1>
      <div className="mt-[38px] text-gray200 text-xs">
        <button
          type="button"
          className="flex justify-between items-center w-full py-4"
        >
          <span className="hidden font-semibold md:inline-block">
            Dash Boards
          </span>
          <Image
            src="/images/icons/icon_add_box.svg"
            width={20}
            height={20}
            alt="초대하기"
            className="mx-auto md:mx-0"
          />
        </button>
        <ul className="flex flex-col gap-2">
          {currentDashboards?.map((dashboard) => (
            <li key={dashboard.id} className="md:px-[10px] lg:px-3">
              <DashBoardLink
                id={dashboard.id}
                title={dashboard.title}
                color={dashboard.color}
                createdByMe={dashboard.createdByMe}
              />
            </li>
          ))}
        </ul>
      </div>
      {initialDashboards && initialDashboards.length > 0 && (
        <div className="mt-3">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
          />
        </div>
      )}
    </div>
  );
};

export default MyDashSideMenu;
