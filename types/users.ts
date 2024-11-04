// 사용자 응답 타입
export interface UserResponse {
  id: number; // 사용자의 고유 ID
  email: string; // 사용자의 이메일 주소
  nickname: string; // 사용자의 닉네임
  profileImageUrl: string | null; // 사용자의 프로필 이미지 URL (없을 수 있음)
  createdAt: string; // 사용자 생성 날짜
  updatedAt: string; // 사용자 정보가 마지막으로 업데이트된 날짜
}
