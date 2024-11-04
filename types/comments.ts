import { Card } from "./cards";
import { ChangeEvent } from "react";

// 댓글 인터페이스
export interface Comment {
  id: number; // 댓글 ID
  content: string; // 댓글 내용
  createdAt: string; // 댓글 생성 일시
  updatedAt: string; // 댓글 수정 일시
  cardId: number; // 댓글이 달린 카드의 ID
  author: Author; // 댓글 작성자 정보
}

// 댓글 조회 파라미터 타입
export interface CommentParams {
  size: number; // 한 번에 조회할 댓글 수
  cursorId?: number; // 다음 페이지를 조회하기 위한 커서 ID (선택 사항)
  cardId: number; // 조회할 카드의 ID
}

// 댓글 생성 파라미터 타입
export interface CommentCreateParams {
  content: string; // 생성할 댓글의 내용
  cardId: number; // 댓글이 달릴 카드의 ID
  columnId: number; // 댓글이 달릴 컬럼의 ID
  dashboardId: number; // 댓글이 달릴 대시보드의 ID
}

// 댓글 목록 응답 타입
export interface CommentListResponse {
  comments: Comment[]; // 댓글 목록
  cursorId: number; // 다음 페이지를 조회하기 위한 커서 ID
}

// 댓글 작성자 정보 타입
export interface Author {
  profileImageUrl: string; // 작성자의 프로필 이미지 URL
  nickname: string; // 작성자의 닉네임
  id: number; // 작성자의 ID
}

// 개별 댓글 응답 타입
export interface CommentResponse {
  id: number; // 댓글 ID
  content: string; // 댓글 내용
  createdAt: string; // 댓글 생성 일시
  updatedAt: string; // 댓글 수정 일시
  cardId: number; // 댓글이 달린 카드의 ID
  author: Author; // 댓글 작성자 정보
}

// 댓글 상태 관리 인터페이스
export interface CommentState {
  comments: Comment[]; // 댓글 목록
  content: string; // 입력된 댓글 내용
  editCommentId: number | null; // 수정 중인 댓글의 ID (없으면 null)
  editContent: string; // 수정 중인 댓글의 내용
}

// 모달 상태 관리 인터페이스
export interface ModalState {
  isOpen: boolean; // 모달의 열림 상태
  modalMessage: string; // 모달에 표시할 메시지
  closeModal: () => void; // 모달을 닫는 함수
}

// 댓글 관련 액션 인터페이스
export interface CommentActions {
  fetchComments: () => Promise<void>; // 댓글 목록을 가져오는 함수
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void; // 입력 변경 처리 함수
  handleCommentCreate: () => Promise<void>; // 댓글 생성 함수
  handleCommentChange: () => Promise<void>; // 댓글 수정 함수
  handleEditClick: (comment: Comment) => void; // 댓글 수정 클릭 처리 함수
  handleCommentDelete: (commentId: number) => Promise<void>; // 댓글 삭제 함수
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
