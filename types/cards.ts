// 카드 생성 body 타입
export interface CreateCardBody {
  assigneeUserId: number; // 담당자의 사용자 ID
  dashboardId: number; // 대시보드 ID
  columnId: number; // 카드가 속할 열 ID
  title: string; // 카드 제목
  description: string; // 카드 설명
  dueDate: string; // 카드의 기한
  tags: string[]; // 카드에 할당된 태그들
  imageUrl: string; // 카드에 첨부된 이미지 URL
}

// 담당자 정보 타입
export interface Assignee {
  profileImageUrl: string; // 담당자의 프로필 이미지 URL
  nickname: string; // 담당자의 닉네임
  id: number; // 담당자의 사용자 ID
}

// 개별 카드 타입
export interface Card {
  id: number; // 카드 ID
  title: string; // 카드 제목
  description: string; // 카드 설명
  tags: string[]; // 카드에 할당된 태그들
  dueDate: string; // 카드의 기한
  assignee: Assignee; // 카드의 담당자 정보
  imageUrl: string; // 카드에 첨부된 이미지 URL
  teamId: string; // 카드가 속한 팀 ID
  columnId: number; // 카드가 속한 열 ID
  createdAt: string; // 카드 생성 일시
  updatedAt: string; // 카드 수정 일시
}

// 카드 목록 조회 응답 타입
export interface CardListResponse {
  cursorId: number; // 다음 페이지를 위한 커서 ID
  totalCount: number; // 전체 카드 수
  cards: Card[]; // 카드 목록
}

// 카드 상세 props 타입
export interface CardProps {
  id: number; // 카드 ID
  title: string; // 카드 제목
  description: string; // 카드 설명
  tags: string[]; // 카드에 할당된 태그들
  dueDate: string; // 카드의 기한
  assignee: Assignee; // 카드의 담당자 정보
  imageUrl: string; // 카드에 첨부된 이미지 URL
  columnId: number; // 카드가 속한 열 ID
  createdAt: string; // 카드 생성 일시
  updatedAt: string; // 카드 수정 일시
  isOpen: boolean; // 카드 상세 정보 열림 여부
  onClose: () => void; // 카드 상세 정보 닫기 함수
}
