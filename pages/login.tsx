import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logoImage from "@/public/images/logos/logo-main.svg?url";
import visibilityOff from "@/public/images/icons/icon_visibility_off.svg?url";
import visibilityOn from "@/public/images/icons/icon_visibility.svg?url";

const Login = () => {
  const [isShowPW, setIsShwoPW] = useState(false);

  const handleShowPW = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsShwoPW((prev) => !prev);
  };

  return (
    <div className='w-full h-full mx-auto md:max-w-[520px] sm:max-w-[351px] flex flex-col gap-3 justify-center items-center'>
      <div className='flex flex-col items-center gap-1'>
        <Image src={logoImage} width={200} height={280} alt='logo_main' />
        <p className='text-xl'>오늘도 만나서 반가워요!</p>
      </div>
      <form className='flex flex-col w-full gap-3'>
        <label htmlFor='email'>이메일</label>
        <input
          className='w-full border px-4 py-3 border-gray400 rounded-lg focus:outline-none focus : ring-0 focus:border-purple100'
          id='email'
          type='email'
          placeholder='이메일을 입력해 주세요.'
        />
        <label htmlFor='password'>비밀번호</label>
        <div className='flex items-center relative'>
          <input
            className='w-full border px-4 py-3 border-gray400 rounded-lg focus:outline-none focus : ring-0 focus:border-purple100'
            id='password'
            type={isShowPW ? "text" : "password"}
            placeholder='비밀번호를 입력해주세요'
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
        <button className='bg-gray300 py-3 rounded-lg text-white text-lg mt-2'>
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
