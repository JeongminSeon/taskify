import axiosInstance from "./axiosInstanceApi";
import axios from "axios";

import {
  ProfileImageParams,
  ProfileImageResponse,
  ProfileProps,
} from "@/types/my";

// FormData 인터페이스 정의
interface formData {
  email: string; // 사용자 이메일
  nickname: string; // 사용자 닉네임
  password: string; // 사용자 비밀번호
}

// 로그인 데이터 인터페이스 정의
interface loginData {
  email: string; // 로그인에 사용할 이메일
  password: string; // 로그인에 사용할 비밀번호
}

// 비밀번호 변경 데이터 인터페이스 정의
interface PasswordData {
  password: string; // 현재 비밀번호
  newPassword: string; // 새 비밀번호
}

// 회원가입 API 호출
export const createUser = async (formData: formData) => {
  try {
    const response = await axiosInstance.post("/users", formData); // 사용자 생성 요청
    return response.data; // 응답 데이터 반환
  } catch (error) {
    throw error; // 에러 발생 시 에러를 throw
  }
};

// 로그인 API 호출
export const getLogin = async (loginData: loginData) => {
  try {
    const response = await axiosInstance.post("/auth/login", loginData); // 로그인 요청
    return response.data; // 응답 데이터 반환
  } catch (error) {
    throw error; // 에러 발생 시 에러를 throw
  }
};

// 내 정보 조회 API 호출
export const getUserInfo = async (token?: string) => {
  try {
    const response = await axiosInstance.get("/users/me", {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined, // 토큰이 있을 경우 Authorization 헤더 추가
    });
    return response.data; // 응답 데이터 반환
  } catch (error) {
    throw error; // 에러 발생 시 에러를 throw
  }
};

// 내 정보 수정 API 호출
export const updateUserInfo = async ({
  nickname,
  profileImageUrl,
}: {
  nickname: string; // 수정할 닉네임
  profileImageUrl?: string; // 수정할 프로필 이미지 URL (선택적)
}): Promise<ProfileProps> => {
  try {
    const response = await axiosInstance.put("/users/me", {
      nickname,
      profileImageUrl,
    }); // 내 정보 수정 요청
    return response.data; // 응답 데이터 반환
  } catch (error) {
    throw error; // 에러 발생 시 에러를 throw
  }
};

// 비밀번호 변경 API 호출
export const updatePassword = async (PasswordData: PasswordData) => {
  try {
    const response = await axiosInstance.put("/auth/password", PasswordData); // 비밀번호 변경 요청
    return response.data; // 응답 데이터 반환
  } catch (error) {
    throw error; // 에러 발생 시 에러를 throw
  }
};

// 프로필 이미지 업로드 API 호출
export const createCardImage = async ({
  image,
}: ProfileImageParams): Promise<ProfileImageResponse> => {
  const formData = new FormData(); // FormData 객체 생성
  if (!image) throw new Error("이미지가 없습니다."); // 이미지가 없으면 에러 발생
  formData.append("image", image); // FormData에 이미지 추가

  try {
    const response = await axiosInstance.post(`/users/me/image`, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data", // multipart/form-data 헤더 추가
      },
    });
    return response.data; // 응답 데이터 반환
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 413) {
        throw new Error(
          "이미지 파일이 너무 큽니다. 최대 파일 크기를 확인해주세요." // 파일 크기 제한 에러 처리
        );
      }

      throw error; // 기타 Axios 에러 발생 시 에러를 throw
    } else {
      throw new Error("예상치 못한 오류가 발생했습니다."); // 예외 처리
    }
  }
};
