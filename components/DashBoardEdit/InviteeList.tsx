import { getInvitations } from "@/utils/api/dashboardsApi";
import { Invitation, InvitationsResponse } from "@/types/dashboards";
import { useEffect, useState } from "react";
import Pagination from "../UI/pagination/Pagination";

interface InviteeListProps {
  dashboardId: number; // dashboardId의 타입 정의
}

const InviteeList: React.FC<InviteeListProps> = ({ dashboardId }) => {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const data: InvitationsResponse = await getInvitations(
          dashboardId,
          currentPage,
          10
        );
        setInvitations(data.invitations);
        setTotalPages(Math.ceil(data.totalCount / 10));
      } catch (error) {
        console.error("Error fetching invitations:", error);
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

  return (
    <>
      <div className="overflow-hidden absolute right-4 md:right-7 top-5 flex flex-col items-end md:flex-row md:items-center gap-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
        />
        <button
          type="button"
          className="float-right flex items-center gap-[6px] md:gap-2 md:w-[105px] h-[26px] md:h-8 px-3 text-white100 text-xs md:text-sm bg-purple100 rounded-[4px]"
        >
          {/* <Image
            src="/images/icons/icon_add_box.svg"
            width={16}
            height={16}
            alt="초대하기"
            className="text-white"
          /> 
          */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.37508 10.7083V13.4166C9.37508 13.594 9.43491 13.7425 9.55456 13.8621C9.67421 13.9818 9.82271 14.0416 10.0001 14.0416C10.1774 14.0416 10.3259 13.9818 10.4456 13.8621C10.5652 13.7425 10.625 13.594 10.625 13.4166V10.7083H13.3334C13.5107 10.7083 13.6592 10.6485 13.7789 10.5288C13.8985 10.4092 13.9584 10.2607 13.9584 10.0833C13.9584 9.90597 13.8985 9.75747 13.7789 9.63781C13.6592 9.51816 13.5107 9.45833 13.3334 9.45833H10.625V6.74998C10.625 6.57263 10.5652 6.42413 10.4456 6.30448C10.3259 6.18483 10.1774 6.125 10.0001 6.125C9.82271 6.125 9.67421 6.18483 9.55456 6.30448C9.43491 6.42413 9.37508 6.57263 9.37508 6.74998V9.45833H6.66673C6.48938 9.45833 6.34088 9.51816 6.22123 9.63781C6.10157 9.75747 6.04175 9.90597 6.04175 10.0833C6.04175 10.2607 6.10157 10.4092 6.22123 10.5288C6.34088 10.6485 6.48938 10.7083 6.66673 10.7083H9.37508ZM4.42316 17.1666C4.00222 17.1666 3.64591 17.0208 3.35425 16.7291C3.06258 16.4375 2.91675 16.0812 2.91675 15.6602V4.50642C2.91675 4.08547 3.06258 3.72917 3.35425 3.4375C3.64591 3.14583 4.00222 3 4.42316 3H15.577C15.9979 3 16.3542 3.14583 16.6459 3.4375C16.9375 3.72917 17.0834 4.08547 17.0834 4.50642V15.6602C17.0834 16.0812 16.9375 16.4375 16.6459 16.7291C16.3542 17.0208 15.9979 17.1666 15.577 17.1666H4.42316ZM4.42316 15.9166H15.577C15.6411 15.9166 15.6998 15.8899 15.7533 15.8365C15.8067 15.7831 15.8334 15.7243 15.8334 15.6602V4.50642C15.8334 4.44231 15.8067 4.38354 15.7533 4.3301C15.6998 4.27669 15.6411 4.24998 15.577 4.24998H4.42316C4.35905 4.24998 4.30028 4.27669 4.24685 4.3301C4.19344 4.38354 4.16673 4.44231 4.16673 4.50642V15.6602C4.16673 15.7243 4.19344 15.7831 4.24685 15.8365C4.30028 15.8899 4.35905 15.9166 4.42316 15.9166Z"
              fill="#fff"
            />
          </svg>
          초대하기
        </button>
      </div>
      <p className="px-4 md:px-7 text-xs md:text-sm text-gray300">이메일</p>

      {invitations.length === 0 ? (
        <div className="px-4 md:px-7 text-sm text-gray-500">
          초대 목록이 없어요.
        </div>
      ) : (
        <ul className="pt-[26px] md:pt-4">
          {invitations.map((invitation) => (
            <li
              key={invitation.id}
              className="flex justify-between py-3 md:py-4 px-4 md:px-7 border-b border-gray500"
            >
              <p>{invitation.invitee.email}</p>
              <button
                type="button"
                className="sm:w-[52px] md:w-[84px] h-8 border borer-gray400 rounded-[4px] text-xs md:text-sm text-purple100 font-medium leading-8"
              >
                삭제하기
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default InviteeList;
