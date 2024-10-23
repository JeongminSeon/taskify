import logoImage from "@/public/images/logos/logo-main.svg?url";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <div className='flex flex-col items-center gap-1'>
      <Link href='/'>
        <Image src={logoImage} width={200} height={280} alt='logo_main' />
      </Link>
      <p className='text-xl'>오늘도 만나서 반가워요!</p>
    </div>
  );
}
