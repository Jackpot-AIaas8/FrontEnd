import { apiNoToken } from "../../token/AxiosConfig";

// 아이디 찾기 API 호출 함수
export const findId = async (user) => {
  try {
    const response = await apiNoToken.get("member/findId", {
      params: { name: user.name, phone: user.phone },
    });

    if (response.data) {
      return response.data; // 성공 시 이메일 반환
    } else {
      throw new Error("일치하는 사용자를 찾을 수 없습니다.");
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("일치하는 사용자를 찾을 수 없습니다.");
    } else {
      throw new Error("오류가 발생했습니다. 다시 시도해주세요.");
    }
  }
};

// 이메일 인증 코드 전송 API 호출 함수
export const sendAuthCode = async (email) => {
  try {
    const response = await apiNoToken.post("member/sendAuthCode", { email });

    // 서버 연결 확인 (200번대 응답 확인)
    if (response.status >= 200 && response.status < 300) {
      console.log("서버와의 연결이 성공적으로 이루어졌습니다.");
      return true; // 연결 성공 시 true 반환
    } else {
      console.warn("서버와의 연결에 문제가 발생했습니다.");
      return false; // 연결 실패 시 false 반환
    }
  } catch (error) {
    console.error("서버와의 연결에 실패했습니다:", error);
    return false; // 연결 오류 시 false 반환
  }
};

// 인증 코드 확인 API 호출 함수
export const verifyAuthCode = async (email, authCode) => {
  try {
    const response = await apiNoToken.post("member/verifyAuthCode", {
      email,
      authCode,
    });

    if (response.data.verified) {
      return true; // 인증 성공
    } else {
      throw new Error("인증 코드가 일치하지 않습니다.");
    }
  } catch (error) {
    throw new Error("인증에 실패했습니다. 다시 시도해주세요.");
  }
};

// 비밀번호 재설정 API 호출 함수
export const resetPassword = async (email, password) => {
  try {
    await apiNoToken.post("member/resetPwd", { email, password });
    return true; // 비밀번호 변경 성공
  } catch (error) {
    throw new Error("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
  }
};
