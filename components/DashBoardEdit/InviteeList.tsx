import { getInvitations } from "@/pages/api/dashboardsApi";
import { Invitation, InvitationsResponse } from "@/types/dashboards";
import { useEffect, useState } from "react";
import Pagination from "../UI/pagination/Pagination";

interface InviteeListProps {
  dashboardId: number; // dashboardId의 타입 정의
}

const InviteeList: React.FC<InviteeListProps> = ({ dashboardId }) => {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchInvitations = async () => {
      setLoading(true);
      try {
        const data: InvitationsResponse = await getInvitations(
          currentPage,
          10,
          dashboardId
        );
        setInvitations(data.invitations);
        setTotalPages(Math.ceil(data.totalCount / 10));
      } catch (error) {
        console.error("Error fetching invitations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInvitations();
  }, [currentPage, dashboardId]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1)); // 1페이지 이하로는 내리지 않음
  };

  if (loading) return <div>Loading...</div>;

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
      <p className="px-4 md:px-7 text-xs md:text-sm text-gray300">이메일</p>
      {invitations.length === 0 ? (
        <div className="px-4 md:px-7 text-sm text-gray-500">
          초대 목록이 없어요.
        </div>
      ) : (
        <ul>
          {invitations.map((invitation) => (
            <li key={invitation.id}>
              <p>Inviter: {invitation.inviter.nickname}</p>
              <p>Invitee: {invitation.invitee.nickname}</p>
              <p>Dashboard: {invitation.dashboard.title}</p>
              <p>
                Created At: {new Date(invitation.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default InviteeList;
