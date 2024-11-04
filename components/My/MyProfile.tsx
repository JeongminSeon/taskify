import { useEffect, useState } from "react";
import { useProfileStore } from "@/store/profileStore";
import Image from "next/image";
import InputField from "./InputField";
import MyButton from "./MyButton";
import useModal from "@/hooks/modal/useModal";
import ModalAlert from "../UI/modal/ModalAlert";

interface MyProfileProps {
  profileData: {
    email: string;
    nickname: string;
    profileImageUrl: string | null;
  } | null;
}

const MyProfile: React.FC<MyProfileProps> = ({ profileData }) => {
  const [newNickname, setNewNickname] = useState<string>(
    profileData?.nickname || ""
  ); // 초기값 설정
  const [newProfileImage, setNewProfileImage] = useState<File | undefined>(
    undefined
  );
  const [imagePreview, setImagePreview] = useState<string | null>(
    profileData?.profileImageUrl || null
  ); // 초기값 설정
  const { isOpen, openModal, closeModal } = useModal(); // 모달 상태 관리
  const { updateProfile } = useProfileStore(); // 프로필 업데이트 함수

  // 프로필 데이터가 변경될 경우 상태 업데이트
  useEffect(() => {
    if (profileData) {
      setNewNickname(profileData.nickname); // 닉네임 업데이트
      setImagePreview(profileData.profileImageUrl); // 이미지 프리뷰 업데이트
    }
  }, [profileData]);

  // 파일 선택 시 이미지 업로드 처리
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewProfileImage(file); // 새로운 프로필 이미지 상태 설정

      const reader = new FileReader(); // 파일 리더 생성
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // 파일이 로드되면 프리뷰 업데이트
      };
      reader.readAsDataURL(file); // 파일을 Data URL로 변환
    }
  };

  // 저장 버튼 클릭 시 프로필 업데이트 (API 호출 필요)
  const handleSave = async () => {
    await updateProfile(newNickname, newProfileImage); // 프로필 업데이트 함수 호출
    openModal();
  };

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
              src={imagePreview || "/images/icons/profile_add_box.svg"}
              alt="프로필 이미지"
              width="182"
              height="182"
            />
            <p className="text-gray200 text-center md:text-[18px] md:mt-6 sm:text-[10px] sm:mt-2">
              이미지를 클릭하여 <br />
              프로필을 변경하세요😎
            </p>
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
              value={profileData?.email || ""}
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
