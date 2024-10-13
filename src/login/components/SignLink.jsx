import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import styled from "styled-components";
import InputField from "./InputField";
import { apiNoToken } from "../../token/AxiosConfig";

Modal.setAppElement("#root");

const mockData = [
  { phone: "010-1234-5678", name: "홍길동", email: "hong@example.com" },
  { phone: "010-9876-5432", name: "이순신", email: "lee@example.com" },
];

const SignLink = () => {
  const navigate = useNavigate();
  const [modalInfo, setModalInfo] = useState({ isOpen: false, type: "" });
  const [user, setUser] = useState({ phone: "", name: "", email: "" });
  const [isSuccess, setIsSuccess] = useState(false); // 통신 결과로 성공 여부 관리

  const openModal = (type) => {
    setModalInfo({ isOpen: true, type });
    setIsSuccess(false); // 모달 열 때마다 성공 여부 초기화
  };

  const closeModal = () => {
    setModalInfo({ isOpen: false, type: "" });
    setUser({ phone: "", name: "", email: "" });
  };

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const sendUser = async () => {
    // try {
    //   const endpoint = modalInfo.type === "ID" ? "member/findId" : "member/findPwd";
    //   const response = await apiNoToken.post(endpoint, user);

    //   if (response.data) {
    //     setUser((prev) => ({ ...prev, email: response.data.email }));
    //     setIsSuccess(true);
    //   } else {
    //    console.log("입력하신 정보가 일치하지 않습니다.")
    //    setIsSuccess(false);
    //   }
    // } catch (err) {
    //   console.error(err);
    //   setIsSuccess(false); // 통신 실패 시 실패 상태로 설정

    const foundUser = mockData.find(
      (data) => data.phone === user.phone && data.name === user.name
    );

    if (foundUser) {
      setUser((prev) => ({ name:"", phone:"", email: foundUser.email }));
      setIsSuccess(true); // 성공 시 상태 업데이트
    } else {
      alert("일치하는 사용자를 찾을 수 없습니다.");
      setIsSuccess(false); // 실패 시 상태 업데이트
    }
    // }
  };

  const renderForm = () => (
    <div className="flex flex-column">
      {modalInfo.type === "PW" && (
        <InputField
          type="email"
          name="email"
          placeholder="email"
          value={user.email}
          onChange={handleChange}
        />
      )}
      <InputField
        type="text"
        name="name"
        placeholder="name"
        value={user.name}
        onChange={handleChange}
      />
      <InputField
        type="tel"
        name="phone"
        placeholder="phone"
        value={user.phone}
        onChange={handleChange}
      />
      <button className="btn_send" type="submit" onClick={sendUser}>
        전송
      </button>
    </div>
  );

  const renderSuccessMessage = () => (
    <div className="next-step">
      {modalInfo.type === "ID" ? (
        <>
          <h2>인증되었습니다. 이메일: {user.email}</h2>
          <p>비밀번호도 찾으시겠습니까?</p>
          <button onClick={() => openModal("PW")}>예</button>
          <button onClick={closeModal}>아니오</button>
        </>
      ) : (
        <>
          <h2>비밀번호 재설정 인증이 완료되었습니다.</h2>
          <p>새로운 비밀번호를 설정하시겠습니까?</p>
          <button onClick={closeModal}>확인</button>
        </>
      )}
    </div>
  );

  return (
    <>
      <div className="assist">
        <span className="forgot-Id">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              openModal("ID");
            }}
          >
            아이디 찾기
          </a>
        </span>
        <span className="forgot-password">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              openModal("PW");
            }}
          >
            PW찾기
          </a>
        </span>
      </div>

      <div className="go-signUp" onClick={() => navigate("/signUp")}>
        회원이 아니신가요? <a href="#">회원가입하기</a>
      </div>

      <StyledModal
        isOpen={modalInfo.isOpen}
        onRequestClose={closeModal}
        contentLabel={`${modalInfo.type} 찾기`}
        overlayElement={(props, contentElement) => (
          <Overlay {...props}>{contentElement}</Overlay>
        )}
      >
        {isSuccess ? (
          renderSuccessMessage()
        ) : (
          <>
            <h2>{modalInfo.type} 찾기</h2>
            <p>
              {modalInfo.type === "ID"
                ? "아이디를 찾기 위한 인증 절차를 진행하세요."
                : "비밀번호를 재설정하기 위한 인증 절차를 진행하세요."}
            </p>
            {renderForm()}
          </>
        )}
        <button className="btn_close" onClick={closeModal}>
          닫기
        </button>
      </StyledModal>
    </>
  );
};

export default SignLink;

const StyledModal = styled(Modal)`
  background: white;
  padding: 20px;
  max-width: 500px;
  margin: auto;
  border-radius: 10px;
  position: relative;
  z-index: 1000;
  outline: none;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;
