import { useDashboardContext } from "@/context/DashboardContext";
import { boardCardBtn, boardCardBtnBox } from "./MyDashStyle";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Pagination from "../UI/pagination/Pagination";
import CreateDashBoard from "./CreateDashBoard";
import useModal from "@/hooks/modal/useModal";

const MyDashList: React.FC = () => {
  const { dashboards } = useDashboardContext();
  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen, openModal, closeModal } = useModal();

  const itemsPerPage = 5; // 한 페이지에 보여줄 대시보드 수
  const totalPages = dashboards
    ? Math.ceil(dashboards.dashboards.length / itemsPerPage)
    : 0;

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1)); // 1페이지 이하로는 내리지 않음
  };

  const currentDashboards = dashboards?.dashboards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 새로운 대쉬보드 모달
  const handleNewDashBoard = () => {
    openModal();
  };

  return (
    <div>
      <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:gap-[10px] lg:gap-[13px]">
        <div className={`justify-center ${boardCardBtn}`}>
          <button
            type="button"
            className={`${boardCardBtnBox}`}
            onClick={handleNewDashBoard}
          >
            <p className="inline-block pr-[34px] bg-[url('/images/icons/icon_add_card.svg')] bg-no-repeat bg-right">
              새로운 대시보드
            </p>
          </button>
          {isOpen && <CreateDashBoard isOpen={isOpen} onClose={closeModal} />}
        </div>
        {currentDashboards?.map((dashboard) => (
          <div key={dashboard.id} className={`${boardCardBtn}`}>
            <Link
              href={`/dashboards/${dashboard.id}`}
              className={`flex items-center gap-3 ${boardCardBtnBox}`}
              style={{ backgroundPosition: "right 15px center" }}
            >
              <span
                className="block w-2 h-2 rounded-full"
                style={{ backgroundColor: dashboard.color }}
              ></span>
              <p className="truncate">{dashboard.title}</p>
              {dashboard.createdByMe && (
                <Image
                  src={"/images/icons/icon_crown.svg"}
                  width={20}
                  height={18}
                  className="md:h-[14px] md:w-[18px]"
                  alt="왕관"
                />
              )}
              <Image
                src={"/images/icons/icon_arrow_right.svg"}
                width={18}
                height={18}
                className="ml-auto"
                alt="화살표"
              />
            </Link>
          </div>
        ))}
      </div>
      {dashboards && dashboards.dashboards.length > 0 && (
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

export default MyDashList;
