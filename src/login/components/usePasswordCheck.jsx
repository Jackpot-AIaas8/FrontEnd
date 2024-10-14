import { useState, useEffect } from "react";

const usePasswordCheck = (password, confirmPassword) => {
  console.log(password);
  console.log(confirmPassword);
  const [checkMessage, setCheckMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setCheckMessage("비밀번호가 일치하지 않습니다.");
      setMessageColor("red");
    } else if (confirmPassword && password === confirmPassword) {
      setCheckMessage("비밀번호가 일치합니다.");
      setMessageColor("green");
    } else {
      setCheckMessage("");
    }
  }, [password, confirmPassword]);

  return { checkMessage, messageColor };
};

export default usePasswordCheck;
