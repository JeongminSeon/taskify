import Image from "next/image";
import logoImage from "@/public/images/logos/logo-main.svg?url";

const Login = () => {
  return (
    <div className='w-full h-full mx-auto md:max-w-[744px] sm:max-w-[375px] flex justify-center items-center'>
      <Image src={logoImage} width={100} height={100} alt='logo_main' />
    </div>
  );
};

export default Login;
