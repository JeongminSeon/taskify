import { useGetInvitedList } from "@/hooks/dashboard/useGetInvitedList";
import axiosInstance from "@/pages/api/axiosInstance";
import UnInvited from "./UnInvited";
import { useCallback, useEffect, useRef, useState } from "react";

const InvitedList = () => {
  const size = 10; // 필요한 만큼의 항목 수 설정
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const { data, loading, error } = useGetInvitedList(size);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastInviteRef = useRef<HTMLLIElement | null>(null);

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

  // Observer 핸들러
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting && !loading) {
        setPage((prev) => prev + 1); // 다음 페이지 요청
      }
    },
    [loading]
  );

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(handleObserver);
    if (lastInviteRef.current) {
      observer.current.observe(lastInviteRef.current);
    }
  }, [loading, handleObserver]);

  // 검색 기능 추가
  const filteredInvitations =
    data?.invitations.filter((invite) =>
      // invite.invitee.nickname
      //   .toLowerCase()
      //   .includes(searchTerm.toLowerCase()) ||
      // invite.inviter.nickname
      //   .toLowerCase()
      //   .includes(searchTerm.toLowerCase()) ||
      invite.dashboard.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []; // 기본값으로 빈 배열을 설정

  if (loading) return <p>Loading...</p>; // 로딩 상태 처리
  if (error) return <p>Error: {error}</p>; // 오류 상태 처리

  return (
    <div className="invitedList mt-6 p md:mt-12 lg:mt-10 bg-white">
      <div className="py-6 px-4 md:py-[18px] md:px-7 lg:py-8">
        <h3 className="text-2xl font-bold">초대받은 대시보드</h3>
        {data && data.invitations.length === 0 ? (
          <UnInvited />
        ) : (
          data && (
            <>
              {data.invitations.length > 0 && (
                <div>
                  <span>icon</span>
                  <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded-md w-full mb-4"
                  />
                </div>
              )}
              <div>
                <div className="md:flex;">header</div>
                {filteredInvitations.map((invite, index) => (
                  <div
                    key={invite.id}
                    className="py-2 border-b"
                    ref={
                      index === filteredInvitations.length - 1
                        ? lastInviteRef
                        : null
                    }
                  >
                    <p>
                      <strong>{invite.dashboard.title}</strong> - 초대받은 사람:{" "}
                      {invite.invitee.nickname} (이메일: {invite.invitee.email})
                    </p>
                    <p>
                      초대한 사람: {invite.inviter.nickname} (이메일:{" "}
                      {invite.inviter.email})
                    </p>
                    <p>
                      초대 상태:{" "}
                      {invite.inviteAccepted !== null
                        ? invite.inviteAccepted
                          ? "수락됨"
                          : "거절됨"
                        : "대기 중"}
                    </p>
                    <button
                      onClick={() => handleInviteResponse(invite.id, true)}
                    >
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
          )
        )}
      </div>
    </div>
  );
};

export default InvitedList;
