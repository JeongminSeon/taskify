import React, { useEffect, useState } from "react";
import Pagination from "../UI/pagination/Pagination";
import MemberItem from "./components/MemberItem";
import { AxiosError } from "axios";
import { Member, MemberResponse } from "@/types/members";
import { deleteMember, getMembers } from "@/utils/api/membersApi";

interface MemberListProps {
  dashboardId: number;
}

const MemberList: React.FC<MemberListProps> = ({ dashboardId }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchMembers = async () => {
      if (dashboardId) {
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
        }
      }
    };

    fetchMembers();
  }, [currentPage, dashboardId]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // 멤버 삭제 핸들러
  const handleDeleteMember = async (memberId: number) => {
    const confirmDelete = confirm("해당 구성원을 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await deleteMember(memberId);
        setMembers((prevMembers) =>
          prevMembers.filter((member) => member.id !== memberId)
        ); // 삭제 후 상태 업데이트
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        if (axiosError.response) {
          alert(axiosError.response.data.message);
        } else {
          console.error("Failed to delete member:", error);
        }
      }
    }
  };

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
          <MemberItem
            key={member.id}
            member={member}
            handleDeleteMember={handleDeleteMember}
          />
        ))}
      </ul>
    </>
  );
};

export default MemberList;
