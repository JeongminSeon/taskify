import Image from "next/image";
import InputField from "./InputField";
import MyButton from "./MyButton";
import { useEffect, useState } from "react";
import useModal from "@/hooks/modal/useModal";
import ModalAlert from "../UI/modal/ModalAlert";
import {
  createCardImage,
  getUserInfo,
  UpdateUserInfo,
} from "@/utils/api/authApi";
import { ProfileProps } from "@/types/my";

const MyProfile: React.FC = () => {
  // profile 상태는 사용자 이메일, 닉네임, 프로필 이미지를 관리
  const [profile, setProfile] = useState<ProfileProps>({
    email: "",
    nickname: "",
    profileImageUrl: null,
  });

  // 모달 상태 관리
  const { isOpen, openModal, closeModal } = useModal();

  // 파일 선택 시 이미지 업로드 함수
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return; // 파일이 없는 경우 함수 종료

    try {
      // API를 호출해 서버에 이미지 업로드
      const response = await createCardImage({ image: file });
      if (response?.profileImageUrl) {
        // 프로필 상태 업데이트
        setProfile((prevData) => ({
          ...prevData,
          profileImageUrl: response.profileImageUrl,
        }));
      }
      console.log("이미지 생성 성공:", response);
    } catch (error) {
      console.error("이미지 생성 실패:", error);
    }
  };

  // 저장 버튼 클릭 시 닉네임 및 프로필 이미지 업데이트
  const handleSave = async () => {
    const { nickname, profileImageUrl } = profile;

    try {
      // API를 호출해 사용자 정보를 업데이트
      await UpdateUserInfo({
        nickname,
        profileImageUrl: profileImageUrl ?? undefined,
      });
      openModal();
    } catch (error) {
      console.error("유저 정보를 업데이트하는 중 오류가 발생했습니다:", error);
    }
  };

  // 초기 프로필 정보 불러오기 함수
  const getMe = async () => {
    try {
      // API를 호출해 사용자 프로필 정보를 가져옴
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

  // 컴포넌트가 마운트될 때 초기 프로필 정보를 불러옴
  useEffect(() => {
    getMe();
  }, []);

  return (
    <div className="lg:w-[672px] md:w-[548px] sm:w-[284px] md:p-6 sm:p-4 md:mb-6 sm:mb-4 rounded-2xl bg-white100">
      <h2 className="md:text-[24px] sm:text-[18px] md:mb-6 sm:mb-10 font-bold">
        프로필
      </h2>

      <div className="flex md:gap-[42px] sm:gap-10 md:flex-row sm:flex-col">
        {/* 프로필 이미지 영역 */}
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

          {/* 이미지 파일 업로드 입력 */}
          <input
            type="file"
            id="inputFile"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* 이메일 및 닉네임 수정 영역 */}
        <div className="md:w-[400px] sm:w-[252px]">
          <div className="flex flex-col gap-4">
            {/* 이메일 입력 필드 (읽기 전용) */}
            <InputField
              label="이메일"
              name="email"
              type="email"
              value={profile.email}
              readOnly
            />

            {/* 닉네임 입력 필드 */}
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

          {/* 저장 버튼 */}
          <MyButton onClick={handleSave}>저장</MyButton>
        </div>
      </div>

      {/* 변경 완료 모달 */}
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
