import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const MypagePwModal = ({ open, onClose, onConfirm }) => {
  const [password, setPassword] = useState("");

  const handleConfirm = () => {
    onConfirm(password);
    setPassword("");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>비밀번호 확인</DialogTitle>
      <DialogContent>
        <TextField
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
        <Button onClick={onClose} color="primary">
          닫기
        </Button>
        <Button onClick={handleConfirm} color="primary">
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MypagePwModal;
