import Image from "next/image";
import InputField from "./InputField";
import MyButton from "./MyButton";
import { useEffect, useState } from "react";
import useModal from "@/hooks/modal/useModal";
import ModalAlert from "../UI/modal/ModalAlert";
import { getUserInfo } from "@/utils/api/authApi";
import { createCardImage } from "@/utils/api/columnsApi";

interface Profile {
  email: string;
  nickname: string;
  profileImageUrl: string | null;
}

const MyProfile: React.FC = () => {
  const [profile, setProfile] = useState<Profile>({
    email: "",
    nickname: "",
    profileImageUrl: null,
  });
  const { isOpen, openModal, closeModal } = useModal();

  // const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     try {
  //       const response = await createCardImage({ columnId, image: file });
  //       if (response?.imageUrl) {
  //         setProfile((prevData) => ({
  //           ...prevData,
  //           profileImageUrl: response.imageUrl,
  //         }));
  //       }
  //       console.log("이미지 생성 성공:", response);
  //     } catch (error) {
  //       console.error("이미지 생성 실패:", error);
  //     }
  //   }
  // };

  const handleSave = () => {
    openModal();
  };

  const getMe = async () => {
    try {
      const res = await getUserInfo();
      setProfile({
        email: res.email,
        nickname: res.nickname,
        profileImageUrl: res.profileImageUrl,
      });
    } catch (error) {
      console.error("프로필 정보를 불러오는 중 오류가 발생했습니다:", error);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <div className="lg:w-[672px] md:w-[548px] sm:w-[284px] md:p-6 sm:p-4 md:mb-6 sm:mb-4 rounded-2xl bg-white100">
      <h2 className="md:text-[24px] sm:text-[18px] md:mb-6 sm:mb-10 font-bold">
        프로필
      </h2>
      <div className="flex md:gap-[42px] sm:gap-10 md:flex-row sm:flex-col">
        <div className="md:w-[182px] sm:w-[100px]">
          <label htmlFor="inputFile">
            <Image
              className="cursor-pointer"
              src={
                profile.profileImageUrl || "/images/icons/profile_add_box.svg"
              }
              alt="프로필 이미지"
              width="182"
              height="182"
            />
          </label>
          <input
            className="hidden"
            type="file"
            id="inputFile"
            onChange={handleFileChange}
          />
        </div>
        <div className="md:w-[400px] sm:w-[252px]">
          <div className="flex flex-col gap-4">
            <InputField
              label="이메일"
              name="email"
              type="email"
              value={profile.email}
              readOnly
            />
            <InputField
              label="닉네임"
              name="nickname"
              type="text"
              value={profile.nickname}
              onChange={(e) =>
                setProfile({ ...profile, nickname: e.target.value })
              }
            />
          </div>
          <MyButton onClick={handleSave}>저장</MyButton>
        </div>
      </div>
      {isOpen && (
        <ModalAlert
          isOpen={isOpen}
          onClose={closeModal}
          text="변경 완료되었습니다."
        />
      )}
    </div>
  );
};

export default MyProfile;
