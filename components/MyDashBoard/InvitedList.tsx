import { useGetInvitedList } from "@/hooks/dashboard/useGetInvitedList";
import { useEffect, useState } from "react";
import { InviteList } from "@/types/invitedList";
import { tableHd, tableBox, acceptBtn } from "./style";
import Image from "next/image";
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
            <div className="relative flex mt-4">
              <button
                onClick={performSearch}
                className="absolute left-4 top-1/2 transform -translate-y-1/2"
              >
                <Image
                  src={"/images/icons/icon_search.svg"}
                  width={18}
                  height={18}
                  alt="검색"
                />
              </button>
              <input
                type="text"
                placeholder="검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
                className="border py-2 pl-12 rounded-md w-full"
              />
            </div>
            <div className="py-3 md:py-6">
              <div className="hidden md:flex lg:px-20">
                <div className={`${tableHd}`}>이름</div>
                <div className={`${tableHd}`}>초대자</div>
                <div className={`${tableHd}`}>수락 여부</div>
              </div>
              {filteredInvitations.map((invite) => (
                <div
                  key={invite.id}
                  className="flex flex-col md:flex-row lg:items-center gap-1 md:gap-0 py-[14px] md:py-[22px] lg:px-20 border-b"
                >
                  <div className={`${tableBox}`}>
                    <span className="w-12 md:hidden text-sm text-gray300">
                      이름
                    </span>
                    {invite.dashboard.title}
                  </div>
                  <div className={`${tableBox}`}>
                    <span className="w-12 md:hidden text-sm text-gray300">
                      초대자
                    </span>
                    {invite.inviter.nickname}
                  </div>
                  <div className="flex gap-[10px] flex-1 mt-[10px] md:mt-0">
                    <button
                      type="button"
                      onClick={() => handleInviteResponse(invite.id, true)}
                      className={`${acceptBtn} border-purple-100 bg-purple100 text-white100`}
                    >
                      수락
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInviteResponse(invite.id, false)}
                      className={`${acceptBtn} border-gray400 text-purple100`}
                    >
                      거절
                    </button>
                  </div>
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
