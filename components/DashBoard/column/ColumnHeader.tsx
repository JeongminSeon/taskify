import Image from "next/image";
import { useState } from "react";
const ColumnHeader = ({ title }: { title: string }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleSettingClick = () => {};
  return (
    <h2 className="flex items-center gap-2 text-black100 font-bold">
      <span className="block w-2 h-2 rounded-full bg-purple100"></span>
      <p className="flex-1">{title}</p>
      <button type="button" onClick={handleSettingClick}>
        <Image
          src="/images/icons/icon_settings.svg"
          width={22}
          height={22}
          alt="설정"
        />
      </button>
    </h2>
  );
};

export default ColumnHeader;
