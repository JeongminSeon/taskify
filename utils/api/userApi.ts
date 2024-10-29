import { UserResponse } from "@/types/users";
import axiosInstance from "./axiosInstanceApi";

export const getUser = async (): Promise<UserResponse> => {
  try {
    const response = await axiosInstance.get("/users/me");
    return response.data;
  } catch (error) {
    console.error("유저 조회 중 오류가 발생했습니다:", error);
    throw error;
  }
};
