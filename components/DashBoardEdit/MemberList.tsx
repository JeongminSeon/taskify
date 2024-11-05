import { useEffect, useState } from "react";
import { Member, MemberResponse } from "@/types/members";
import { deleteMember, getMembers } from "@/utils/api/membersApi";
import Pagination from "../UI/pagination/Pagination";
import MemberItem from "./components/MemberItem";
import ModalAlert from "../UI/modal/ModalAlert";
import useErrorModal from "@/hooks/modal/useErrorModal";

interface MemberListProps {
  dashboardId: number; // 대시보드 ID
  currentUserId: number; // 현재 사용자 ID
}

const MemberList: React.FC<MemberListProps> = ({
  dashboardId,
  currentUserId,
}) => {
  const [members, setMembers] = useState<Member[]>([]); // 멤버 상태
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState<number>(0); // 총 페이지 수 상태
  const [deleteMemberId, setDeleteMemberId] = useState<number | null>(null); // 삭제할 멤버 ID 상태
  const { isOpen, errorMessage, handleError, handleClose } = useErrorModal(); // 에러 모달 훅

  // 멤버 목록을 불러오는 useEffect
  useEffect(() => {
    const fetchMembers = async () => {
      if (dashboardId) {
        try {
          const data: MemberResponse = await getMembers(
            currentPage,
            5,
            dashboardId
          ); // 멤버 목록 불러오기
          setMembers(data.members); // 멤버 상태 업데이트
          setTotalPages(Math.ceil(data.totalCount / 5)); // 총 페이지 수 계산
        } catch (error) {
          throw error;
        }
      }
    };

    fetchMembers(); // 멤버 목록 불러오기 호출
  }, [currentPage, dashboardId]); // currentPage 또는 dashboardId 변경 시 호출

  // 다음 페이지로 이동
  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  // 이전 페이지로 이동
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // 멤버 삭제 핸들러
  const handleDeleteMember = (memberId: number) => {
    setDeleteMemberId(memberId); // 삭제할 멤버 ID 설정
  };

  // 삭제 확인 및 실행
  const confirmDeleteMember = async () => {
    if (deleteMemberId !== null) {
      try {
        await deleteMember(deleteMemberId); // 멤버 삭제 요청
        setMembers((prevMembers) =>
          prevMembers.filter((member) => member.id !== deleteMemberId)
        ); // 삭제 후 상태 업데이트
      } catch (error) {
        handleError(error);
      } finally {
        setDeleteMemberId(null); // 삭제 후 ID 초기화
      }
    }
  };

  return (
    <>
      <div className="absolute right-4 md:right-7 top-5">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
        />
      </div>
      <p className="px-4 md:px-7 text-xs md:text-sm text-gray300">이름</p>
      <ul>
        {members.map((member) => (
          <MemberItem
            key={member.id}
            member={member}
            handleDeleteMember={handleDeleteMember}
            currentUserId={currentUserId}
          />
        ))}
      </ul>

      {isOpen && (
        <ModalAlert isOpen={isOpen} onClose={handleClose} text={errorMessage} />
      )}

      {/* 삭제 확인 모달 */}
      <ModalAlert
        isOpen={deleteMemberId !== null}
        onClose={() => setDeleteMemberId(null)}
        text="해당 구성원을 삭제하시겠습니까?"
        onConfirm={confirmDeleteMember} // 확인 시 삭제 실행
        type="confirm"
      />
    </>
  );
};

export default MemberList;
