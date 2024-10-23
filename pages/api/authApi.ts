import axiosInstance from "./axiosInstanceApi";
import { AxiosError } from "axios";

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

export const login = async (loginData: loginData) => {
  try {
    const response = await axiosInstance.post("/auth/login");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.message;
      const status = error.response?.status ?? 500; // status가 undefined면 500으로 설정

      switch (status) {
        case 400:
          onError(status, "이메일 형식으로 작성해주세요.");
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
