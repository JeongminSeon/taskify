// 사용자의 초대 목록 응답 타입
export interface MyInviteListResponse {
  invitations: MyInviteList[];
  cursorId: string;
}

export interface MyInviteList {
  id: number;
  inviter: {
    id: number;
    email: string;
    nickname: string;
  };
  teamId: string;
  dashboard: {
    id: number;
    title: string;
  };
  invitee: {
    id: number;
    email: string;
    nickname: string;
  };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}
