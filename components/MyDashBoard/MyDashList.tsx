import { useGetDashboardList } from "@/hooks/dashboard/useGetDashboardList";
import { boardCardBtn, boardCardBtnBox } from "./MyDashStyle";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Pagination from "../UI/pagination/Pagination";

const MyDashList: React.FC = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading, error } = useGetDashboardList("pagination", 0, 1, 5);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
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
          <button type="button" className={`${boardCardBtnBox}`}>
            <p className="inline-block pr-[34px] bg-[url('/images/icons/icon_add_card.svg')] bg-no-repeat bg-right">
              새로운 대시보드
            </p>
          </button>
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
        />
      )}
    </div>
  );
};

export default MyDashList;
