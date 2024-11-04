// 입력 필드 컴포넌트의 속성 타입
export interface InputFieldProps {
  label: string; // 입력 필드의 레이블
  name: string; // 입력 필드의 이름
  placeholder?: string; // 입력 필드의 플레이스홀더 텍스트 (선택적)
  type?: string; // 입력 필드의 타입 (예: 'text', 'password' 등, 선택적)
  value?: string; // 입력 필드의 현재 값 (선택적)
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // 값 변경 시 호출되는 함수 (선택적)
  readOnly?: boolean; // 읽기 전용 여부 (선택적)
  error?: boolean; // 오류 발생 여부 (선택적)
  errorMessage?: string; // 오류 메시지 (선택적)
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // 포커스가 벗어날 때 호출되는 함수 (선택적)
}

// 버튼 컴포넌트의 속성 타입
export interface ButtonProps {
  children: React.ReactNode; // 버튼에 표시할 내용
  onClick?: () => void; // 버튼 클릭 시 호출되는 함수 (선택적)
  disabled?: boolean; // 버튼 비활성화 여부 (선택적)
}

// 비밀번호 관련 속성 타입
export interface PasswordProps {
  current: string; // 현재 비밀번호
  new: string; // 새 비밀번호
  confirm: string; // 새 비밀번호 확인
}

// 프로필 이미지 생성 파라미터 타입
export interface ProfileImageParams {
  image: File | null; // 업로드할 이미지 파일
}

// 프로필 이미지 생성 응답 타입
export interface ProfileImageResponse {
  profileImageUrl: string; // 생성된 프로필 이미지 URL
}

// 프로필 타입
export interface ProfileProps {
  email: string; // 사용자 이메일
  nickname: string; // 사용자 닉네임
  profileImageUrl: string | null; // 프로필 이미지 URL (없을 수 있음)
}
