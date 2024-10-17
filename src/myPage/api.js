// src/myPage/api.js
import apiClient from "../token/AxiosConfig.js";

// 기존 API 함수들
export const fetchShopMerchList = async () => {
  try {
    const response = await apiClient.get("shop/findOrderList", {
      params: { page: 1, size: 5 },
    });
    console.log("구매리스트 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("구매리스트 요청 실패:", error);
  }
};

export const fetchOneOnOneBoardList = async () => {
  try {
    const response = await apiClient.get("board/findAllAskMyPage", {
      params: { page: 1, size: 5 },
    });
    console.log("문의 내역 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("문의 내역 요청 실패:", error);
  }
};

export const fetchDogFundList = async () => {
  try {
    const response = await apiClient.get("dog/fundListMyPage");
    console.log("펀딩 내역 응답:", response.data);
    return response.data.dogList;
  } catch (error) {
    console.error("펀딩 내역 요청 실패:", error);
  }
};

// 단독 실행을 위한 테스트 코드 추가
(async () => {
  console.log("테스트 시작");

  // 각 함수 호출
  await fetchShopMerchList();
  await fetchOneOnOneBoardList();
  await fetchDogFundList();

  console.log("테스트 완료");
})();

// 마이페이지 함수들 테스트하는 파일
// package.js의 private아래에 "type": "module",추가하고
// axiosconfig.js와 logout.js의 임포트문에 .js붙여주고 (ex,import apiClient from "../token/AxiosConfig.js"; 맨 끝에 js )
// node src/myPage/api.js라고 터미널에서 실행하기
