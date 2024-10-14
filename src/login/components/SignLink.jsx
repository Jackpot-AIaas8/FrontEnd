import React, { useState, useRef, useEffect } from "react";
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

import {
  findId,
  sendAuthCode,
  verifyAuthCode,
  resetPassword,
} from "./memberAPI";

// 상수 정의
const initialUserState = {
  phone: "",
  name: "",
  email: "",
  authCode: "",
  password: "",
  confirmPassword: "",
};
const TAB_FIND_ID = 0;
const TAB_RESET_PWD = 1;
const TAB_LABELS = ["아이디 찾기", "비밀번호 재설정"];

// 아이디 찾기 결과 모달 컴포넌트
const EmailModal = ({ open, onClose, foundEmail, switchToResetPwdTab }) => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
    <DialogTitle>아이디 찾기 결과</DialogTitle>
    <DialogContent dividers>
      <p>가입하신 이메일은 다음과 같습니다:</p>
      <p style={{ fontWeight: "bold" }}>{foundEmail}</p>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary" variant="contained">
        닫기
      </Button>
      <Button onClick={switchToResetPwdTab} variant="outlined" color="primary">
        비밀번호 재설정으로 이동
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
  const [isAuthCodeSent, setIsAuthCodeSent] = useState(false);
  const [isAuthVerified, setIsAuthVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3분 = 180초
  const [sendAttempts, setSendAttempts] = useState(0);
  const timerRef = useRef(null);

  // 상태 초기화 함수
  const resetStates = () => {
    setUser(initialUserState);
    setIsAuthCodeSent(false);
    setIsAuthVerified(false);
    setTimeLeft(180); // 타이머 초기화
    clearInterval(timerRef.current); // 타이머 정지
  };

  // 다이얼로그 열기
  const openDialog = () => {
    setOpen(true);
    setTabValue(TAB_FIND_ID);
    resetStates();
  };

  // 다이얼로그 닫기
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
    resetStates();
  };

  const switchToResetPwdTab = () => {
    setShowEmailModal(false);
    setTabValue(TAB_RESET_PWD);
  };

  const handleFindId = async () => {
    try {
      const email = await findId(user);
      setFoundEmail(email);
      setShowEmailModal(true); // 모달 열기
    } catch (error) {
      alert("아이디를 찾을 수 없습니다.");
    }
  };

  useEffect(() => {
    if (isAuthCodeSent && timeLeft > 0) {
      timerRef.current = setInterval(
        () => setTimeLeft((prev) => prev - 1),
        1000
      );
    } else if (timeLeft === 0) {
      clearInterval(timerRef.current);
      alert("인증 시간이 만료되었습니다. 다시 시도해주세요.");
    }
    return () => clearInterval(timerRef.current);
  }, [isAuthCodeSent, timeLeft]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? `0${sec}` : sec}`;
  };

  const handleSendAuthCode = async () => {
    if (sendAttempts >= 3) {
      alert("인증 코드 전송 시도 횟수를 초과했습니다.");
      return;
    }

    await sendAuthCode(user.email);
    alert("인증 코드가 이메일로 전송되었습니다.");
    setIsAuthCodeSent(true);
    setSendAttempts((prev) => prev + 1);
    setTimeLeft(180); // 타이머 초기화
  };

  const handleVerifyAuthCode = async () => {
    try {
      await verifyAuthCode(user.email, user.authCode);
      alert("인증이 완료되었습니다.");
      setIsAuthVerified(true);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleResetPassword = async () => {
    if (user.password !== user.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      await resetPassword(user.email, user.password);
      alert("비밀번호가 성공적으로 변경되었습니다.");
      navigate("/signIn");
      closeDialog();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="assist">
        <Button
          onClick={(e) => {
            e.preventDefault();
            openDialog();
          }}
        >
          아이디 / 비밀번호 찾기
        </Button>
      </div>

      <div className="go-signUp" onClick={() => navigate("/signUp")}>
        회원이 아니신가요? <a>회원가입하기</a>
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
          {tabValue === TAB_FIND_ID && (
            <>
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
            </>
          )}

          {tabValue === TAB_RESET_PWD && (
            <>
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
                label="이메일"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                fullWidth
                disabled={isAuthCodeSent || isAuthVerified}
              />

              <Button
                onClick={handleSendAuthCode}
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "10px" }}
                disabled={sendAttempts >= 3}
              >
                {sendAttempts > 0 ? "재전송" : "인증번호 받기"}
              </Button>
              {isAuthCodeSent && (
                <>
                  <TextField
                    margin="dense"
                    label="인증번호"
                    name="authCode"
                    value={user.authCode}
                    onChange={handleChange}
                    fullWidth
                  />
                  <Button
                    onClick={handleVerifyAuthCode}
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: "10px" }}
                  >
                    인증번호 인증
                  </Button>

                  <p>남은 시간: {formatTime(timeLeft)}</p>
                </>
              )}

              {isAuthVerified && (
                <>
                  <TextField
                    margin="dense"
                    label="새 비밀번호"
                    name="password"
                    type="password"
                    value={user.password}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    margin="dense"
                    label="비밀번호 확인"
                    name="confirmPassword"
                    type="password"
                    value={user.confirmPassword}
                    onChange={handleChange}
                    fullWidth
                  />
                  <Button
                    onClick={handleResetPassword}
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: "10px" }}
                  >
                    비밀번호 변경
                  </Button>
                </>
              )}
            </>
          )}
        </DialogContent>
        {tabValue === TAB_FIND_ID && (
          <DialogActions>
            <Button onClick={closeDialog} color="primary">
              취소
            </Button>
            <Button onClick={handleFindId} variant="contained" color="primary">
              아이디 찾기
            </Button>
          </DialogActions>
        )}
      </Dialog>

      {/* 아이디 찾기 결과 모달 */}
      <EmailModal
        open={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        foundEmail={foundEmail}
        switchToResetPwdTab={switchToResetPwdTab}
      />
    </>
  );
};

export default SignLink;
