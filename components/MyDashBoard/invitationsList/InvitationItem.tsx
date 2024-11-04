import { MyInviteList } from "@/types/invitedList";
import { tableBox, acceptBtn } from "../MyDashStyle";

// 초대 항목의 props 인터페이스 정의
interface InviteItemProps {
  invite: MyInviteList; // 초대 데이터
  // 초대 응답 핸들러
  handleInviteResponse: (
    invitationId: number,
    accepted: boolean
  ) => Promise<void>; // 비동기 함수 반환
}

const InviteItem: React.FC<InviteItemProps> = ({
  invite,
  handleInviteResponse,
}) => {
  return (
    <div className="tableList sm:block md:flex md:flex-row md:items-center gap-1 md:gap-0 py-[14px] md:py-[22px] px-4 md:px-7 lg:px-20 border-b">
      <div className={`${tableBox}`}>
        <span className="w-12 md:hidden text-sm text-gray300">이름</span>
        {invite.dashboard.title}
      </div>
      <div className={`${tableBox}`}>
        <span className="w-12 md:hidden text-sm text-gray300">초대자</span>
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
  );
};

export default InviteItem;
