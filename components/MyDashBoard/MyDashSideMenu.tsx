import Link from "next/link";
import Image from "next/image";
import DashBoardLink from "./DashBoardLink";
import Pagination from "../UI/pagination/Pagination";
import { useState } from "react";
import { Dashboard } from "@/types/dashboards";
import { getDashboards } from "@/utils/api/dashboardsApi";
import { GetServerSideProps } from "next";
import useResponsiveThreshold from "@/hooks/dashboard/useResponsiveThreshold";
import useModal from "@/hooks/modal/useModal";
import CreateDashBoard from "./CreateDashBoard";

interface MyDashSideMenuProps {
  dashboards: Dashboard[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const data = await getDashboards(1, 20); // 대시보드 목록 가져오기
    console.log("이것도?", data);
    return {
      props: { dashboards: data.dashboards || [] },
    };
  } catch (error) {
    console.error("대시보드 목록을 가져오는 데 실패했습니다:", error);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};

const MyDashSideMenu: React.FC<MyDashSideMenuProps> = ({ dashboards }) => {
  console.log(dashboards);

  const { isOpen, openModal, closeModal } = useModal();
  const itemsPerPage = useResponsiveThreshold(dashboards.length, 15);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = dashboards
    ? Math.ceil(dashboards.length / itemsPerPage)
    : 0;

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
      {dashboards && dashboards.length > itemsPerPage && (
        <div className="mt-3">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
            showPageInfo={false}
          />
        </div>
      )}
    </div>
  );
};

export default MyDashSideMenu;
