import axiosInstance from "./axiosInstanceApi";
import axios from "axios";

import {
  ProfileImageParams,
  ProfileImageResponse,
  ProfileProps,
} from "@/types/my";

interface formData {
  email: string;
  nickname: string;
  password: string;
}

interface loginData {
  email: string;
  password: string;
}

interface PasswordData {
  password: string;
  newPassword: string;
}

// 회원가입
export const createUser = async (formData: formData) => {
  try {
    const response = await axiosInstance.post("/users", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getLogin = async (loginData: loginData) => {
  try {
    const response = await axiosInstance.post("/auth/login", loginData);
    return response.data;
  } catch (error) {
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
    throw error;
  }
};

//내 정보 수정
export const updateUserInfo = async ({
  nickname,
  profileImageUrl,
}: {
  nickname: string;
  profileImageUrl?: string;
}): Promise<ProfileProps> => {
  try {
    const response = await axiosInstance.put("/users/me", {
      nickname,
      profileImageUrl,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 비밀번호 변경

export const updatePassword = async (PasswordData: PasswordData) => {
  try {
    const response = await axiosInstance.put("/auth/password", PasswordData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 프로필 이미지 업로드

export const createCardImage = async ({
  image,
}: ProfileImageParams): Promise<ProfileImageResponse> => {
  const formData = new FormData();
  if (!image) throw new Error("이미지가 없습니다.");
  formData.append("image", image);

  try {
    const response = await axiosInstance.post(`/users/me/image`, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 413) {
        console.error("이미지 파일이 너무 큽니다. 업로드할 수 없습니다.");
        throw new Error(
          "이미지 파일이 너무 큽니다. 최대 파일 크기를 확인해주세요."
        );
      }
      console.error("이미지를 생성하는 중 오류가 발생했습니다:", error.message);
      throw error;
    } else {
      console.error("예상치 못한 오류가 발생했습니다:", error);
      throw new Error("예상치 못한 오류가 발생했습니다.");
    }
  }
};
