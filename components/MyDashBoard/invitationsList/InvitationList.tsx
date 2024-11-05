import { useEffect } from "react";
import { MyInviteList } from "@/types/invitedList";
import { tableHd } from "../MyDashStyle";
import { v4 as uuidv4 } from "uuid";
import InvitationItem from "./InvitationItem";
import useObserver from "@/hooks/useObserver";

// 초대 목록의 props 인터페이스 정의
interface InvitationsListProps {
  filteredInvitations: MyInviteList[]; // 필터링된 초대 목록
  displayCount: number; // 현재 표시된 초대 수
  setDisplayCount: React.Dispatch<React.SetStateAction<number>>; // 표시 수 업데이트 함수
  isLoadingMore: boolean; // 추가 로딩 상태
  setIsLoadingMore: React.Dispatch<React.SetStateAction<boolean>>; // 로딩 상태 업데이트 함수
  // 초대 응답 핸들러
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
  // 인터섹션 옵저버 콜백 함수 정의
  const handleIntersect: IntersectionObserverCallback = (entries) => {
    const entry = entries[0];
    // 요소가 화면에 보일 때 추가 로딩
    if (
      entry.isIntersecting &&
      !isLoadingMore &&
      displayCount < filteredInvitations.length
    ) {
      setIsLoadingMore(true);
      // 일정 시간 후 표시 수 증가
      setTimeout(() => {
        setDisplayCount(
          (prev) => Math.min(prev + 6, filteredInvitations.length) // 최대 필터링된 초대 수로 제한
        );
        setIsLoadingMore(false);
      }, 500);
    }
  };

  const { observe } = useObserver(handleIntersect); // 옵저버 훅 사용

  // 컴포넌트가 마운트될 때 로드 더 버튼 감지
  useEffect(() => {
    const target = document.querySelector("#loadMore");
    if (target) {
      observe(target); // 타겟 요소를 옵저버에 등록
    }
  }, [observe]);

  // 중복된 초대 제거
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
          key={uuidv4()}
          invite={invite}
          handleInviteResponse={handleInviteResponse}
        />
      ))}
      <div id="loadMore" className="h-5" />
    </div>
  );
};

export default InvitationsList;
