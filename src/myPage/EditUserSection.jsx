import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import {
  validateEmail,
  validateName,
  validateNickname,
  validatePassword,
  validatePhoneNumber,
  formatPhoneNumber,
  getOnlyNumbers,
} from "../login/components/Validation";
import MypagePwModal from "./PwdModal";

const EditUserSection = ({ infoData }) => {
  const [formUser, setFormUser] = useState({
    ...infoData,
    phone: formatPhoneNumber(infoData.phone),
    pwd: "***********",
  });

  const [errors, setErrors] = useState({
    email: "",
    pwd: "",
    phone: "",
    name: "",
    nickName: "",
  });

  const [isEditing, setIsEditing] = useState(false); // 수정 모드 관리
  const [isModalOpen, setIsModalOpen] = useState(false); // 비밀번호 인증 모달 상태
  const [isPasswordVerified, setIsPasswordVerified] = useState(false); // 비밀번호 인증 상태
  const [nextAction, setNextAction] = useState("");
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  // 입력 변경 처리 함수
  const handleChange = (e) => {
    const { name, value } = e.target;

    let error = "";
    let updatedValue = value;

    switch (name) {
      case "email":
        if (!validateEmail(value)) error = "이메일 형식이 잘못되었습니다.";
        break;
      case "pwd":
        if (!validatePassword(value))
          error = "비밀번호는 8~20자 및 특수기호가 포함되어야 합니다.";
        break;
      case "phone":
        // 숫자만 추출
        const numericValue = getOnlyNumbers(value);

        // 전화번호 포맷팅
        updatedValue = formatPhoneNumber(numericValue);

        if (!validatePhoneNumber(numericValue))
          error = "전화번호는 10~11자리 숫자만 허용됩니다.";

        break;
      case "name":
        if (!validateName(value)) error = "이름은 한글 또는 영문만 가능합니다.";
        break;
      case "nickName":
        if (!validateNickname(value))
          error = "닉네임은 3~10자, 영문/한글/숫자만 허용됩니다.";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    setFormUser((prevState) => ({ ...prevState, [name]: updatedValue }));
  };

  // 수정 모드로 전환
  const handleEdit = () => {
    if (!isPasswordVerified) {
      setNextAction("edit"); // 다음 작업을 수정으로 설정
      setIsModalOpen(true); // 비밀번호 인증 모달 열기
    } else {
      setIsEditing(true); // 비밀번호 인증 완료 시 수정 모드로 전환
    }
  };

  // 저장 처리 함수
  const handleSave = () => {
    setIsEditing(false);

    const dataToSend = {
      ...formUser,
      phone: getOnlyNumbers(formUser.phone),
    };
    

    console.log("수정된 회원 정보:", dataToSend);
    // 여기에서 API 호출 등을 통해 서버에 저장하는 로직을 추가하세요
  };

  // 수정 취소 처리 함수
  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormUser({
      ...infoData,
      phone: formatPhoneNumber(infoData.phone),
      pwd: "***********",
    }); // 초기 데이터로 복구
    setErrors({
      email: "",
      pwd: "",
      phone: "",
      name: "",
      nickName: "",
    });
  };


  const handlePasswordSuccess = () => {
    setIsPasswordVerified(true);
    setIsModalOpen(false);

    if (nextAction === "edit") {
      setIsEditing(true); // 인증 성공 후 수정 모드로 전환
    } else if (nextAction === "delete") {
      console.log("회원 탈퇴 처리");
      // 탈퇴 처리 로직 실행
    }
  };

  // 회원 탈퇴 처리 함수
  const handleDelete = () => {
    setIsDeleteConfirmOpen(true); // 탈퇴 확인 모달 열기
  };

  // 탈퇴 확인 모달에서 "예"를 눌렀을 때
  const handleConfirmDelete = () => {
    setIsDeleteConfirmOpen(false); // 탈퇴 확인 모달 닫기
    setNextAction("delete"); // 다음 작업을 탈퇴로 설정
    setIsModalOpen(true); // 비밀번호 인증 모달 열기
  };

  // 닉네임 중복 검사 함수
  const handleCheckNickname = () => {
    // 닉네임 중복 검사 로직 추가
    console.log("닉네임 중복 검사:", formUser.nickName);
  };

  

  const input = [
    { label: "이메일", name: "email", type: "text", readOnly: true },
    {
      label: "비밀번호",
      name: "pwd",
      type: "password",
      placeholder: "비밀번호 수정",
    },
    {
      label: "전화번호",
      name: "phone",
      type: "text",
      placeholder: "전화번호 수정",
    },
    { label: "이름", name: "name", type: "text", placeholder: "이름 수정" },
    {
      label: "닉네임",
      name: "nickName",
      type: "text",
      placeholder: "새로운 닉네임 입력",
      withCheck: true,
    },
  ];

  return (
    <StyledEditMember className="flex flex-column">
      <h4 className="edit-title text-left p-2 w-full">회원정보 수정</h4>
      <form onSubmit={(e) => e.preventDefault()}>
        {input.map((field, index) => (
          <div className="section-input flex flex-row" key={index}>
            <span className="input-title">{field.label}:</span>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formUser[field.name]}
              onChange={handleChange}
              readOnly={field.readOnly || !isEditing} // 이메일은 항상 읽기 전용, 수정 모드 시 나머지 필드 활성화
              style={{ flexGrow: 1 }}
              className="input-text"
              autoComplete={
                field.name === "pwd"
                  ? "current-password"
                  : field.name === "email"
                  ? "email"
                  : field.name === "name"
                  ? "name"
                  : field.name === "phone"
                  ? "tel"
                  : undefined
              }
            />
            {errors[field.name] && (
              <p style={{ color: "red" }}>{errors[field.name]}</p>
            )}
            {/* 닉네임 중복 검사 버튼 추가 */}
            {field.withCheck && isEditing && (
              <Button
                onClick={handleCheckNickname}
                color="primary"
                style={{ marginLeft: "10px", whiteSpace: "nowrap" }}
              >
                닉네임 중복검사
              </Button>
            )}
          </div>
        ))}

        <div className="flex justify-end">
          {isEditing ? (
            <>
              <Button
                onClick={handleCancelEdit}
                color="primary"
                className="btn_group"
              >
                취소하기
              </Button>
              <Button
                onClick={handleSave}
                color="primary"
                className="btn_group"
              >
                저장하기
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleDelete}
                color="primary"
                className="btn_group"
              >
                탈퇴하기
              </Button>
              <Button
                onClick={handleEdit}
                color="primary"
                className="btn_group"
              >
                수정하기
              </Button>
            </>
          )}
        </div>
      </form>

      <Dialog
        open={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogTitle>회원 탈퇴 확인</DialogTitle>
        <DialogContent>
          <DialogContentText>
            정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteConfirmOpen(false)}>아니오</Button>
          <Button onClick={handleConfirmDelete}>예</Button>
        </DialogActions>
      </Dialog>
      <MypagePwModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handlePasswordSuccess}
      />
    </StyledEditMember>
  );
};

export default EditUserSection;

const StyledEditMember = styled.div`
  h4 {
    font-size: 1.8rem;
    line-height: 1.5rem;
  }
  .section-input {
    width: 100%;
    min-height: 80px;
    align-items: center;
    margin-bottom: 30px;
    padding: 0;
    > .input-title {
      width: 15%;
      font-size: 1.2rem;
    }
    > .input-text {
      border: 1px solid ${(props) => props.theme.colors.pastelOrange};
      padding: 8px;
      border-radius: 4px;
      outline: none;
      flex-grow: 1;
    }
  }
`;
