import { AxiosError, InternalAxiosRequestConfig } from "axios";

export const onError = (status: number, message: string) => {
  const error = new AxiosError(
    message, // 에러 메시지
    undefined, // 에러 코드 (필요 없다면 undefined)
    {} as InternalAxiosRequestConfig, // 빈 요청 구성 (형식에 맞게 제공)
    undefined, // 요청 객체 (필요 없다면 undefined)
    {
      status, // 상태 코드
      data: { message }, // 메시지를 포함한 데이터 객체
      statusText: message, // 상태 텍스트로 메시지 사용
      headers: {}, // 헤더 (필요 없다면 빈 객체)
      config: {} as InternalAxiosRequestConfig, // 빈 요청 구성
    }
  );

  throw error;
};
