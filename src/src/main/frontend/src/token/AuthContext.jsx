import React, { createContext, useState, useEffect } from "react";

import { logout as requestLogout } from "./Logout";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    setIsAuthenticated(Boolean(token));
  }, []);

  const login = (accessToken) => {
    sessionStorage.setItem("accessToken", accessToken);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await requestLogout(); // 분리된 logout 함수 호출
    setIsAuthenticated(false); // 로그인 상태 업데이트
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
