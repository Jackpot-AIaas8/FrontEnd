import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import apiClient from "../token/AxiosConfig";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const MypagePwModal = ({ open, onClose }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleConfirm = async () => {
    try {
      const response = await apiClient.get("member/checkPwd", {
        params: { pwd: password },
      });

      if (response.status === 200 && response.data === true) {
        navigate("/mypage");
      } else {
        alert("비밀번호가 틀립니다.");
      }
    } catch (error) {
      console.error("비밀번호 확인 오류:", error);
      alert("비밀번호 확인에 실패했습니다.");
    } finally {
      setPassword("");
      onClose();
    }
  };

  const handleClose = () => {
    setPassword("");
    onClose();
    navigate(-1); //닫기 버튼 누르면 이전페이지로 가게 해놓음
  };

  // 버튼 색상 바꾸는 변수
  const OrangeButton = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    backgroundColor: "#ff7600",
    "&:hover": {
      backgroundColor: "#d64229",
    },
  }));

  // 이건 그 입력창 아웃라인 색상 주황색으로 바꾸는거
  const OrangeTextField = styled(TextField)(({ theme }) => ({
    "& .MuiInputLabel-root": {
      color: "#ff7600",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#ff7600",
      },
      "&:hover fieldset": {
        borderColor: "#d64229",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ff7600",
      },
    },
  }));

  //이건 맨 위 '비밀번호 확인' 텍스트 색상 바꾸는거
  const OrangeDialogTitle = styled(DialogTitle)(({ theme }) => ({
    color: "#ff7600",
  }));

  return (
    <Dialog open={open} onClose={onClose}>
      <OrangeDialogTitle>
        <LockOutlinedIcon
          style={{ marginRight: "8px", marginTop: "8px", color: "#ff7600" }}
        />
        비밀번호 확인
      </OrangeDialogTitle>
      <DialogContent>
        <OrangeTextField
          autoFocus
          margin="dense"
          label="비밀번호"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <OrangeButton onClick={handleClose}>닫기</OrangeButton>
        <OrangeButton onClick={handleConfirm}>확인</OrangeButton>
      </DialogActions>
    </Dialog>
  );
};

export default MypagePwModal;
