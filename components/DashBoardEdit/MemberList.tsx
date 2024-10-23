import React, { useEffect, useState } from "react";
import Pagination from "../UI/pagination/Pagination";
import { getMembers } from "@/pages/api/membersApi";
import { Member, MemberResponse } from "@/types/members";

interface MemberListProps {
  dashboardId: number; // dashboardId의 타입 정의
}

const MemberList: React.FC<MemberListProps> = ({ dashboardId }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data: MemberResponse = await getMembers(
          currentPage,
          5,
          dashboardId
        );
        setMembers(data.members);
        setTotalPages(Math.ceil(data.totalCount / 5));
      } catch (error) {
        console.error("Failed to dashboard memeber:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [currentPage, dashboardId]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1)); // 1페이지 이하로는 내리지 않음
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="absolute right-4 md:right-7 top-5">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
        />
      </div>
      <p className="px-4 md:px-7 text-xs md:text-sm text-gray300">이름</p>
      <ul>
        {members.map((member) => (
          <li
            key={member.id}
            className="flex items-center gap-2 md:gap-3 py-3 md:py-4 px-4 md:px-7 border-b border-gray500"
          >
            <span className="overflow-hidden relative w-[34px] h-[34px] rounded-full bg-slate-500"></span>
            <p className="flex-1 text-sm md:text-[16px] text-">
              {member.nickname}
            </p>
            <button
              type="button"
              className="sm:w-[52px] md:w-[84px] h-8 border borer-gray400 rounded-[4px] text-xs md:text-sm text-purple100 font-medium leading-8"
            >
              삭제하기
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MemberList;
