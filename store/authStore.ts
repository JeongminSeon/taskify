import { create } from "zustand";
import { parseCookie } from "@/utils/api/cookie";
import { getUserInfo } from "@/utils/api/authApi";

// 사용자 정보 구조를 정의
interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

// 인증 상태를 관리하는 상태와 함수를 정의
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  login: (user: User) => void;
  logout: () => void;
}

// useAuthStore라는 zustand 스토어를 생성하여 상태를 관리할 수 있게 합니다
// create 함수를 통해 초기 상태와 메서드를 설정합니다
export const useAuthStore = create<AuthState>((set) => ({
  //  스토어의 초기 상태를 정의
  isAuthenticated: false, //사용자가 인증되었는지를 나타내는 boolean 값
  user: null, // 현재 로그인한 사용자에 대한 정보를 담고 있는 객체

  // 초기 상태일 때 저장된 유저 정보 가져오기
  initialize: () => {
    const cookieToken = parseCookie()["access-token"];
    console.log(cookieToken);
    if (cookieToken) {
      // 인증 상태를 true로 설정
      console.log(cookieToken);
      set({ isAuthenticated: true });
      // 사용자 정보를 가져오는 API 호출
      getUserInfo()
        .then((user) => {
          set({ user }); // 사용자 정보 상태 업데이트
          console.log("업데이트된 상태:", useAuthStore.getState());
        })
        .catch((error) => {
          console.error("사용자 정보를 가져오지 못했습니다:", error);
        });
    }
  },

  // setUser : 사용자 정보와 인증 상태를 업데이트합니다
  setUser: (user: User) => {
    console.log("setUser 호출됨:", user);
    set({ user, isAuthenticated: true });
    console.log("Store 상태 업데이트됨:", useAuthStore.getState());
  },
  // login : 사용자가 로그인에 성공했을 때 호출하여 인증 상태를 true로 설정하고 사용자 정보를 저장합니다
  login: (user: User) => {
    console.log("login 호출됨:", user);
    set({ user, isAuthenticated: true });
    console.log("Store 상태 업데이트됨:", useAuthStore.getState());
  },
  // 로그아웃 시 호출하여 사용자 정보와 인증 상태를 초기화합니다.
  logout: () => {
    console.log("logout 호출됨");
    set({ user: null, isAuthenticated: false });
    console.log("Store 상태 업데이트됨:", useAuthStore.getState());
  },
}));
