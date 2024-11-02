import React from "react";

interface InviteeItemProps {
  invitation: {
    id: number;
    invitee: {
      email: string;
    };
  };
  handleDeleteInvitation: (id: number) => void;
}

const InviteeItem: React.FC<InviteeItemProps> = ({
  invitation,
  handleDeleteInvitation,
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
