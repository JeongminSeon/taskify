export interface UserResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}
