import apiClient from "../token/AxiosConfig";

export const handleDelete = async () => {
  try {
    const response = await apiClient.delete(`member/remove`);
    console.log("회원탈퇴 성공", response);
    alert("회원탈퇴에 성공했습니다.");
    // 로그아웃 처리 및 페이지 이동 필요
  } catch (error) {
    console.error("Error deleting member:", error);
    alert("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
  }
};

export const handleCheckNickname = async (nickname) => {
  try {
    const response = await apiClient.get(`member/checkNickName`, {
      params: { nickName: nickname },
    });
    if (response.data.available) {
      alert("사용 가능한 닉네임입니다.");
    } else {
      alert("닉네임이 이미 사용 중입니다.");
    }
  } catch (error) {
    console.error("Error checking nickname:", error);
    alert("닉네임 중복 확인 중 오류가 발생했습니다.");
  }
};

export const handleEdit = async (memberDTO) => {
  try {
    const response = await apiClient.put("member/edit", memberDTO);
    if (response.status === 200) {
      alert("회원정보 수정에 성공했습니다.");
      // 수정된 정보로 상태 업데이트
    }
  } catch (error) {
    console.error("Error updating member:", error);
    alert("회원정보 수정에 실패했습니다. 다시 시도해주세요.");
  }
};
