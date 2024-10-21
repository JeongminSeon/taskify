import { useGetInvitedList } from "@/hooks/dashboard/useGetInvitedList";
import { useEffect, useState } from "react";
import { InviteList } from "@/types/dashboardsTypes";
import axiosInstance from "@/pages/api/axiosInstance";
import UnInvited from "./UnInvited";

const InvitedList = () => {
  const size = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const { data, loading, error } = useGetInvitedList(size);
  const [filteredInvitations, setFilteredInvitations] = useState<InviteList[]>(
    []
  );

  const handleInviteResponse = async (
    invitationId: number,
    accepted: boolean
  ) => {
    try {
      await axiosInstance.put(`/invitations/${invitationId}`, {
        inviteAccepted: accepted,
      });
    } catch (err) {
      console.error("Error updating invitation status:", err);
    }
  };

  useEffect(() => {
    if (data) {
      setFilteredInvitations(data);
    }
  }, [data]);

  // 검색 기능
  const performSearch = () => {
    if (!searchTerm) {
      setFilteredInvitations(data || []);
      return;
    }

    const filtered = (data || []).filter(
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="invitedList mt-6 p md:mt-12 lg:mt-10 bg-white">
      <div className="py-6 px-4 md:py-[18px] md:px-7 lg:py-8">
        <h3 className="text-2xl font-bold">초대받은 대시보드</h3>
        {filteredInvitations.length === 0 ? (
          <UnInvited />
        ) : (
          <>
            <div className="relative">
              <button
                onClick={performSearch}
                className="p-2 bg-blue-500 text-white rounded-md"
              >
                검색
              </button>
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
                className="border p-2 rounded-md w-full mb-4"
              />
            </div>
            <div className="py-3 md:py-6">
              <div className="md:flex mb-4">
                <div className="flex-1 font-bold">이름</div>
                <div className="flex-1 font-bold">초대자</div>
                <div className="flex-1 font-bold">수락 여부</div>
              </div>
              {filteredInvitations.map((invite) => (
                <div key={invite.id} className="py-2 border-b">
                  <div className="flex-1">{invite.dashboard.title}</div>
                  <div className="flex-1">{invite.inviter.nickname}</div>
                  <div className="flex-1">
                    {invite.inviteAccepted !== null
                      ? invite.inviteAccepted
                        ? "수락됨"
                        : "거절됨"
                      : "대기 중"}
                  </div>
                  <button onClick={() => handleInviteResponse(invite.id, true)}>
                    수락
                  </button>
                  <button
                    onClick={() => handleInviteResponse(invite.id, false)}
                  >
                    거절
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InvitedList;
