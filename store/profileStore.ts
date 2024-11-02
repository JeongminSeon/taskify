import { create } from "zustand";
import {
  createCardImage,
  getUserInfo,
  updateUserInfo,
} from "@/utils/api/authApi";

interface ProfileState {
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  setProfile: (data: Partial<ProfileState>) => void;
  loadProfile: () => Promise<void>;
  updateProfile: (nickname: string, image?: File) => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set) => ({
  email: "",
  nickname: "",
  profileImageUrl: null,

  // 상태 업데이트
  setProfile: (data) => set((state) => ({ ...state, ...data })),

  // 프로필 정보 불러오기
  loadProfile: async () => {
    try {
      const res = await getUserInfo();
      set({
        email: res.email,
        nickname: res.nickname,
        profileImageUrl: res.profileImageUrl,
      });
    } catch (error) {
      console.error("프로필 정보를 불러오는 중 오류 발생했습니다.", error);
    }
  },

  // 닉네임 및 프로필 이미지 업데이트
  updateProfile: async (nickname, image) => {
    try {
      let profileImageUrl: string | null = null; // 초기값을 null로 설정
      if (image) {
        const response = await createCardImage({ image });
        profileImageUrl = response.profileImageUrl; // 이미지를 업로드한 경우 URL 설정
      }

      // 사용자 정보 업데이트
      await updateUserInfo({
        nickname,
        profileImageUrl: profileImageUrl ?? undefined, // 이미지 URL이 없으면 undefined로 설정
      });

      // 상태 업데이트
      set((state) => ({
        nickname,
        profileImageUrl: profileImageUrl ?? state.profileImageUrl, // 기존 URL을 유지
      }));
    } catch (error) {
      console.error("프로필 업데이트 중 오류 발생했습니다.", error);
    }
  },
}));
