// 멤버 응답 타입
export interface MemberResponse {
  members: Member[];
  totalCount: number;
}

export interface Member {
  id: number; // 구성원 ID
  userId: number; // 사용자 ID
  email: string; // 이메일 주소
  nickname: string; // 사용자 닉네임
  profileImageUrl: string; // 프로필 이미지 URL
  createdAt: string; // 계정 생성 일시
  updatedAt: string; // 마지막 수정 일시
  isOwner: boolean; // 팀 소유자 여부
}
