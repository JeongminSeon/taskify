import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logoImage from "@/public/images/logos/logo-main.svg?url";
import visibilityOff from "@/public/images/icons/icon_visibility_off.svg?url";
import visibilityOn from "@/public/images/icons/icon_visibility.svg?url";
import Input from "@/components/Input";
import { isEmailValid, isPWValid } from "@/utils/validation";
import useInput from "@/hooks/useInput";

const Login = () => {
  const [isShowPW, setIsShwoPW] = useState(false);

  const {
    enteredValue: emailValue,
    setEnteredValue: setEmailEnteredValue,
    handleInputChange: handleEmailInputChange,
    handleBlurChange: handleEmailBlurChange,
    setDidEdit: setEmailDidEdit,
    error: isEmailNotValid,
  } = useInput<string>({
    defaultValue: "",
    hasError: (value) => isEmailValid(value),
  });

  const {
    enteredValue: passwordValue,
    setEnteredValue: setPWEnteredValue,
    handleInputChange: handlePWInputChange,
    handleBlurChange: handlePWBlurChange,
    setDidEdit: setPWDidEdit,
    error: isPWNotValid,
  } = useInput<string>({
    defaultValue: "",
    hasError: (value) => isPWValid(value),
  });

  const handleShowPW = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsShwoPW((prev) => !prev);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("제출");

    setEmailEnteredValue("");
    setPWEnteredValue("");
    setEmailDidEdit(false);
    setPWDidEdit(false);
  };

  return (
    <div className="w-full h-full mx-auto md:max-w-[520px] sm:max-w-[351px] flex flex-col gap-3 justify-center items-center">
      <div className="flex flex-col items-center gap-1">
        <Image src={logoImage} width={200} height={280} alt="logo_main" />
        <p className="text-xl">오늘도 만나서 반가워요!</p>
      </div>
      <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit}>
        <Input
          id="email"
          type="email"
          placeholder="이메일을 입력해 주세요."
          label="이메일"
          onChange={(event) => handleEmailInputChange(event)}
          onBlur={handleEmailBlurChange}
          value={emailValue}
          isPassword={false}
          error={isEmailNotValid ? "이메일 형식으로 작성해 주세요." : ""}
        />
        <Input
          id="password"
          type={isShowPW ? "text" : "password"}
          placeholder="비밀번호를 입력해 주세요."
          label="비밀번호"
          onChange={(event) => handlePWInputChange(event)}
          onBlur={handlePWBlurChange}
          value={passwordValue}
          isPassword={true}
          error={isPWNotValid ? "8자 이상 입력해 주세요." : ""}
          Icon={isShowPW ? visibilityOn : visibilityOff}
          onClick={handleShowPW}
        />
        <button
          className="bg-gray300 py-3 rounded-lg text-white text-lg mt-2"
          type="submit"
        >
          로그인
        </button>
      </form>
      <div>
        <p>
          회원이 아니신가요?
          <Link
            href="/signup"
            className="ml-2 text-purple100 underline underline-offset-4"
          >
            회원가입하기
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
