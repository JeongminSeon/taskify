// 필요한 모듈과 컴포넌트들을 import
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { parse } from "cookie";
import { getColumns, createColumn } from "../../../utils/api/columnsApi";
import { getUserInfo } from "@/utils/api/authApi";
import { ColoumnsParams, Columns, ColumnsResponse } from "@/types/columns";
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
  const router = useRouter(); // Next.js의 useRouter 훅 사용
  const { dashboardsId } = router.query; // 쿼리 파라미터에서 dashboard ID 추출
  const { setDashboardId } = useDashBoardStore();
  const [columns, setColumns] = useState<Columns[]>([]); // 칼럼 데이터 상태
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  // 모달 관련 훅 사용 (모달 열기, 닫기, 입력값 제어, 확인 함수 설정)
  const {
    isOpen,
    inputValue,
    openModal: handleAddColumn,
    closeModal,
    handleInputChange,
    handleConfirm: handleModalConfirm,
  } = useModal();

  // 인증 관련 상태와 메서드 불러오기
  const { setUser, checkAuth } = useAuthStore();

  // 컴포넌트가 마운트될 때 initialUser가 있으면 유저 정보 설정, 없으면 인증 체크
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

  // 칼럼 데이터를 가져오는 함수
  const fetchColumns = useCallback(async () => {
    const dashboardId = Number(dashboardsId); // dashboard ID를 숫자로 변환
    const params: ColoumnsParams = { dashboardId }; // API 호출에 필요한 파라미터 설정

    try {
      setLoading(true);
      const columnsData: ColumnsResponse = await getColumns(params); // 칼럼 데이터 API 호출
      setColumns(columnsData.data); // 상태에 칼럼 데이터 설정
    } catch (err) {
      console.error("Error fetching columns:", err);
      setError("Failed to fetch columns. Please try again later."); // 에러 발생 시 에러 메시지 설정
    } finally {
      setLoading(false); // 로딩 상태 업데이트
    }
  }, [dashboardsId]);

  // 새로운 칼럼을 생성하는 함수, 모달의 확인 버튼을 클릭 시 실행
  const handleConfirm = useCallback(
    (inputValue: string) => {
      createColumn({
        title: inputValue,
        dashboardId: Number(dashboardsId),
      }).then((newColumn) => {
        if (newColumn) {
          setColumns((prev) => [
            ...prev,
            { ...newColumn, dashboardId: Number(dashboardsId) },
          ]);
        }
        fetchColumns(); // 새로 생성한 칼럼을 가져와 화면에 업데이트
      });
    },
    [dashboardsId, fetchColumns]
  );

  // 컴포넌트가 마운트되거나 dashboardsId가 변경될 때 칼럼 데이터 가져오기
  useEffect(() => {
    if (dashboardsId) {
      fetchColumns();
    }
    setDashboardId(Number(dashboardsId));
  }, [dashboardsId, fetchColumns, setDashboardId]);

  return (
    <>
      <MetaHead
        title="상세 대시보드🎯"
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
                onRefresh={fetchColumns}
              />
            ))}
            <div className="columnList flex-1 h-screen py-4 px-3 md:p-5 border-r border-[gray600]">
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
