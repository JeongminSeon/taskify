import axiosInstance from "./axiosInstanceApi";
import { AxiosError } from "axios";
import { onError } from "./error";

interface formData {
  email: string;
  nickname: string;
  password: string;
}

interface loginData {
  email: string;
  password: string;
}

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
export const getLogin = async (loginData: loginData) => {
  try {
    const response = await axiosInstance.post("/auth/login", loginData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || error.message;
      const status = error.response?.status ?? 500;
      onError(status, message);
    }
    throw error;
  }
};

// 내 정보 조회
export const getUserInfo = async (token?: string) => {
  try {
    const response = await axiosInstance.get("/users/me", {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    throw error;
  }
};

//내 정보 수정
export const UpdateUserInfo = async ({
  nickname,
  profileImageUrl,
}: {
  nickname: string;
  profileImageUrl?: string;
}) => {
  try {
    const response = await axiosInstance.put("/users/me", {
      nickname,
      profileImageUrl,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update user info:", error);
    throw error;
  }
};
