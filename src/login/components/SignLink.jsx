import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Tabs,
  Tab,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { apiNoToken } from "../../token/AxiosConfig";

// 상수 정의
const initialUserState = { phone: "", name: "", email: "" };
const TAB_FIND_ID = 0;
const TAB_FIND_PWD = 1;
const TAB_LABELS = ["아이디 찾기", "비밀번호 찾기"];

// 이메일 모달 컴포넌트
const EmailModal = ({ open, onClose, foundEmail, onPasswordFind }) => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
    <DialogTitle>아이디 찾기 결과</DialogTitle>
    <DialogContent dividers>
      <p>가입하신 이메일은 다음과 같습니다:</p>
      <p style={{ fontWeight: "bold" }}>{foundEmail}</p>
      <p>비밀번호를 찾으시겠습니까?</p>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        닫기
      </Button>
      <Button onClick={onPasswordFind} variant="contained" color="primary">
        비밀번호 찾기
      </Button>
    </DialogActions>
  </Dialog>
);

// 비밀번호 모달 컴포넌트
const PwdModal = ({ open, onClose, onPasswordReset }) => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
    <DialogTitle>비밀번호 찾기 인증 완료</DialogTitle>
    <DialogContent dividers>
      <p>비밀번호 재설정 인증이 완료되었습니다.</p>
      <p>새로운 비밀번호를 설정하시겠습니까?</p>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        닫기
      </Button>
      <Button onClick={onPasswordReset} variant="contained" color="primary">
        비밀번호 재설정
      </Button>
    </DialogActions>
  </Dialog>
);

const SignLink = () => {
  const navigate = useNavigate();

  // 상태 변수
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(TAB_FIND_ID);
  const [user, setUser] = useState(initialUserState);
  const [foundEmail, setFoundEmail] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPwdModal, setShowPwdModal] = useState(false);

  // 상태 초기화 함수
  const resetStates = () => {
    setUser(initialUserState);
    setFoundEmail("");
    setShowEmailModal(false);
    setShowPwdModal(false);
  };

  // 메인 다이얼로그 열기
  const openDialog = () => {
    setOpen(true);
    setTabValue(TAB_FIND_ID);
    resetStates();
  };

  // 메인 다이얼로그 닫기
  const closeDialog = () => {
    setOpen(false);
    resetStates();
  };

  // 입력 값 변경 핸들러
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // 탭 변경 핸들러
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setUser(initialUserState);
  };

  // 서버 요청 함수
  const sendUser = async () => {
    try {
      const endpoint =
        tabValue === TAB_FIND_ID ? "member/findId" : "member/findPwd";
      const response = await apiNoToken.get(endpoint, { params: user });

      if (response.data) {
        if (tabValue === TAB_FIND_ID) {
          setFoundEmail(response.data);
          setShowEmailModal(true);
        } else {
          setShowPwdModal(true);
        }
      } else {
        alert("일치하는 사용자를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("오류 발생:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 이메일 모달 닫기 및 비밀번호 찾기 탭으로 이동
  const handleEmailModalClose = () => {
    setShowEmailModal(false);
    setTabValue(TAB_FIND_PWD);
    setUser({ ...initialUserState, email: foundEmail });
  };

  // 비밀번호 모달 닫기 및 재설정 페이지로 이동
  const handlePwdModalClose = () => {
    setShowPwdModal(false);
    navigate("/password-reset", { state: { email: user.email } });
    closeDialog();
  };

  return (
    <>
      <div className="assist">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            openDialog();
          }}
        >
          아이디 / 비밀번호 찾기
        </a>
      </div>

      <div className="go-signUp" onClick={() => navigate("/signUp")}>
        회원이 아니신가요? <a href="#">회원가입하기</a>
      </div>

      {/* 메인 다이얼로그 */}
      <Dialog open={open} onClose={closeDialog} maxWidth="xs" fullWidth>
        <DialogTitle>{TAB_LABELS[tabValue]}</DialogTitle>
        <DialogContent dividers>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            {TAB_LABELS.map((label, index) => (
              <Tab key={index} label={label} />
            ))}
          </Tabs>

          {/* 입력 필드 */}
          <TextField
            margin="dense"
            label="이름"
            name="name"
            value={user.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="전화번호"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            fullWidth
          />
          {tabValue === TAB_FIND_PWD && (
            <TextField
              margin="dense"
              label="이메일"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              fullWidth
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            취소
          </Button>
          <Button onClick={sendUser} variant="contained" color="primary">
            {TAB_LABELS[tabValue]}
          </Button>
        </DialogActions>
      </Dialog>

      {/* 이메일 모달 */}
      <EmailModal
        open={showEmailModal}
        onClose={() => {
          setShowEmailModal(false);
          closeDialog();
        }}
        foundEmail={foundEmail}
        onPasswordFind={handleEmailModalClose}
      />

      {/* 비밀번호 모달 */}
      <PwdModal
        open={showPwdModal}
        onClose={() => {
          setShowPwdModal(false);
          closeDialog();
        }}
        onPasswordReset={handlePwdModalClose}
      />
    </>
  );
};

export default SignLink;
