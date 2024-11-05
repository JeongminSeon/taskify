import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logoImage from "@/public/images/logos/logo-main.svg?url";
import visibilityOff from "@/public/images/icons/icon_visibility_off.svg?url";
import visibilityOn from "@/public/images/icons/icon_visibility.svg?url";
import Input from "@/components/Auth/Input";
import { isEmailValid, isEntered, isPWValid } from "@/utils/validation";
import useInput from "@/hooks/useInput";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/authStore";
import MetaHead from "@/components/MetaHead";
import useErrorModal from "@/hooks/modal/useErrorModal";
import ModalAlert from "@/components/UI/modal/ModalAlert";
import { GetServerSideProps } from "next";
import { withGuest } from "@/utils/auth";

const Login = () => {
  const router = useRouter();

  // 비밀번호 가시성 토글 상태
  const [isShowPW, setIsShowPw] = useState(false);

  // 로그인 상태를 관리하는 함수 (전역 상태에서 가져옴)
  const login = useAuthStore((state) => state.login);

  // 에러모달 관리 훅
  const { isOpen, errorMessage, handleError, handleClose } = useErrorModal();

  // 이메일 입력 관리 훅
  const {
    enteredValue: emailValue,
    handleInputChange: handleEmailInputChange,
    handleBlurChange: handleEmailBlurChange,
    error: isEmailNotValid,
  } = useInput<string>({
    defaultValue: "",
    hasError: (value) => isEmailValid(value),
  });

  // 비밀번호 입력 관리 훅
  const {
    enteredValue: passwordValue,
    handleInputChange: handlePWInputChange,
    handleBlurChange: handlePWBlurChange,
    error: isPWNotValid,
  } = useInput<string>({
    defaultValue: "",
    hasError: (value) => isPWValid(value),
  });

  // 비밀번호 가시성 토글 함수
  const handleShowPW = () => {
    setIsShowPw((prev) => !prev);
  };

  // 모든 필드가 입력되었는지 확인
  const allFieldsFilled = isEntered(emailValue) && isEntered(passwordValue);

  // 에러가 존재하는지 확인
  const hasErrors = isEmailNotValid || isPWNotValid;

  // 로그인 버튼 활성화 상태
  const isSubmitEnabled = allFieldsFilled && !hasErrors;

  // 로그인 버특 색상
  const buttonColor = isSubmitEnabled ? "bg-purple100" : "bg-gray300";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      email: emailValue,
      password: passwordValue,
    };

    try {
      await login(formData);
      router.push("/mydashboard"); // 로그인 성공 시 대시보드로 이동
    } catch (error) {
      handleError(error); // 에러 발생 시 모달 표시
    }
  };
  return (
    <>
      <MetaHead
        title="로그인 💟"
        description="로그인 후 Taskify를 이용해보세요!"
      />
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
            className={`${buttonColor} py-3 rounded-lg text-white text-lg mt-2`}
            disabled={!isSubmitEnabled}
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
      {isOpen && (
        <ModalAlert isOpen={isOpen} onClose={handleClose} text={errorMessage} />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return withGuest(context);
};

export default Login;
