import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logoImage from "@/public/images/logos/logo-main.svg?url";
import visibilityOff from "@/public/images/icons/icon_visibility_off.svg?url";
import visibilityOn from "@/public/images/icons/icon_visibility.svg?url";

const Login = () => {
  const [isShowPW, setIsShwoPW] = useState(false);

  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    identifier: string
  ) => {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: event.target.value,
    }));
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  };

  const handleBlurChange = (identifier: string) => {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: true,
    }));
  };

  const handleShowPW = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsShwoPW((prev) => !prev);
  };

  const isEmailNotValid =
    didEdit.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredValues.email);

  const isPWNotValid =
    didEdit.password && !(enteredValues.password.length >= 8);

  const emailFail = isEmailNotValid ? "border-red100 border-1" : "";
  const pwFail = isPWNotValid ? "border-red100 border-1" : "";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("제출");

    setEnteredValues({
      email: "",
      password: "",
    });

    setDidEdit({
      email: false,
      password: false,
    });
  };

  return (
    <div className='w-full h-full mx-auto md:max-w-[520px] sm:max-w-[351px] flex flex-col gap-3 justify-center items-center'>
      <div className='flex flex-col items-center gap-1'>
        <Image src={logoImage} width={200} height={280} alt='logo_main' />
        <p className='text-xl'>오늘도 만나서 반가워요!</p>
      </div>
      <form className='flex flex-col w-full gap-3' onSubmit={handleSubmit}>
        <label htmlFor='email'>이메일</label>
        <input
          className={`w-full border px-4 py-3 border-gray400 rounded-lg focus:outline-none focus:ring-0 focus:border-purple100 ${emailFail}`}
          id='email'
          type='email'
          placeholder='이메일을 입력해 주세요.'
          onChange={(event) => handleInputChange(event, "email")}
          onBlur={() => handleBlurChange("email")}
          value={enteredValues.email}
        />
        {isEmailNotValid && (
          <div className='text-sm text-red100'>
            이메일 형식으로 작성해 주세요.
          </div>
        )}
        <label htmlFor='password'>비밀번호</label>
        <div className='flex items-center relative'>
          <input
            className={`w-full border px-4 py-3 border-gray400 rounded-lg focus:outline-none focus:ring-0 focus:border-purple100 ${pwFail}`}
            id='password'
            type={isShowPW ? "text" : "password"}
            placeholder='비밀번호를 입력해주세요'
            onChange={(event) => handleInputChange(event, "password")}
            onBlur={() => handleBlurChange("password")}
            value={enteredValues.password}
          />
          <button
            className='absolute right-3 cursor-pointer '
            onClick={handleShowPW}
          >
            <Image
              src={isShowPW ? visibilityOn : visibilityOff}
              alt='visiblity_off'
            />
          </button>
        </div>
        {isPWNotValid && (
          <div className='text-sm text-red100'>8자 이상 입력해 주세요.</div>
        )}
        <button
          className='bg-gray300 py-3 rounded-lg text-white text-lg mt-2'
          type='submit'
        >
          로그인
        </button>
      </form>
      <div>
        <p>
          회원이 아니신가요?
          <Link
            href='/signup'
            className='ml-2 text-purple100 underline underline-offset-4'
          >
            회원가입하기
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
