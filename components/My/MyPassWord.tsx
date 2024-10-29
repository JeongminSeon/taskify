import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import MyButton from "./MyButton";
import ModalAlert from "../UI/modal/ModalAlert";
import { isPWValid, isSame, isEntered } from "@/utils/validation";
import { updatePassword } from "@/utils/api/authApi";
import useModal from "@/hooks/modal/useModal";
import { PasswordProps } from "@/types/my";

const INITIAL_PASSWORDS = {
  current: "",
  new: "",
  confirm: "",
};

const MyPassWord: React.FC = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [passwordLenError, setPasswordLenError] = useState<boolean>(false);
  const [passwordMatchError, setPasswordMatchError] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [passwords, setPasswords] = useState<PasswordProps>(INITIAL_PASSWORDS);

  const handlePasswordChange = async () => {
    try {
      await updatePassword({
        password: passwords.current,
        newPassword: passwords.new,
      });
      setModalMessage("비밀번호가 성공적으로 변경되었습니다.");
      setPasswords(INITIAL_PASSWORDS);
      openModal();
    } catch (error) {
      console.error(error);
      setModalMessage((error as Error).message);
      openModal();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = () => {
    setPasswordLenError(!isPWValid(passwords.new));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isEntered(passwords.confirm)) {
        setPasswordMatchError(!isSame(passwords.new, passwords.confirm));
      } else {
        setPasswordMatchError(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [passwords.new, passwords.confirm]);

  const isButtonDisabled =
    !isEntered(passwords.current) ||
    !isEntered(passwords.new) ||
    !isEntered(passwords.confirm) ||
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
          name="current"
          type="password"
          placeholder="비밀번호 입력"
          value={passwords.current}
          onChange={handleInputChange}
        />
        <div>
          <InputField
            label="새 비밀번호"
            name="new"
            type="password"
            placeholder="새 비밀번호 입력"
            value={passwords.new}
            onChange={handleInputChange}
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
            name="confirm"
            type="password"
            placeholder="새 비밀번호 입력"
            value={passwords.confirm}
            onChange={handleInputChange}
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
        <ModalAlert isOpen={isOpen} onClose={closeModal} text={modalMessage} />
      )}
    </div>
  );
};

export default MyPassWord;
