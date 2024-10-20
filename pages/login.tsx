import Image from "next/image";
import logoImage from "@/public/images/logos/logo-main.svg?url";

const Login = () => {
  return (
    <div>
      <Image src={logoImage} width={500} height={500} alt='logo_main' />
    </div>
  );
};

export default Login;
