import { useEffect, useState } from "react";
import { MyInviteList } from "@/types/invitedList";
import { tableHd, tableBox, acceptBtn } from "./MyDashStyle";
import { getMyInvitations } from "@/utils/api/invitationsApi";
import Image from "next/image";
import axiosInstance from "@/utils/api/axiosInstanceApi";
import UnInvited from "./UnInvited";

const InvitedList = () => {
  const size = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [invitations, setInvitations] = useState<MyInviteList[]>([]);
  const [filteredInvitations, setFilteredInvitations] = useState<
    MyInviteList[]
  >([]);

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
      {filteredInvitations.length === 0 ? (
        <UnInvited />
      ) : (
        <>
          <div className="searchBox relative flex mt-4 mx-4 md:mx-7 ">
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
          <div className="py-3 md:py-6 ">
            <div className="hidden px-4 md:px-7 md:flex lg:px-20">
              <div className={`${tableHd}`}>이름</div>
              <div className={`${tableHd}`}>초대자</div>
              <div className={`${tableHd}`}>수락 여부</div>
            </div>
            {filteredInvitations.map((invite) => (
              <div
                key={invite.id}
                className="tableList flex flex-col md:flex-row lg:items-center gap-1 md:gap-0  py-[14px] md:py-[22px] px-4 md:px-7 lg:px-20 border-b"
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
  );
};

export default InvitedList;
