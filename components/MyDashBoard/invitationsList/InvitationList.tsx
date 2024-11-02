import { useEffect } from "react";
import { MyInviteList } from "@/types/invitedList";
import { tableHd } from "../MyDashStyle";
import InvitationItem from "./InvitationItem";
import useObserver from "@/hooks/useObserver"; // 경로 조정 필요

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
  const handleIntersect: IntersectionObserverCallback = (entries) => {
    const entry = entries[0];
    if (
      entry.isIntersecting &&
      !isLoadingMore &&
      displayCount < filteredInvitations.length
    ) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setDisplayCount((prev) =>
          Math.min(prev + 6, filteredInvitations.length)
        );
        setIsLoadingMore(false);
      }, 500);
    }
  };

  const { observe } = useObserver(handleIntersect);

  useEffect(() => {
    const target = document.querySelector("#loadMore");
    if (target) {
      observe(target);
    }
  }, [observe]);

  return (
    <div className="py-3 md:py-6">
      <div className="hidden px-4 md:px-7 md:flex lg:px-20">
        <div className={`${tableHd}`}>이름</div>
        <div className={`${tableHd}`}>초대자</div>
        <div className={`${tableHd}`}>수락 여부</div>
      </div>
      {filteredInvitations.slice(0, displayCount).map((invite) => (
        <InvitationItem
          key={invite.id}
          invite={invite}
          handleInviteResponse={handleInviteResponse}
        />
      ))}
      <div id="loadMore" className="h-5" />
    </div>
  );
};

export default InvitationsList;
