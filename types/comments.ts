import { Card } from "./cards";

// 댓글 타입
export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: Author;
}

// 댓글 요청 파라미터 타입
export interface CommentParams {
  size: number;
  cursorId?: number;
  cardId: number;
}

// 댓글 생성 요청 파라미터 타입
export interface CommentCreateParams {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

// 댓글 목록 응답 타입
export interface CommentListResponse {
  comments: Comment[];
  cursorId: number;
}

// 댓글 작성자 정보 타입
export interface Author {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

// 댓글 응답 타입
export interface CommentResponse {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: Author;
}

// 댓글 상태 타입
export interface CommentState {
  comments: Comment[];
  content: string; // 현재 입력 중인 댓글 내용
  editCommentId: number | null; // 수정 중인 댓글의 ID
  editContent: string; // 수정 중인 댓글의 내용
}

// 모달 상태를 나타내는 인터페이스
export interface ModalState {
  isOpen: boolean; // 모달의 열림 상태
  modalMessage: string; // 모달에 표시할 메시지
  closeModal: () => void; // 모달을 닫는 함수
}

// 댓글 관련 액션을 정의하는 인터페이스
export interface CommentActions {
  fetchComments: () => Promise<void>; // 댓글을 조회하는 함수
  handleInputChange: (value: string) => void; // 댓글 입력값 변경 핸들러
  handleCommentCreate: () => Promise<void>; // 새 댓글을 생성하는 함수
  handleCommentChange: (commentId: number) => Promise<void>; // 댓글 내용을 수정하는 함수
  handleEditClick: (commentId: number, currentContent: string) => void; // 댓글 수정 클릭 핸들러
  handleCommentDelete: (commentId: number) => Promise<void>; // 댓글을 삭제하는 함수
}

export interface UseCommentsReturn {
  state: CommentState;
  modal: ModalState;
  actions: CommentActions;
}

export interface UseCommentsProps {
  card: Card;
  dashboardId: number;
}
