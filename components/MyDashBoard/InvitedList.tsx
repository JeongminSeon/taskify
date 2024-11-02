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

      const uniqueInvitationsSet = new Set();
      const uniqueInvitations = data.invitations.filter((invite) => {
        const identifier = `${invite.invitee.id}-${invite.dashboard.id}`;
        if (uniqueInvitationsSet.has(identifier)) {
          return false; // 중복이면 제거
        }
        uniqueInvitationsSet.add(identifier);
        return true; // 유일한 초대만 유지
      });

      setInvitations(uniqueInvitations);
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

      // 초대 목록에서 해당 초대 제거
      setInvitations((prevInvitations) => {
        const updatedInvitations = prevInvitations.filter(
          (invite) => invite.id !== invitationId
        );

        // 새로 고침할 때 필요한 상태를 저장
        // 만약 accepted가 true일 경우 대시보드를 다시 가져올 수 있도록 관리
        if (accepted) {
          setDashboards(); // 대시보드 목록 업데이트
        }

        return updatedInvitations;
      });

      // 초대 목록 다시 가져오기
      await fetchInvitations(); // 호출하지 않음
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
