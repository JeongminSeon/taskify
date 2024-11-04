export interface MyInviteList {
  id: number; // 초대 ID
  inviter: {
    // 초대자 정보
    id: number; // 초대자 ID
    email: string; // 초대자 이메일
    nickname: string; // 초대자 닉네임
  };
  teamId: string; // 팀 ID
  dashboard: {
    // 대시보드 정보
    id: number; // 대시보드 ID
    title: string; // 대시보드 제목
  };
  invitee: {
    // 초대받는 사람 정보
    id: number; // 초대받는 사람 ID
    email: string; // 초대받는 사람 이메일
    nickname: string; // 초대받는 사람 닉네임
  };
  inviteAccepted: boolean; // 초대 수락 여부
  createdAt: string; // 초대 생성 일시
  updatedAt: string; // 초대 수정 일시
}

// 사용자의 초대 목록 응답 타입
export interface MyInviteListResponse {
  invitations: MyInviteList[];
  cursorId: string;
}
