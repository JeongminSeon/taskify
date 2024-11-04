// 필요한 모듈과 컴포넌트들을 import
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { parse } from "cookie";
import { getUserInfo } from "@/utils/api/authApi";
import { UserResponse } from "@/types/users";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";
import Column from "@/components/DashBoard/column/Column";
import DashBoardLayout from "@/components/Layout/DashBoardLayout";
import Portal from "@/components/UI/modal/ModalPotal";
import OneInputModal from "@/components/UI/modal/InputModal/OneInputModal";
import useModal from "@/hooks/modal/useModal";
import LoadingSpinner from "@/components/UI/loading/LoadingSpinner";
import MetaHead from "@/components/MetaHead";
import Custom404 from "@/pages/404";
import { useDashBoardStore } from "@/store/dashBoardStore";

// DashboardDetailProps 인터페이스 정의 - 초기 유저 정보를 받는 props
interface DashboardDetailProps {
  initialUser: UserResponse | null;
}

// DashboardDetail 컴포넌트 정의, initialUser라는 props를 받아 사용
const DashboardDetail: React.FC<DashboardDetailProps> = ({ initialUser }) => {
  const router = useRouter();
  const { dashboardsId } = router.query;
  const { setDashboardId, columns, loading, error, fetchColumns, addColumn } =
    useDashBoardStore();

  const {
    isOpen,
    inputValue,
    openModal: handleAddColumn,
    closeModal,
    handleInputChange,
    handleConfirm: handleModalConfirm,
  } = useModal();

  const { setUser, checkAuth } = useAuthStore();

  useEffect(() => {
    if (initialUser) {
      setUser({
        ...initialUser,
        profileImageUrl: initialUser.profileImageUrl || "",
      });
    } else {
      checkAuth();
    }
  }, [initialUser, setUser, checkAuth]);

  const handleConfirm = useCallback(
    (inputValue: string) => {
      if (dashboardsId) {
        addColumn(inputValue, Number(dashboardsId));
      }
    },
    [dashboardsId, addColumn]
  );

  useEffect(() => {
    if (dashboardsId) {
      fetchColumns(Number(dashboardsId));
      setDashboardId(Number(dashboardsId));
    }
  }, [dashboardsId, fetchColumns, setDashboardId]);

  return (
    <>
      <MetaHead
        title="상세 대시보드 🎯"
        description="대시보드에 새로운 일정을 추가해보세요!"
      />
      <DashBoardLayout>
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <LoadingSpinner text={"로딩중입니다! 잠시만 기다려주세요🙂‍↕️"} />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center min-h-screen text-lg">
            <Custom404 />
          </div>
        ) : (
          <div className="h-srceen columns flex flex-col lg:flex-row">
            {columns.map((item) => (
              <Column
                key={item.id}
                id={item.id}
                title={item.title}
                onRefresh={() => fetchColumns(Number(dashboardsId))}
              />
            ))}
            <div className="columnList flex-1 h-full py-4 px-3 md:p-5 border-r border-[gray600]">
              <button
                type="button"
                className="flex justify-center items-center gap-3 w-full sm:h-[66px] h-[70px] lg:mt-12 border border-gray400 rounded-md bg-white100 text-black300 font-bold"
                onClick={handleAddColumn}
              >
                새로운 컬럼 추가하기
                <Image
                  src="/images/icons/icon_add_column.svg"
                  width={16}
                  height={16}
                  alt="할 일 추가"
                />
              </button>
            </div>
          </div>
        )}
        <Portal>
          <OneInputModal
            isOpen={isOpen}
            modalTitle="새 칼럼 생성"
            inputLabel="이름"
            inputPlaceholder="컬럼 이름을 입력해주세요"
            onCancel={closeModal}
            cancelButtonText="취소"
            onConfirm={() => handleModalConfirm(handleConfirm)}
            confirmButtonText="생성"
            inputValue={inputValue}
            onInputChange={handleInputChange}
          />
        </Portal>
      </DashBoardLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parse(context.req.headers.cookie || ""); // 쿠키 파싱
  const accessToken = cookies.accessToken; // accessToken 추출

  if (!accessToken) {
    // accessToken이 없으면 로그인 페이지로 리다이렉트
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const user = await getUserInfo(accessToken); // accessToken으로 유저 정보 가져오기
    return {
      props: { initialUser: user }, // 유저 정보를 initialUser로 전달
    };
  } catch (error) {
    console.error("Error fetching user info:", error);
    // 에러 발생 시 로그인 페이지로 리다이렉트
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};

export default DashboardDetail;
