import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logoImage from "@/public/images/logos/logo-main.svg?url";
import visibilityOff from "@/public/images/icons/icon_visibility_off.svg?url";
import visibilityOn from "@/public/images/icons/icon_visibility.svg?url";
import Input from "@/components/Auth/Input";
import { isEmailValid, isEntered, isPWValid } from "@/utils/validation";
import useInput from "@/hooks/useInput";
import { Axios, AxiosError } from "axios";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/authStore";
import { getLogin } from "@/utils/api/authApi";
import { setAccessToken } from "@/utils/api/cookie";
import MetaHead from "@/components/MetaHead";
import ModalAlert from "@/components/UI/modal/ModalAlert";
import useModal from "@/hooks/modal/useModal";
import Portal from "@/components/UI/modal/ModalPotal";

const Login = () => {
  const router = useRouter();
  const [isShowPW, setIsShowPw] = useState(false);
  const login = useAuthStore((state) => state.login);
  const {
    isOpen: isModalOpen,
    openModal,
    closeModal,
    modalMessage,
  } = useModal(); // useModal 훅 사용

  const {
    enteredValue: emailValue,
    handleInputChange: handleEmailInputChange,
    handleBlurChange: handleEmailBlurChange,
    error: isEmailNotValid,
    // reset: resetEmailInput,
  } = useInput<string>({
    defaultValue: "",
    hasError: (value) => isEmailValid(value),
  });

  const {
    enteredValue: passwordValue,
    handleInputChange: handlePWInputChange,
    handleBlurChange: handlePWBlurChange,
    error: isPWNotValid,
    // reset: resetPasswordInput,
  } = useInput<string>({
    defaultValue: "",
    hasError: (value) => isPWValid(value),
  });

  const handleShowPW = () => {
    setIsShowPw((prev) => !prev);
  };

  const allFieldsFilled = isEntered(emailValue) && isEntered(passwordValue);

  const hasErrors = isEmailNotValid || isPWNotValid;

  const isSubmitEnabled = allFieldsFilled && !hasErrors;

  const buttonColor = isSubmitEnabled ? "bg-purple100" : "bg-gray300";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      email: emailValue,
      password: passwordValue,
    };

    try {
      const response = await getLogin(formData);
      const { user, accessToken } = response;
      setAccessToken(accessToken);
      login(user); // 추가: 로그인 성공 시 useAuthStore의 login 함수 호출
      router.push("/mydashboard");
      return;
    } catch (error) {
      console.log("isAxiosError ?  : ", error instanceof AxiosError);
      if (error instanceof AxiosError) {
        const status = error.status;
        const message = error.message;

        if (status === 400 || status === 404) {
          openModal(message);
        } else {
          openModal("예기치 못한 에러가 발생했습니다.");
        }
      }
    }
  };
  console.log("isModalOpen : ", isModalOpen);
  return (
    <>
      <MetaHead
        title="로그인🎯"
        description="로그인 후 Taskify를 이용해보세요!"
      />
      <div className="w-full h-full mx-auto md:max-w-[520px] sm:max-w-[351px] flex flex-col gap-3 justify-center items-center">
        <div className="flex flex-col items-center gap-1">
          <Image src={logoImage} width={200} height={280} alt="logo_main" />
          <p className="text-xl">오늘도 만나서 반가워요!</p>
        </div>
        <Portal>
          <ModalAlert
            isOpen={isModalOpen}
            onClose={closeModal}
            text={modalMessage}
          />
        </Portal>
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
    </>
  );
};

export default Login;
