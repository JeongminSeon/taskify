import { useEffect, useState } from "react";
import { MyInviteList } from "@/types/invitedList";
import { tableHd } from "./MyDashStyle";
import { getMyInvitations } from "@/utils/api/invitationsApi";
import axiosInstance from "@/utils/api/axiosInstanceApi";
import UnInvited from "./UnInvited";
import SearchBox from "../UI/search/SearchBox";
import InviteItem from "./components/InviteItem";

const InvitedList = () => {
  const size = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [invitations, setInvitations] = useState<MyInviteList[]>([]);
  const [filteredInvitations, setFilteredInvitations] = useState<
    MyInviteList[]
  >([]);

  // 초대받은 목록 조회
  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const data = await getMyInvitations(size);
        setInvitations(data.invitations);
        setFilteredInvitations(data.invitations);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInvitations();
  }, []);

  // 초대 수락 & 거절
  const handleInviteResponse = async (
    invitationId: number,
    accepted: boolean
  ) => {
    try {
      await axiosInstance.put(`/invitations/${invitationId}`, {
        inviteAccepted: accepted,
      });
      const message = accepted
        ? "초대를 수락했습니다."
        : "초대를 거절했습니다.";
      alert(message);
    } catch (err) {
      console.error("Error updating invitation status:", err);
    }
  };

  // 검색 기능
  const performSearch = () => {
    if (!searchTerm) {
      setFilteredInvitations(invitations || []);
      return;
    }

    const filtered = (invitations || []).filter(
      (invite) =>
        invite.invitee.nickname
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        invite.inviter.nickname
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        invite.dashboard.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInvitations(filtered);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      performSearch();
    }
  };

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
            performSearch={performSearch}
            handleKeyPress={handleKeyPress}
          />
          {filteredInvitations.length === 0 ? (
            <div className="mt-4 text-center text-gray-500">
              검색 결과가 없습니다.
            </div>
          ) : (
            <div className="py-3 md:py-6 ">
              <div className="hidden px-4 md:px-7 md:flex lg:px-20">
                <div className={`${tableHd}`}>이름</div>
                <div className={`${tableHd}`}>초대자</div>
                <div className={`${tableHd}`}>수락 여부</div>
              </div>
              {filteredInvitations.map((invite) => (
                <InviteItem
                  key={invite.id}
                  invite={invite}
                  handleInviteResponse={handleInviteResponse}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InvitedList;
