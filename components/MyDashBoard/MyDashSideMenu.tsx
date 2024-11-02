import { useEffect, useState } from "react";
import { useDashBoardStore } from "@/store/dashBoardStore";
import Link from "next/link";
import Image from "next/image";
import DashBoardLink from "./DashBoardLink";
import Pagination from "../UI/pagination/Pagination";
import useResponsiveThreshold from "@/hooks/dashboard/useResponsiveThreshold";
import useModal from "@/hooks/modal/useModal";
import CreateDashBoard from "./CreateDashBoard";

const MyDashSideMenu: React.FC = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const { dashboards, setDashboards, dashboardId, totalCount } =
    useDashBoardStore();
  const itemsPerPage = useResponsiveThreshold(totalCount, 15);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDashboardId, setActiveDashboardId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchDashboards = async () => {
      await setDashboards(); // 대시보드 목록을 가져옴
    };

    fetchDashboards();
  }, [setDashboards]);

  useEffect(() => {
    if (dashboardId) {
      setActiveDashboardId(Number(dashboardId));
    }
  }, [dashboardId]);

  const totalPages = dashboards ? Math.ceil(totalCount / itemsPerPage) : 0;

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

  const handleNewDashBoard = () => {
    openModal();
  };

  // 클릭한 대시보드 ID로 상태 업데이트
  const handleDashboardClick = (id: number) => {
    setActiveDashboardId(id);
  };

  return (
    <div className="sticky top-0 h-full py-5 px-[14px] border-r border-gray400 bg-white lg:px-2 ">
      <h1 className="md:hidden">
        <Link href="/mydashboard">
          <Image
            src="/images/logos/logo-small.svg"
            width={24}
            height={30}
            alt="로고"
          />
        </Link>
      </h1>
      <h1 className="hidden md:block">
        <Link href="/mydashboard">
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
          onClick={handleNewDashBoard}
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
        {isOpen && <CreateDashBoard isOpen={isOpen} onClose={closeModal} />}
        <ul className="flex flex-col gap-2">
          {currentDashboards?.map((dashboard) => (
            <li
              key={dashboard.id}
              className={`md:px-[10px] lg:px-3 ${
                activeDashboardId === dashboard.id ? "bg-violet200" : ""
              }`}
              onClick={() => handleDashboardClick(dashboard.id)}
            >
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
      <div className="mt-3">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
          showPageInfo={false}
        />
      </div>
    </div>
  );
};

export default MyDashSideMenu;
