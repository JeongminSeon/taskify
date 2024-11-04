import React, { useState } from "react";
import Link from "next/link";
import visibilityOff from "@/public/images/icons/icon_visibility_off.svg?url";
import visibilityOn from "@/public/images/icons/icon_visibility.svg?url";
import Input from "@/components/Auth/Input";
import { isEmailValid, isEntered, isPWValid, isSame } from "@/utils/validation";
import useInput from "@/hooks/useInput";
import Logo from "@/components/Auth/Logo";
import { createUser } from "../utils/api/authApi";
import MetaHead from "@/components/MetaHead";
import { useRouter } from "next/router";
import useErrorModal from "@/hooks/modal/useErrorModal";
import ModalAlert from "@/components/UI/modal/ModalAlert";
import useModal from "@/hooks/modal/useModal";
import { GetServerSideProps } from "next";
import { withGuest } from "@/utils/auth";

const SignUp = () => {
  const router = useRouter();

  // 비밀번호 가시성 토글 상태
  const [isShowPW, setIsShowPw] = useState<{ [key: string]: boolean }>({
    password: false,
    confirmPassword: false,
  });

  // 이용약관 동의 체크 상태
  const [checked, setChecked] = useState(false);

  // 에러 모달 관리 훅
  const { isOpen, errorMessage, handleError, handleClose } = useErrorModal();

  // 비밀번호 가시성 토글 함수
  const handleShowPW = (identifier: string) => {
    setIsShowPw((prevState) => ({
      ...prevState,
      [identifier]: !prevState[identifier],
    }));
  };

  const {
    isOpen: isModalOpen,
    openModal,
    closeModal,
    modalMessage,
  } = useModal();

  // 이메일 입력값 관리 훅
  const {
    enteredValue: emailValue,
    handleInputChange: handleEmailInputChange,
    handleBlurChange: handleEmailBlurChange,
    error: isEmailNotValid,
    reset: resetEmailInput,
  } = useInput<string>({
    defaultValue: "",
    hasError: (value) => isEmailValid(value),
  });

  // 닉네임 입력값 관리 훅
  const {
    enteredValue: nameValue,
    handleInputChange: handleNameInputChange,
    handleBlurChange: handleNameBlurChange,
    error: isNameNotValid,
    reset: resetNameInput,
  } = useInput<string>({
    defaultValue: "",
    hasError: (value) => isEntered(value),
  });

  // 비밀번호 입력 값 관리 훅
  const {
    enteredValue: passwordValue,
    handleInputChange: handlePWInputChange,
    handleBlurChange: handlePWBlurChange,
    error: isPWNotValid,
    reset: resetPasswordInput,
  } = useInput<string>({
    defaultValue: "",
    hasError: (value) => isPWValid(value),
  });

  // 비밀번호 확인 입력 값 관리 훅
  const {
    enteredValue: passwordCheckValue,
    handleInputChange: handlePWCheckInputChange,
    handleBlurChange: handlePWCheckBlurChange,
    error: isPWCheckNotValid,
    reset: resetPWCheckInput,
  } = useInput<string>({
    defaultValue: "",
    additioanlValue: passwordValue,
    hasError: (password, confirmPassword) => isSame(password, confirmPassword),
  });

  // 모든 필드가 입력되었는지 확인
  const allFieldsFilled =
    isEntered(emailValue) &&
    isEntered(nameValue) &&
    isEntered(passwordValue) &&
    isEntered(passwordCheckValue);

  // 에러가 존재 하는지 확인
  const hasErrors =
    isEmailNotValid || isNameNotValid || isPWNotValid || isPWCheckNotValid;

  // 가입 버튼 활성화 상태
  const isSubmitEnabled = allFieldsFilled && !hasErrors && checked;

  // 버튼 색상 설정
  const buttonColor = isSubmitEnabled
    ? "bg-purple100 text-white"
    : "bg-gray300";

  // 가입 버튼 비활성화 상태
  const isDisabled = !isSubmitEnabled;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      email: emailValue,
      nickname: nameValue,
      password: passwordValue,
    };
    try {
      await createUser(formData);

      // Input Reset
      resetEmailInput();
      resetNameInput();
      resetPasswordInput();
      resetPWCheckInput();

      // 회원가입 성공 시 /mydashboard로 이동
      openModal("가입이 완료되었습니다!");
    } catch (error) {
      handleError(error);
    }
  };

  // 모달 확인 버튼 클릭 시 로그인 페이지로 이동
  const handleModalConfirm = () => {
    closeModal();
    router.push("/login");
  };

  return (
    <>
      <MetaHead
        title="회원가입 📋"
        description="회원가입 후 Taskify를 이용해보세요!"
      />
      <div className="w-full h-full mx-auto md:max-w-[520px] sm:max-w-[351px] flex flex-col gap-3 justify-center items-center">
        <Logo />
        <ModalAlert
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleModalConfirm}
          text={modalMessage}
        />
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
            id="nickname"
            type="text"
            placeholder="닉네임을 입력해 주세요."
            label="닉네임"
            onChange={(event) => handleNameInputChange(event)}
            onBlur={handleNameBlurChange}
            value={nameValue}
            isPassword={false}
            error={isNameNotValid ? "닉네임을 입력해주세요." : ""}
          />
          <Input
            id="password"
            type={isShowPW.password ? "text" : "password"}
            placeholder="비밀번호를 입력해 주세요."
            label="비밀번호"
            onChange={(event) => handlePWInputChange(event)}
            onBlur={handlePWBlurChange}
            value={passwordValue}
            isPassword={true}
            error={isPWNotValid ? "8자 이상 입력해 주세요." : ""}
            Icon={isShowPW.password ? visibilityOn : visibilityOff}
            onClick={() => handleShowPW("password")}
          />
          <Input
            id="pwcheck"
            type={isShowPW.confirmPassword ? "text" : "password"}
            placeholder="비밀번호를 한번 더 입력해 주세요."
            label="비밀번호"
            onChange={(event) => handlePWCheckInputChange(event)}
            onBlur={handlePWCheckBlurChange}
            value={passwordCheckValue}
            isPassword={true}
            error={isPWCheckNotValid ? "비밀번호가 일치하지 않습니다." : ""}
            Icon={isShowPW.confirmPassword ? visibilityOn : visibilityOff}
            onClick={() => handleShowPW("confirmPassword")}
          />
          <div className="flex items-center gap-2">
            <input
              id="term"
              type="checkbox"
              className="w-5 h-5"
              checked={checked}
              onChange={() => setChecked((prev) => !prev)}
            />
            <label htmlFor="term">이용약관에 동의합니다.</label>
          </div>
          <button
            className={`${buttonColor} py-3 rounded-lg text-white text-lg mt-2`}
            type="submit"
            disabled={isDisabled}
          >
            가입하기
          </button>
        </form>
        <div>
          <p>
            이미 회원 이신가요?
            <Link
              href="/login"
              className="ml-2 text-purple100 underline underline-offset-4"
            >
              로그인하기
            </Link>
          </p>
        </div>
        {isOpen && (
          <ModalAlert
            isOpen={isOpen}
            onClose={handleClose}
            text={errorMessage}
          />
        )}
      </div>
    </>
  );
};

// 게스트 사용자만 접근 가능한 페이지로 설정
export const getServerSideProps: GetServerSideProps = async (context) => {
  return withGuest(context);
};

export default SignUp;
