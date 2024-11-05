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
  const size = 7; // 한 번에 표시할 초대 수
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [invitations, setInvitations] = useState<MyInviteList[]>([]); // 초대 목록 상태
  const [displayCount, setDisplayCount] = useState(size); // 표시할 초대 수 상태
  const [isLoadingMore, setIsLoadingMore] = useState(false); // 더 불러오기 상태
  const { setDashboards } = useDashBoardStore(); // 대시보드 목록 업데이트 함수

  // 초대 목록 조회
  const fetchInvitations = async () => {
    try {
      const data = await getMyInvitations(); // 초대 목록 API 호출

      // 중복 초대 필터링
      const uniqueInvitations = data.invitations
        .filter(
          (invite, index, self) =>
            index ===
            self.findIndex(
              (t) =>
                t.invitee.id === invite.invitee.id &&
                t.dashboard.id === invite.dashboard.id
            )
        )
        .filter((invite): invite is MyInviteList => invite !== undefined); // undefined 필터링

      setInvitations(uniqueInvitations); // 초대 목록 상태 업데이트
    } catch (error) {
      throw error;
    }
  };

  // 컴포넌트가 마운트될 때 초대 목록 조회
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
        inviteAccepted: accepted, // 수락 여부 전송
      });

      if (accepted) {
        setDashboards(); // 대시보드 목록 업데이트
      }

      // 초대 목록 다시 가져오기 (API 호출하지 않음)
      await fetchInvitations();
    } catch (error) {
      throw error;
    }
  };

  // 디바운스를 적용한 검색어
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
