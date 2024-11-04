import { Card as CardResponse } from "./cards";

// 대시보드 상세 응답 타입
export type DashboardDetailResponse = {
  id: number; // 대시보드 ID
  title: string; // 대시보드 제목
  color: string; // 대시보드 색상
  createdAt: string; // 대시보드 생성 일시
  updatedAt: string; // 대시보드 수정 일시
  userId: number; // 대시보드 생성자 ID
  createdByMe: boolean; // 내가 생성한 대시보드인지 여부
};

// 대시보드 타입
export type Dashboard = {
  id: number; // 대시보드 ID
  title: string; // 대시보드 제목
  color: string; // 대시보드 색상
  createdAt: string; // 대시보드 생성 일시
  updatedAt: string; // 대시보드 수정 일시
  createdByMe: boolean; // 내가 생성한 대시보드인지 여부
  userId: number; // 대시보드 생성자 ID
};

// 대시보드 응답 타입
export type DashboardResponse = {
  cursorId: number; // 다음 페이지를 조회하기 위한 커서 ID
  totalCount: number; // 전체 대시보드 수
  dashboards: Dashboard[]; // 대시보드 목록
};

// 초대자 정보 타입
interface Inviter {
  id: number; // 초대자의 ID
  email: string; // 초대자의 이메일
  nickname: string; // 초대자의 닉네임
}

// 초대받는 사람 정보 타입
interface Invitee {
  id: number; // 초대받는 사람의 ID
  email: string; // 초대받는 사람의 이메일
  nickname: string; // 초대받는 사람의 닉네임
}

// 초대 인터페이스
export interface Invitation {
  id: number; // 초대 ID
  inviter: Inviter; // 초대자 정보
  teamId: string; // 팀 ID
  dashboard: Dashboard; // 초대된 대시보드 정보
  invitee: Invitee; // 초대받는 사람 정보
  inviteAccepted: boolean | null; // 초대 수락 여부 (null이면 아직 수락되지 않음)
  createdAt: string; // 초대 생성 일시
  updatedAt: string; // 초대 수정 일시
}

// 초대 목록 응답 타입
export interface InvitationsResponse {
  invitations: Invitation[]; // 초대 목록
  totalCount: number; // 전체 초대 수
}

// 대시보드 생성 응답 타입
export type CreateDashboardResponse = {
  id: number; // 대시보드 ID
  title: string; // 대시보드 제목
  color: string; // 대시보드 색상
  createdAt: string; // 대시보드 생성 일시
  updatedAt: string; // 대시보드 수정 일시
  createdByMe: boolean; // 내가 생성한 대시보드인지 여부
  userId: number; // 대시보드 생성자 ID
};

// 팀원 정보 인터페이스
export interface Member {
  id: number; // 팀원 ID
  userId: number; // 사용자 ID
  email: string; // 팀원 이메일
  nickname: string; // 팀원 닉네임
  profileImageUrl: string | null; // 팀원 프로필 이미지 URL (없으면 null)
  createdAt: string; // 팀원 생성 일시
  updatedAt: string; // 팀원 수정 일시
  isOwner: boolean; // 팀원 중 소유자인지 여부
}

// 팀원 목록 응답 타입
export interface MembersResponse {
  members: Member[]; // 팀원 목록
  totalCount: number; // 전체 팀원 수
}

// 할 일 폼 프로퍼티 타입
export interface TodoFormProps {
  dashboardId?: number; // 대시보드 ID (선택 사항)
  columnId: number; // 컬럼 ID
  assigneeUserId: number; // 담당자 사용자 ID
  title: string; // 할 일 제목
  description: string; // 할 일 설명
  dueDate: string; // 마감 일자
  tags: string[]; // 태그 목록
  imageUrl: string; // 이미지 URL
}

// 할 일 모달 프로퍼티 타입
export interface TodoModalProps {
  cardId?: number; // 카드 ID (선택 사항)
  isOpen?: boolean; // 모달의 열림 상태 (선택 사항)
  onClose: () => void; // 모달 닫기 함수
  dashboardId?: number; // 대시보드 ID (선택 사항)
  onUpdateCard?: (card: CardResponse) => void; // 카드 업데이트 함수 (선택 사항)
  onCreateCard?: (card: CardResponse) => void; // 카드 생성 함수 (선택 사항)
  onRefresh?: () => void; // 새로 고침 함수 (선택 사항)
}
