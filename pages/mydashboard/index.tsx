import React from "react";
import Link from "next/link";
import Image from "next/image";
import AddBox from "@/public/images/icons/icon_add_box.svg";
import Setting from "@/public/images/icons/icon_settings.svg";
import unInvited from "@/public/images/resource/uninvited_image.png";
import styles from "./mydashboard.module.css";

const mydashboard = () => {
  return (
    <div className="dashboard">
      <div className="sticky top-0 h-screen py-5 px-[14px] border-r border-[--gray400] bg-white lg:px-2 ">
        <h1 className={styles.sideLogo}>
          <Link href="/">Taskify</Link>
        </h1>
        <div className="mt-[38px] color text-[--gray200] text-xs">
          <button
            type="button"
            className={`flex justify-between items-center w-full py-4 font-semibold ${styles.btnNewBoards}`}
          >
            Dash Boards
            <AddBox />
          </button>
          <ul className={`flex flex-col gap-2 ${styles.menuList}`}>
            <li>
              <a href="">비브리지</a>
            </li>
            <li>
              <a href="">비브리지</a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div className="sticky top-0 border-b border-[--gray400] bg-white">
          <div className="headerWrap flex justify-between items-center w-full py-[13px] px-[18px] md:px-10 md:py-[15px]">
            <h2 className="pageTitle flex-1 text-x font-bold md:text-xl lg:text-[2rem]">
              내 대시보드
            </h2>
            <ul className={`flex gap-4 ${styles.headerMenu}`}>
              <li>
                <button type="button">
                  <span>
                    <Setting />
                  </span>
                  관리
                </button>
              </li>
              <li>
                <button type="button">
                  <span>
                    <AddBox />
                  </span>
                  초대하기
                </button>
              </li>
            </ul>
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-[--gray400] md:ml-8 md:pl-8 lg:ml-9 lg:pl-9">
              <span className="w-[34px] h-[34px] rounded-full bg-slate-500">
                icon
              </span>
              <p className="hidden md:block">배유철</p>
            </div>
          </div>
        </div>
        <div className="bg-[--gray600]">
          <div
            className={`w-full h-screen p-6 md:p-10 lg:max-w-[1102px] ${styles.boardContent}`}
          >
            <div
              className={`flex flex-col gap-2 md:flex-row md:flex-wrap md:gap-[10px] lg:gap-[13px] ${styles.boardCardWrap}`}
            >
              <button type="button" className={styles.btnNewCard}>
                <span>새로운 대시보드</span>
              </button>
              <button type="button">
                <span>비브리지</span>
              </button>
              <button type="button">
                <span>비브리지</span>
              </button>
              <button type="button">
                <span>비브리지</span>
              </button>
            </div>
            <div className="invitedListmt-6 p md:mt-12 lg:mt-10 bg-white">
              <div className="py-6 px-4 md:py-[18px] md:px-7 lg:py-8">
                <h3 className="text-2xl font-bold">초대받은 대시보드</h3>
                <div className="py-[105px] md:py-16">
                  <div className="relative w-[60px] h-[60px]  mx-auto md:w-[100px] md:h-[100px]">
                    <Image
                      src={unInvited}
                      fill
                      className="object-contain"
                      alt="description"
                    />
                  </div>
                  <p className="pt-6 text-[18px] text-[--gray300] text-center">
                    아직 초대받은 대시보드가 없어요
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default mydashboard;
