import { useEffect, useRef } from "react";
import { MyInviteList } from "@/types/invitedList";
import { tableHd } from "../MyDashStyle";
import { v4 as uuidv4 } from "uuid";
import InvitationItem from "./InvitationItem";

interface InvitationsListProps {
  filteredInvitations: MyInviteList[];
  displayCount: number;
  setDisplayCount: React.Dispatch<React.SetStateAction<number>>;
  isLoadingMore: boolean;
  setIsLoadingMore: React.Dispatch<React.SetStateAction<boolean>>;
  handleInviteResponse: (
    invitationId: number,
    accepted: boolean
  ) => Promise<void>;
}

const InvitationsList: React.FC<InvitationsListProps> = ({
  filteredInvitations,
  displayCount,
  setDisplayCount,
  isLoadingMore,
  setIsLoadingMore,
  handleInviteResponse,
}) => {
  const observerRef = useRef<IntersectionObserver | null>(null); // Intersection Observer 생성

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      // 요소가 뷰포트에 들어오고, 로딩 중이 아니며, 추가 초대가 남아있을 때
      if (
        entry.isIntersecting &&
        !isLoadingMore &&
        displayCount < filteredInvitations.length
      ) {
        setIsLoadingMore(true);
        setTimeout(() => {
          setDisplayCount(
            (prev) => Math.min(prev + 6, filteredInvitations.length) // 표시할 초대 수를 증가
          );
          setIsLoadingMore(false);
        }, 500);
      }
    };

    // Intersection Observer 인스턴스 생성
    observerRef.current = new IntersectionObserver(observerCallback);
    const target = document.querySelector("#loadMore");
    if (target) observerRef.current.observe(target);

    // 클린업 함수: 컴포넌트 언마운트 시 Observer 해제
    return () => {
      observerRef.current?.disconnect();
    };
  }, [
    filteredInvitations,
    isLoadingMore,
    displayCount,
    setDisplayCount,
    setIsLoadingMore,
  ]);

  const uniqueInvitations = Array.from(
    new Map(filteredInvitations.map((invite) => [invite.id, invite])).values()
  );

  return (
    <div className="py-3 md:py-6">
      <div className="hidden px-4 md:px-7 md:flex lg:px-20">
        <div className={`${tableHd}`}>이름</div>
        <div className={`${tableHd}`}>초대자</div>
        <div className={`${tableHd}`}>수락 여부</div>
      </div>
      {uniqueInvitations.slice(0, displayCount).map((invite) => (
        <InvitationItem
          key={invite.id ? invite.id : uuidv4()}
          invite={invite}
          handleInviteResponse={handleInviteResponse}
        />
      ))}
      <div id="loadMore" className="h-5" />
    </div>
  );
};

export default InvitationsList;
