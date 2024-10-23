import React, { useState } from "react";
import InputField from "./InputField";
import MyButton from "./MyButton";

const MyPassWord: React.FC = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handlePasswordChange = () => {
    if (password !== "currentPassword") {
      // 실제로는 서버에서 비밀번호 확인
      alert("현재 비밀번호가 틀립니다");
    } else {
      console.log("비밀번호 변경 완료");
    }
  };

  const handleBlur = () => {
    if (newPassword !== newPasswordConfirm) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };

  const isButtonDisabled =
    !password || !newPassword || !newPasswordConfirm || passwordMatchError;

  return (
    <div className="lg:w-[672px] md:w-[548px] sm:w-[284px] md:p-6 sm:p-4 rounded-2xl bg-white100">
      <h2 className="md:text-[24px] sm:text-[18px] font-bold">비밀번호 변경</h2>
      <InputField
        label="현재 비밀번호"
        name="password"
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputField
        label="새 비밀번호"
        name="newPassword"
        type="password"
        placeholder="새 비밀번호 입력"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        onBlur={handleBlur}
      />
      <InputField
        label="새 비밀번호 확인"
        name="newPasswordConfirm"
        type="password"
        placeholder="새 비밀번호 입력"
        value={newPasswordConfirm}
        onChange={(e) => setNewPasswordConfirm(e.target.value)}
        onBlur={handleBlur}
      />
      {passwordMatchError && (
        <p className="text-red-500">비밀번호가 일치하지 않습니다.</p>
      )}
      <MyButton onClick={handlePasswordChange} disabled={isButtonDisabled}>
        변경
      </MyButton>
    </div>
  );
};

export default MyPassWord;
