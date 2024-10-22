import React, { useState } from "react";
import Link from "next/link";
import visibilityOff from "@/public/images/icons/icon_visibility_off.svg?url";
import visibilityOn from "@/public/images/icons/icon_visibility.svg?url";
import Input from "@/components/Auth/Input";
import { isEmailValid, isEntered, isPWValid, isSame } from "@/utils/validation";
import useInput from "@/hooks/useInput";
import Logo from "@/components/Auth/Logo";

const SignUp = () => {
  const [isShowPW, setIsShwoPW] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleShowPW = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsShwoPW((prev) => !prev);
  };

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
    enteredValue: nameValue,
    setEnteredValue: setNameEnteredValue,
    handleInputChange: handleNameInputChange,
    handleBlurChange: handleNameBlurChange,
    setDidEdit: setNameDidEdit,
    error: isNameNotValid,
  } = useInput<string>({
    defaultValue: "",
    hasError: (value) => isEntered(value),
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

  const {
    enteredValue: passwordCheckValue,
    setEnteredValue: setPWCheckEnteredValue,
    handleInputChange: handlePWCheckInputChange,
    handleBlurChange: handlePWCheckBlurChange,
    setDidEdit: setPWCheckDidEdit,
    error: isPWCheckNotValid,
  } = useInput<string>({
    defaultValue: "",
    additioanlValue: passwordValue,
    hasError: (password, confirmPassword) => isSame(password, confirmPassword),
  });

  const isFilled =
    isEntered(emailValue) &&
    isEntered(nameValue) &&
    isEntered(passwordValue) &&
    isEntered(passwordCheckValue);
  const isError =
    isEmailNotValid || isNameNotValid || isPWNotValid || isPWCheckNotValid;
  const isChecked =
    isFilled && !isError && checked ? "bg-purple100" : "bg-gray300";

  console.log(isError);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("제출");

    // value reset
    setEmailEnteredValue("");
    setNameEnteredValue("");
    setPWEnteredValue("");
    setPWCheckEnteredValue("");

    // didEdit reset
    setEmailDidEdit(false);
    setNameDidEdit(false);
    setPWDidEdit(false);
    setPWCheckDidEdit(false);
  };

  return (
    <div className='w-full h-full mx-auto md:max-w-[520px] sm:max-w-[351px] flex flex-col gap-3 justify-center items-center'>
      <Logo />
      <form className='flex flex-col w-full gap-3' onSubmit={handleSubmit}>
        <Input
          id='email'
          type='email'
          placeholder='이메일을 입력해 주세요.'
          label='이메일'
          onChange={(event) => handleEmailInputChange(event)}
          onBlur={handleEmailBlurChange}
          value={emailValue}
          isPassword={false}
          error={isEmailNotValid ? "이메일 형식으로 작성해 주세요." : ""}
        />
        <Input
          id='nickname'
          type='text'
          placeholder='닉네임을 입력해 주세요.'
          label='닉네임'
          onChange={(event) => handleNameInputChange(event)}
          onBlur={handleNameBlurChange}
          value={nameValue}
          isPassword={false}
          error={isNameNotValid ? "닉네임을 입력해주세요." : ""}
        />
        <Input
          id='password'
          type={isShowPW ? "text" : "password"}
          placeholder='비밀번호를 입력해 주세요.'
          label='비밀번호'
          onChange={(event) => handlePWInputChange(event)}
          onBlur={handlePWBlurChange}
          value={passwordValue}
          isPassword={true}
          error={isPWNotValid ? "8자 이상 입력해 주세요." : ""}
          Icon={isShowPW ? visibilityOn : visibilityOff}
          onClick={handleShowPW}
        />
        <Input
          id='pwcheck'
          type={isShowPW ? "text" : "password"}
          placeholder='비밀번호를 한번 더 입력해 주세요.'
          label='비밀번호'
          onChange={(event) => handlePWCheckInputChange(event)}
          onBlur={handlePWCheckBlurChange}
          value={passwordCheckValue}
          isPassword={true}
          error={isPWCheckNotValid ? "비밀번호가 일치하지 않습니다." : ""}
          Icon={isShowPW ? visibilityOn : visibilityOff}
          onClick={handleShowPW}
        />
        <div className='flex items-center gap-2'>
          <input
            id='term'
            type='checkbox'
            className='w-5 h-5'
            checked={checked}
            onChange={() => setChecked((prev) => !prev)}
          />
          <label htmlFor='term'>이용약관에 동의합니다.</label>
        </div>
        <button
          className={`${isChecked} py-3 rounded-lg text-white text-lg mt-2`}
          type='submit'
        >
          가입하기
        </button>
      </form>
      <div>
        <p>
          이미 회원 이신가요?
          <Link
            href='/login'
            className='ml-2 text-purple100 underline underline-offset-4'
          >
            로그인하기
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
