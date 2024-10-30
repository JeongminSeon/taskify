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
  cursorId: number;
  cardId: number;
}

export interface CommentCreateParams {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

export interface CommentListResponse {
  cursorId: number;
  comments: Comment[];
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
