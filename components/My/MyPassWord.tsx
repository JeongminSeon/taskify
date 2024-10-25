import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import MyButton from "./MyButton";
import ModalAlert from "../UI/modal/ModalAlert";
import useModal from "@/hooks/useModal";
import { isPWValid, isSame, isEntered } from "@/utils/validation";

const MyPassWord: React.FC = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("");
  const [passwordLenError, setPasswordLenError] = useState<boolean>(false);
  const [passwordMatchError, setPasswordMatchError] = useState<boolean>(false);

  const handlePasswordChange = () => {
    if (password !== "currentPassword") {
      // 실제로는 서버에서 비밀번호 확인
      openModal(); // 모달 열기
    } else {
      console.log("비밀번호 변경 완료");
    }
  };

  const handleBlur = () => {
    setPasswordLenError(!isPWValid(newPassword));
  };

  // 디바운스 설정을 위한 변수
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isEntered(newPasswordConfirm)) {
        setPasswordMatchError(!isSame(newPassword, newPasswordConfirm));
      } else {
        setPasswordMatchError(false); // 길이가 0일 때는 에러를 제거
      }
    }, 300); // 300ms 후에 비교

    // 컴포넌트 언마운트 시 타이머 클리어
    return () => clearTimeout(timer);
  }, [newPassword, newPasswordConfirm]);

  const isButtonDisabled =
    !isEntered(password) ||
    !isEntered(newPassword) ||
    !isEntered(newPasswordConfirm) ||
    passwordMatchError ||
    passwordLenError;

  return (
    <div className="lg:w-[672px] md:w-[548px] sm:w-[284px] md:p-6 sm:p-4 rounded-2xl bg-white100">
      <h2 className="md:text-[24px] sm:text-[18px] md:mb-6 sm:mb-10 font-bold">
        비밀번호 변경
      </h2>
      <div className="flex flex-col gap-4">
        <InputField
          label="현재 비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <InputField
            label="새 비밀번호"
            name="newPassword"
            type="password"
            placeholder="새 비밀번호 입력"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onBlur={handleBlur}
            error={passwordLenError}
          />
          {passwordLenError && (
            <p className="text-red-500 mt-2">비밀번호는 8자 이상입니다.</p>
          )}
        </div>

        <div>
          <InputField
            label="새 비밀번호 확인"
            name="newPasswordConfirm"
            type="password"
            placeholder="새 비밀번호 입력"
            value={newPasswordConfirm}
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
            error={passwordMatchError}
          />
          {passwordMatchError && (
            <p className="text-red-500 mt-2">비밀번호가 일치하지 않습니다.</p>
          )}
        </div>
      </div>

      <MyButton onClick={handlePasswordChange} disabled={isButtonDisabled}>
        변경
      </MyButton>

      {isOpen && (
        <ModalAlert
          isOpen={isOpen}
          onClose={closeModal}
          text="현재 비밀번호가 틀립니다."
        />
      )}
    </div>
  );
};

export default MyPassWord;
