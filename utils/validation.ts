// 입력된 이메일이 유효한지 검사하는 함수
export const isEmailValid = (enteredEmail: string) => {
  // 정규 표현식을 사용하여 이메일 형식 검사
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail);
};

// 입력된 비밀번호가 유효한지 검사하는 함수
export const isPWValid = (enteredPW: string) => {
  // 비밀번호 길이가 8자 이상인지 확인
  return enteredPW.length >= 8;
};

// 두 문자열이 같은지 비교하는 함수
export const isSame = (str1: string, str2?: string) => {
  // 두 문자열이 같으면 true, 다르면 false 반환
  return str2 ? str1 === str2 : false;
};

// 입력된 값이 비어있지 않은지 확인하는 함수
export const isEntered = (value: string) => {
  // 값의 길이가 0이 아니면 true, 비어있으면 false 반환
  return value.length !== 0;
};
