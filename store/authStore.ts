import { create } from "zustand";
import { getUserInfo, getLogin } from "@/utils/api/authApi";
import { setAccessToken } from "@/utils/api/cookie";
interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  login: (loginData: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
    useAuthStore.getState();
  },
  // ... existing code ...

  login: async (loginData: { email: string; password: string }) => {
    try {
      const response = await getLogin(loginData);
      const { user, accessToken } = response;
      setAccessToken(accessToken); // cookie 설정 추가
      set({ user, isAuthenticated: true });
    } catch (error) {
      console.error("로그인 실패:", error);
      set({ user: null, isAuthenticated: false });
      throw error; // 에러를 상위로 전파하여 컴포넌트에서 처리할 수 있도록 함
    }
  },

  // ... existing code ...
  logout: () => {
    set({ user: null, isAuthenticated: false });
    // store 상태 업데이트
    useAuthStore.getState();
  },
  checkAuth: async () => {
    try {
      const user = await getUserInfo();
      set({ user, isAuthenticated: true });
      // 인증상태 확인
      useAuthStore.getState();
    } catch (error) {
      set({ user: null, isAuthenticated: false });
      console.error("인증 실패:", error);
    }
  },
}));
