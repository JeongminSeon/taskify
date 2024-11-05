import React from "react";

// 초대받은 사람의 아이템 프로퍼티 정의
interface InviteeItemProps {
  invitation: {
    id: number; // 초대의 고유 ID
    invitee: {
      email: string; // 초대받은 사람의 이메일
    };
  };
  handleDeleteInvitation: (id: number) => void; // 초대를 삭제하는 함수
}

const InviteeItem: React.FC<InviteeItemProps> = ({
  invitation, // 초대 정보
  handleDeleteInvitation, // 삭제 처리 함수
}) => {
  return (
    <li
      key={invitation.id}
      className="flex justify-between py-3 md:py-4 px-4 md:px-7 border-b border-gray500"
    >
      <p>{invitation.invitee.email}</p>
      <button
        type="button"
        className="sm:w-[52px] md:w-[84px] h-8 border border-gray400 rounded-[4px] text-xs md:text-sm text-purple100 font-medium leading-8"
        onClick={() => handleDeleteInvitation(invitation.id)}
      >
        삭제하기
      </button>
    </li>
  );
};

export default InviteeItem;
