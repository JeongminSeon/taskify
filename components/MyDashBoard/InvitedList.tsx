import { useEffect, useState } from "react";
import { MyInviteList } from "@/types/invitedList";
import { getMyInvitations } from "@/utils/api/invitationsApi";
import axiosInstance from "@/utils/api/axiosInstanceApi";
import UnInvited from "./UnInvited";
import SearchBox from "../UI/search/SearchBox";
import InvitationsList from "./invitationsList/InvitationsList";
import Loading from "../UI/loading/Loading";
import NoResults from "../UI/search/NoResults";
import useDebounce from "@/hooks/dashboard/useDebounce";

const InvitedList = () => {
  const size = 7;
  const [searchTerm, setSearchTerm] = useState("");
  const [invitations, setInvitations] = useState<MyInviteList[]>([]);
  const [displayCount, setDisplayCount] = useState(size);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // 초대 목록 조회
  const fetchInvitations = async () => {
    try {
      const data = await getMyInvitations();
      setInvitations(data.invitations);
      // setFilteredInvitations(data.invitations);
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
      alert(accepted ? "초대를 수락했습니다." : "초대를 거절했습니다.");
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
            <InvitationsList
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
        <Loading />
      )}
    </div>
  );
};

export default InvitedList;
