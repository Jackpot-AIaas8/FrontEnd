import axios from "axios";
import { SERVER_URL } from "../config/Constants";
import { logout } from "./Logout";

export const apiNoToken = axios.create({
  //import {apiNoToken} from "Axiosconfig";
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiClient = axios.create({
  //import apiclient form "token/AxiosConfig";
  baseURL: SERVER_URL,
  withCredentials: true, // 쿠키를 포함하여 요청을 보내기 위한 설정
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 상태 코드이고, 토큰 재발급 시도를 하지 않았을 경우
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // 재시도를 방지하기 위한 플래그 설정
      try {
        const currentAccessToken = sessionStorage.getItem("accessToken");

        if (!currentAccessToken) {
          return Promise.reject(new Error("Access token is missing"));
        }

        // 리프레시 토큰을 사용해 새 액세스 토큰을 재발급
        const response = await axios.post(
          `${SERVER_URL}reissue`, // 슬래시를 추가하여 경로 수정
          {},
          {
            withCredentials: true, // 리프레시 토큰을 쿠키로 전송
          }
        );
        console.log(response);

        const { access: accessToken } = response.data;
        console.log("New access token received:", accessToken); // 새 액세스 토큰을 받은 후의 로그

        if (accessToken) {
          // 새로운 액세스 토큰을 세션 스토리지에 저장
          sessionStorage.setItem("accessToken", accessToken);
          console.log("Access token updated in session storage.");

          // 원래 요청의 Authorization 헤더를 새 토큰으로 갱신하고 재시도
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          console.log("Retrying original request with new access token...");

          return apiClient(originalRequest); // 원래 요청 재시도
        } else {
          await logout();
          return Promise.reject(new Error("토큰 재발급에 실패했습니다."));
        }
      } catch (err) {
        logout(); // 리프레시 토큰으로도 실패한 경우 로그아웃
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
