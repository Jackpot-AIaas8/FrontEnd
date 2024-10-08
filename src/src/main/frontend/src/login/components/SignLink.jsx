import React from "react";
import { useNavigate } from "react-router-dom";

const SignLink = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="assist">
        <span className="forgot-Id">
          <a href="#">아이디 찾기</a>
        </span>
        <span className="forgot-password">
          <a href="#">PW찾기</a>
        </span>
      </div>

      <div
        className="go-signUp"
        onClick={() => {
          navigate("/signUp");
        }}
      >
        회원이 아니신가요? <a href="#">회원가입하기</a>
      </div>
    </>
  );
};

export default SignLink;
