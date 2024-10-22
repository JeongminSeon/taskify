import React, { useState } from "react";
import { useRouter } from "next/router";
import axiosInstance from "@/pages/api/axiosInstance";
import { setCookie } from "nookies";
import {setCooie}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/9-1/auth/login", {
        email,
        password,
      });
      console.log("로그인 응답:", response.data);

      const { accessToken } = response.data;
      localStorage.setItem("token", accessToken);
      console.log("로그인 성공, 토큰 저장됨:", accessToken);
      setCookie(null, "token", accessToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      router.push("/dashboards");
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='이메일'
        required
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='비밀번호'
        required
      />
      <button type='submit'>로그인</button>
    </form>
  );
};

export default LoginPage;
