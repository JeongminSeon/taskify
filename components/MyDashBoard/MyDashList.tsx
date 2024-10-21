import { useGetDashboardList } from "@/hooks/dashboard/useGetDashboardList";
import { boardCardBtn, boardCardBtnBox } from "./style";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DashboardResponse } from "@/types/dashboardsTypes";

interface MyDashListProps {
  initialData: DashboardResponse | null; // 데이터가 null일 수 있으므로
  loading: boolean;
  error: string | null;
}

const MyDashList: React.FC<MyDashListProps> = ({
  initialData,
  loading,
  error,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<DashboardResponse | null>(initialData);

  const {
    data: fetchedData,
    loading: fetching,
    error: fetchingError,
  } = useGetDashboardList("pagination", 0, currentPage, 5);

  useEffect(() => {
    // 데이터 업데이트
    if (fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1)); // 1페이지 이하로는 내리지 않음
  };

  // 전체 페이지 수 계산 (예: totalCount가 API 응답에 포함된 경우)
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / 5); // 필요에 따라 수정

  // dashboards가 undefined일 수 있으므로 안전하게 접근
  const dashboards = data?.dashboards || [];

  // 필요에 따라 수정
  if (loading || fetching) {
    return <div>Loading...</div>;
  }

  if (error || fetchingError) {
    return <div>Error: {error || fetchingError}</div>;
  }

  return (
    <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:gap-[10px] lg:gap-[13px]">
      <div className={`justify-center ${boardCardBtn}`}>
        <button type="button" className={`${boardCardBtnBox}`}>
          <p className="inline-block pr-[34px] bg-[url('/images/icons/icon_add_card.svg')] bg-no-repeat bg-right">
            새로운 대시보드
          </p>
        </button>
      </div>
      {data?.dashboards.map((dashboard) => (
        <div key={dashboard.id} className={`${boardCardBtn}`}>
          <Link
            href={`/dashboard/${dashboard.id}`}
            className={`flex items-center gap-3 ${boardCardBtnBox}`}
            style={{ backgroundPosition: "right 15px center" }}
          >
            <span
              className="block w-2 h-2 rounded-full"
              style={{ backgroundColor: dashboard.color }}
            ></span>
            <p>{dashboard.title}</p>
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
      {dashboards.length > 0 && (
        <div className="flex flex-col items-center mt-4">
          <div className="flex justify-between w-full mb-2">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              이전
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
            >
              다음
            </button>
          </div>
          <div>
            {/* 현재 페이지와 전체 페이지 수 표시 */}
            <span>
              {currentPage} 페이지 중 {totalPages} 페이지
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDashList;
