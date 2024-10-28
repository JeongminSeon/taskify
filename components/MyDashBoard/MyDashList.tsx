import { useGetDashboardList } from "@/hooks/dashboard/useGetDashboardList";
import { boardCardBtn, boardCardBtnBox } from "./MyDashStyle";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import CreateDashBoard from "./CreateDashBoard";
import useModal from "@/hooks/useModal";

const MyDashList: React.FC = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading, error } = useGetDashboardList("pagination", 0, 1, 5);
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      router.push("/404"); // accessToken이 없으면 404 페이지로 이동
    }
  }, [router]);

  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / 5);
  const dashboards = data?.dashboards || [];

  useEffect(() => {
    if (data && currentPage > totalPages) {
      setCurrentPage(totalPages); // 현재 페이지가 총 페이지 수를 초과할 경우 조정
    }
  }, [data, currentPage, totalPages]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1)); // 1페이지 이하로는 내리지 않음
  };

  // 새로운 대쉬보드 모달
  const handleNewDashBoard = () => {
    openModal();
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

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
        {data?.dashboards.map((dashboard) => (
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
      {dashboards.length > 0 && (
        <div className="flex items-center justify-end gap-5 mt-4 ">
          <div>
            <span className="text-sm text-black300">
              {currentPage} 페이지 중 {totalPages}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="relative w-9 h-9 md:w-10 md:h-10"
            >
              <Image
                src={"/images/icons/pagination_left.svg"}
                fill
                alt="이전"
                style={{ objectFit: "cover" }} // CSS 스타일로 objectFit 설정
                sizes="(max-width: 768px) 50px, (max-width: 1200px) 75px, 100px" // 뷰포트에 따른 이미지 크기 설정
              />
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="relative w-9 h-9 md:w-10 md:h-10"
            >
              <Image
                src={"/images/icons/pagination_right.svg"}
                fill
                alt="다음"
                style={{ objectFit: "cover" }} // CSS 스타일로 objectFit 설정
                sizes="(max-width: 768px) 50px, (max-width: 1200px) 75px, 100px" // 뷰포트에 따른 이미지 크기 설정
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDashList;
