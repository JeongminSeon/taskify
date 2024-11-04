// 멤버 응답 타입
export interface MemberResponse {
  members: Member[];
  totalCount: number;
}

export interface Member {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}
