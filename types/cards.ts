// 카드 생성 body 타입
export interface CreateCardBody {
  assigneeUserId: number;
  dashboardId: string | string[] | undefined; //query사용을 위해 임시로 등록
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}

// 담당자 정보 타입
export interface Assignee {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

// 개별 카드 타입
export interface Card {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: Assignee;
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

// 카드 목록 조회 응답 타입
export interface CardListResponse {
  cursorId: number;
  totalCount: number;
  cards: Card[];
}

// 유저 정보 타입
export interface Assignee {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

// 카드 상세 props 타입
export interface CardProps {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: Assignee;
  imageUrl: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface CardResponse {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}
