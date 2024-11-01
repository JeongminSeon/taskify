import { useEffect, useState } from "react";
import { MyInviteList } from "@/types/invitedList";
import { getMyInvitations } from "@/utils/api/invitationsApi";
import { useDashBoardStore } from "@/store/dashBoardStore";
import axiosInstance from "@/utils/api/axiosInstanceApi";
import UnInvited from "./UnInvited";
import SearchBox from "../UI/search/SearchBox";
import InvitationList from "./invitationsList/InvitationList";
import LoadingSpinner from "../UI/loading/LoadingSpinner";
import NoResults from "../UI/search/NoResults";
import useDebounce from "@/hooks/dashboard/useDebounce";

const InvitedList = () => {
  const size = 7;
  const [searchTerm, setSearchTerm] = useState("");
  const [invitations, setInvitations] = useState<MyInviteList[]>([]);
  const [displayCount, setDisplayCount] = useState(size);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { setDashboards } = useDashBoardStore();

  // 초대 목록 조회
  const fetchInvitations = async () => {
    try {
      const data = await getMyInvitations();
      setInvitations(data.invitations);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  // 초대 수락 및 거절 처리
  const handleInviteResponse = async (
    invitationId: number,
    accepted: boolean
  ) => {
    try {
      await axiosInstance.put(`/invitations/${invitationId}`, {
        inviteAccepted: accepted,
      });

      if (accepted) {
        await setDashboards(); // 대시보드 목록 업데이트
      }

      // 초대 목록도 갱신
      fetchInvitations();
    } catch (err) {
      console.error("초대 상태 업데이트 중 오류 발생:", err);
    }
  };

  // debounced 검색어
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // 필터링된 초대 목록
  const filteredInvitations = invitations.filter((invite) =>
    invite.dashboard.title
      .toLowerCase()
      .includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div className="invitedList mt-6 p md:mt-12 lg:mt-10 bg-white rounded-lg">
      <h3 className="pt-6 px-4 md:pt-[18px] md:px-7 lg:pt-8 text-2xl font-bold">
        초대받은 대시보드
      </h3>
      {invitations.length === 0 ? (
        <UnInvited message="아직 초대받은 대시보드가 없어요" />
      ) : (
        <>
          <SearchBox
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="대시보드 명으로 검색"
          />
          {filteredInvitations.length === 0 ? (
            <NoResults />
          ) : (
            <InvitationList
              filteredInvitations={filteredInvitations}
              displayCount={displayCount}
              setDisplayCount={setDisplayCount}
              handleInviteResponse={handleInviteResponse}
              isLoadingMore={isLoadingMore}
              setIsLoadingMore={setIsLoadingMore}
            />
          )}
        </>
      )}
      {isLoadingMore && displayCount < filteredInvitations.length && (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default InvitedList;
