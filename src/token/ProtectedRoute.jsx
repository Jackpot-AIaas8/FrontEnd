import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, userRole } = useContext(AuthContext);
  console.log(userRole);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // 사용자가 로그인되지 않은 경우 로그인 페이지로 리디렉션
      console.log("비로그인 console");
      alert("로그인 후 이용 가능한 기능입니다.");
      navigate("/", { replace: true });
    } else if (!allowedRoles.includes(userRole)) {
      // 사용자가 해당 역할에 포함되지 않은 경우, 접근 불가 페이지로 리디렉션
      console.log("관리자X");
      alert("접근이 허용되지 않은 회원입니다.");
      navigate("/");
    }
  }, [isAuthenticated, userRole, allowedRoles, navigate]);

  return isAuthenticated && allowedRoles.includes(userRole) ? children : null;
};

export default ProtectedRoute;
