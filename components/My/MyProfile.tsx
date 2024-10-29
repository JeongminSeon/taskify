import Image from "next/image";
import InputField from "./InputField";
import MyButton from "./MyButton";
import { useEffect, useState } from "react";
import useModal from "@/hooks/modal/useModal";
import ModalAlert from "../UI/modal/ModalAlert";
import { useProfileStore } from "@/store/profileStore";

const MyProfile: React.FC = () => {
  const { email, nickname, profileImageUrl, loadProfile, updateProfile } =
    useProfileStore();

  const [newNickname, setNewNickname] = useState(nickname);
  const [newProfileImage, setNewProfileImage] = useState<File | undefined>(
    undefined
  );
  const { isOpen, openModal, closeModal } = useModal();

  // 파일 선택 시 이미지 업로드 처리
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewProfileImage(file);
    }
  };

  // 저장 버튼 클릭 시 프로필 업데이트
  const handleSave = async () => {
    await updateProfile(newNickname, newProfileImage);
    openModal();
  };

  // 컴포넌트 마운트 시 프로필 정보 로드
  useEffect(() => {
    loadProfile();
    setNewNickname(nickname);
  }, [nickname, loadProfile]);

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
              src={profileImageUrl || "/images/icons/profile_add_box.svg"}
              alt="프로필 이미지"
              width="182"
              height="182"
            />
          </label>
          <input
            type="file"
            id="inputFile"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <div className="md:w-[400px] sm:w-[252px]">
          <div className="flex flex-col gap-4">
            <InputField
              label="이메일"
              name="email"
              type="email"
              value={email}
              readOnly
            />
            <InputField
              label="닉네임"
              name="nickname"
              type="text"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
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
