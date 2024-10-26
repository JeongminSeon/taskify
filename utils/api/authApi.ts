import axiosInstance from "./axiosInstanceApi";
import { AxiosError } from "axios";
import { getAccessToken } from "./cookie";

interface formData {
  email: string;
  nickname: string;
  password: string;
}

interface loginData {
  email: string;
  password: string;
}

// 에러 핸들링
const onError = (status: number, message: string) => {
  const error = { status, message };
  throw error;
};

// 회원가입
export const createUser = async (formData: formData) => {
  try {
    const response = await axiosInstance.post("/users", formData);
    return response.data;
  } catch (error) {
    //error가 AxiosError인 경우 처리
    if (error instanceof AxiosError) {
      const message = error.message;
      const status = error.response?.status ?? 500; // status가 undefined면 500으로 설정

      switch (status) {
        case 400:
          onError(status, "이메일 형식으로 작성해주세요.");
          break;
        case 409:
          onError(status, "이미 사용중인 이메일입니다.");
          break;
        default:
          onError(status, message);
          break;
      }
    }
  }
};

// 로그인
export const getLogin = async (loginData: loginData) => {
  try {
    const response = await axiosInstance.post("/auth/login", loginData);
    console.log(response.data);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.message;
      const status = error.response?.status ?? 500; // status가 undefined면 500으로 설정

      switch (status) {
        case 400:
          onError(status, "비밀번호가 일치하지 않습니다.");
          break;
        case 404:
          onError(status, "존재하지 않는 유저입니다.");
          break;
        default:
          onError(status, message);
          break;
      }
    }
  }
};

// 내 정보 조회
export const getUserInfo = async () => {
  const token = getAccessToken();
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }
  try {
    const response = await axiosInstance.get("/users/me");

    return response.data;
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    throw error;
  }
};
