import React from "react";
import DatePicker from "react-datepicker";
import Image from "next/image";
import { ko } from "date-fns/locale";
import { boxStyle, inputStyle } from "../styles";
import { format } from "date-fns";

interface DateInputProps {
  value: string; // value를 string 또는 null로 설정
  onChange: (date: string) => void;
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
          selected={value ? new Date(value) : null} // value를 Date로 변환
          onChange={
            (date) => onChange(date ? format(date, "yyyy-MM-dd HH:mm") : "") // string으로 변환하여 전달
          }
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
