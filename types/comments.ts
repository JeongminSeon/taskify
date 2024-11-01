import { Card } from "./cards";
import { ChangeEvent } from "react";
export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: Author;
}
export interface CommentParams {
  size: number;
  cursorId?: number;
  cardId: number;
}

export interface CommentCreateParams {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

export interface CommentListResponse {
  comments: Comment[];
  cursorId: number;
}

export interface Author {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

export interface CommentResponse {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: Author;
}

// 추가
export interface CommentState {
  comments: Comment[];
  content: string;
  editCommentId: number | null;
  editContent: string;
}

export interface ModalState {
  isOpen: boolean;
  modalMessage: string;
  closeModal: () => void;
}

export interface CommentActions {
  fetchComments: () => Promise<void>;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCommentCreate: () => Promise<void>;
  handleCommentChange: () => Promise<void>;
  handleEditClick: (comment: Comment) => void;
  handleCommentDelete: (commentId: number) => Promise<void>;
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
