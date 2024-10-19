import { useState } from "react";

import apiClient from "../token/AxiosConfig";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const commonInputStyles = {
  border: "1px solid #ff7600",
  padding: "8px",
  borderRadius: "4px",
  outline: "none",
  flexGrow: 1,
};

// InputField 컴포넌트
const InputField = styled("input")({
  ...commonInputStyles,
});

// OrangeButton 스타일
const OrangeButton = styled(Button)(({ theme }) => ({
  color: "#505050",
  backgroundColor: "#e0e0e0",
  "&:hover": {
    backgroundColor: "#bbbbbb",
  },
}));

const EditUserSection = ({
  email,
  setEmail,
  password,
  setPassword,
  phone,
  setPhone,
  name,
  setName,
  nickname,
  setNickname,
  address,
  setAddress,
  handleEdit,
  handleDelete,
  handleCheckNickname,
}) => {
  const commonFlexStyles = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    width: "100%",
  };

  return (
    <div
      className="w-full h-full"
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <h4 className="text-left p-2">회원정보 수정</h4>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={commonFlexStyles}>
          <span>이메일:</span>
          <InputField type="text" value={email} readOnly />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span>비밀번호:</span>
          <InputField
            type="password"
            placeholder="비밀번호 수정"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div style={commonFlexStyles}>
          <span>전화번호:</span>
          <InputField
            type="text"
            placeholder="전화번호 수정"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div style={commonFlexStyles}>
          <span>이름:</span>
          <InputField
            type="text"
            placeholder="이름 수정"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={commonFlexStyles}>
          <span style={{ whiteSpace: "nowrap" }}>닉네임:</span>
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <InputField
              type="text"
              placeholder="새로운 닉네임 입력"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              style={{ flexGrow: 1 }} // 인풋이 가능한 공간을 최대한 차지하게 함
            />
            <OrangeButton
              onClick={handleCheckNickname}
              color="primary"
              style={{ marginLeft: "10px", whiteSpace: "nowrap" }}
            >
              닉네임 중복검사
            </OrangeButton>
          </div>
        </div>

        <div style={commonFlexStyles}>
          <span>주소:</span>
          <InputField
            type="text"
            placeholder="주소 수정"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "10px",
        }}
      >
        <OrangeButton
          onClick={handleDelete}
          color="primary"
          style={{ marginLeft: "10px" }}
        >
          탈퇴하기
        </OrangeButton>
        <OrangeButton
          onClick={handleEdit}
          color="primary"
          style={{ marginLeft: "10px" }}
        >
          수정하기
        </OrangeButton>
      </div>
    </div>
  );
};

const UserProfile = () => {
  const [memberID, setMemberID] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [address, setAddress] = useState("");

  const handleEdit = async () => {
    const memberDTO = {
      memberID,
      email,
      password,
      phone,
      name,
      nickname,
      address,
    };

    try {
      const response = await apiClient.put("member/edit", memberDTO);

      if (response.status === 200) {
        alert("회원정보 수정에 성공했습니다.");
      }
    } catch (error) {
      console.error("Error updating member:", error);
      alert("회원정보 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await apiClient.delete(`member/remove`);
      console.log("회원탈퇴 성공", response);
      alert("회원탈퇴에 성공했습니다.");
      navigate("/"); // 회원탈퇴되면 알러트창 띄우고 나서 메인페이지로 이동함
    } catch (error) {
      console.error("Error deleting member:", error);
      alert("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleCheckNickname = async () => {
    try {
      const response = await apiClient.get(`member/checkNickName`, {
        params: { nickName: nickname },
      });
      console.log(response);
      if (response.data[nickname]) {
        alert("닉네임이 이미 사용 중입니다.");
      } else {
        alert("사용 가능한 닉네임입니다.");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("닉네임이 이미 사용 중입니다.");
      } else {
        console.error("Error checking nickname:", error);
      }
    }
  };

  return (
    <div>
      <EditUserSection
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        phone={phone}
        setPhone={setPhone}
        name={name}
        setName={setName}
        nickname={nickname}
        setNickname={setNickname}
        address={address}
        setAddress={setAddress}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleCheckNickname={handleCheckNickname}
      />
    </div>
  );
};

export default UserProfile;
