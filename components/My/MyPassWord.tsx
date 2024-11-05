import React, { useState, useEffect } from "react";
import { isPWValid, isSame, isEntered } from "@/utils/validation";
import { updatePassword } from "@/utils/api/authApi";
import { PasswordProps } from "@/types/my";
import InputField from "./InputField";
import MyButton from "./MyButton";
import ModalAlert from "../UI/modal/ModalAlert";
import useModal from "@/hooks/modal/useModal";
import useErrorModal from "@/hooks/modal/useErrorModal";

// 초기 비밀번호 상태를 설정
const INITIAL_PASSWORDS: PasswordProps = {
  current: "", // 현재 비밀번호
  new: "", // 새 비밀번호
  confirm: "", // 새 비밀번호 확인
};

const MyPassWord: React.FC = () => {
  // 모달 상태 제어 훅을 호출
  const { isOpen: isModalOpen, openModal, closeModal } = useModal();
  const { isOpen, errorMessage, handleError, handleClose } = useErrorModal();

  // 비밀번호 관련 에러 상태와 모달 메시지 상태를 설정
  const [passwordLenError, setPasswordLenError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // 입력된 비밀번호 값을 객체로 관리
  const [passwords, setPasswords] = useState<PasswordProps>(INITIAL_PASSWORDS);

  // 비밀번호 업데이트 요청 핸들러 함수
  const handlePasswordChange = async () => {
    try {
      // 현재 비밀번호와 새 비밀번호를 전달하여 비밀번호를 업데이트
      await updatePassword({
        password: passwords.current,
        newPassword: passwords.new,
      });
      setModalMessage("비밀번호가 성공적으로 변경되었습니다.");
      setPasswords(INITIAL_PASSWORDS); // 성공 시 입력란 초기화
      openModal();
    } catch (error) {
      handleError(error as Error);
    }
  };

  // 입력 필드 변경 시 비밀번호 상태를 업데이트
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  // 새 비밀번호 유효성 검사 핸들러 함수
  const handleBlur = () => {
    setPasswordLenError(!isPWValid(passwords.new)); // 길이가 유효한지 검사
  };

  // 새 비밀번호와 확인 비밀번호의 일치 여부를 검사
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isEntered(passwords.confirm)) {
        setPasswordMatchError(!isSame(passwords.new, passwords.confirm));
      } else {
        setPasswordMatchError(false); // 입력값이 없으면 에러를 초기화
      }
    }, 300); // 입력 후 300ms 지연
    return () => clearTimeout(timer); // 이전 타이머 제거
  }, [passwords.new, passwords.confirm]);

  // 모든 필드가 입력되었고 에러가 없을 때만 버튼 활성화
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
        {/* 현재 비밀번호 입력 필드 */}
        <InputField
          label="현재 비밀번호"
          name="current"
          type="password"
          placeholder="비밀번호 입력"
          value={passwords.current}
          onChange={handleInputChange}
        />

        {/* 새 비밀번호 입력 필드 */}
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

        {/* 새 비밀번호 확인 입력 필드 */}
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

      {/* 비밀번호 변경 버튼 */}
      <MyButton onClick={handlePasswordChange} disabled={isButtonDisabled}>
        변경
      </MyButton>

      {/* 성공 모달창 */}
      {isModalOpen && (
        <ModalAlert
          isOpen={isModalOpen}
          onClose={closeModal}
          text={modalMessage}
        />
      )}

      {/* 에러 모달창 */}
      {isOpen && (
        <ModalAlert isOpen={isOpen} onClose={handleClose} text={errorMessage} />
      )}
    </div>
  );
};

export default MyPassWord;
