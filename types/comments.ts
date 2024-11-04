import { Card } from "./cards";

// 댓글 타입
export interface Comment {
  id: number; // 댓글 ID
  content: string; // 댓글 내용
  createdAt: string; // 댓글 생성 일시
  updatedAt: string; // 댓글 수정 일시
  cardId: number; // 댓글이 달린 카드의 ID
  author: Author; // 댓글 작성자 정보
}

// 댓글 요청 파라미터 타입
export interface CommentParams {
  size: number; // 한 번에 조회할 댓글 수
  cursorId?: number; // 다음 페이지를 조회하기 위한 커서 ID (선택 사항)
  cardId: number; // 조회할 카드의 ID
}

// 댓글 생성 요청 파라미터 타입
export interface CommentCreateParams {
  content: string; // 생성할 댓글의 내용
  cardId: number; // 댓글이 달릴 카드의 ID
  columnId: number; // 댓글이 달릴 컬럼의 ID
  dashboardId: number; // 댓글이 달릴 대시보드의 ID
}

// 댓글 목록 응답 타입
// 댓글 목록 응답 타입
export interface CommentListResponse {
  comments: Comment[]; // 댓글 목록
  cursorId: number; // 다음 페이지를 조회하기 위한 커서 ID
}

// 댓글 작성자 정보 타입
// 댓글 작성자 정보 타입
export interface Author {
  profileImageUrl: string; // 작성자의 프로필 이미지 URL
  nickname: string; // 작성자의 닉네임
  id: number; // 작성자의 ID
}

// 댓글 응답 타입
export interface CommentResponse {
  id: number; // 댓글 ID
  content: string; // 댓글 내용
  createdAt: string; // 댓글 생성 일시
  updatedAt: string; // 댓글 수정 일시
  cardId: number; // 댓글이 달린 카드의 ID
  author: Author; // 댓글 작성자 정보
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

// 댓글 훅 반환 타입
export interface UseCommentsReturn {
  state: CommentState; // 댓글 상태
  modal: ModalState; // 모달 상태
  actions: CommentActions; // 댓글 관련 액션
}

// 댓글 훅 프로퍼티 타입
export interface UseCommentsProps {
  card: Card; // 댓글을 추가할 카드 정보
  dashboardId: number; // 댓글이 달릴 대시보드의 ID
}
