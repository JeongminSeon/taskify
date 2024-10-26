import React from "react";
import DatePicker from "react-datepicker";
import Image from "next/image";
import { ko } from "date-fns/locale";
import { boxStyle, inputStyle } from "../styles";

interface DateInputProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

const DateInput = ({ value, onChange }: DateInputProps) => {
  return (
    <div className={`${boxStyle}`}>
      <span className="labelStyle">마감일</span>
      <div className={`${inputStyle} flex items-center gap-2`}>
        <Image
          src="/images/icons/icon_calendar.svg"
          alt="날짜"
          width="22"
          height="22"
        />
        <DatePicker
          selected={value}
          onChange={onChange}
          showTimeSelect
          dateFormat="yyyy-MM-dd HH:mm"
          placeholderText="날짜를 입력해 주세요"
          locale={ko}
          className="outline-none md:w-[460px] sm:w-[240px]"
        />
      </div>
    </div>
  );
};

export default DateInput;
