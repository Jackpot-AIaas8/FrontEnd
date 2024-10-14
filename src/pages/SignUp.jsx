import React, { useEffect, useState } from "react";
import "../login/CSS/Login.css";
import { Snackbar } from "@mui/material";
import InputField from "../login/components/InputField";
import SocialLogin from "../login/components/SocialLogin";
import { Link, useNavigate } from "react-router-dom";
import { apiNoToken } from "../token/AxiosConfig";
import usePasswordCheck from "../login/components/usePasswordCheck";

const SignUp = () => {
  const navigate = useNavigate();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [duplicateMessage, setDuplicateMessage] = useState("");
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isNickNameChecked, setIsNickNameChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    pwd: "",
    phone: "",
    name: "",
    nickName: "",
    address: "",
  });

  // 추가된 상태: 유효성 검사 결과를 저장합니다.
  const [validations, setValidations] = useState({
    email: false,
    pwd: false,
    confirmPassword: false,
    phone: false,
    name: false,
    nickName: false,
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const { checkMessage, messageColor } = usePasswordCheck(
    formData.pwd,
    confirmPassword
  );

  const checkNickName = async (event) => {
    event.preventDefault();
    if (!formData.nickName) {
      return alert("닉네임을 입력해주세요");
    }
    try {
      const response = await apiNoToken.get(`member/checkNickName`, {
        params: { nickName: formData.nickName },
      });

      const nickNameIsDuplicate = response.data.isDuplicate;
      setIsNickNameChecked(!nickNameIsDuplicate);
      setDuplicateMessage("사용 가능한 닉네임입니다.");
      setOpen(true);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        const isDuplicate = error.response.data.isDuplicate;
        if (isDuplicate) {
          setDuplicateMessage("이미 사용 중인 닉네임입니다.");
        } else {
          setDuplicateMessage("오류가 발생했습니다. 다시 시도해주세요.");
        }
        setIsNickNameChecked(false);
        setOpen(true);
      } else {
        console.error("닉네임 중복 확인 오류:", error);
        setDuplicateMessage("서버에 문제가 발생했습니다. 다시 시도해주세요.");
        setOpen(true);
      }
    }
  };

  const checkEmail = async (event) => {
    event.preventDefault();
    if (!formData.email) {
      return alert("이메일을 입력해주세요");
    }

    try {
      const response = await apiNoToken.get("member/checkEmail", {
        params: { email: formData.email },
      });

      const emailIsDuplicate = response.data.isDuplicate;
      setIsEmailChecked(!emailIsDuplicate);
      setDuplicateMessage("사용 가능한 이메일입니다.");
      setOpen(true);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        const isDuplicate = error.response.data.isDuplicate;
        if (isDuplicate) {
          setDuplicateMessage("이미 사용 중인 이메일입니다.");
        } else {
          setDuplicateMessage("오류가 발생했습니다. 다시 시도해주세요.");
        }
        setIsEmailChecked(false);
        setOpen(true);
      } else {
        console.error("이메일 중복 확인 오류:", error);
        setDuplicateMessage("서버에 문제가 발생했습니다. 다시 시도해주세요.");
        setOpen(true);
      }
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await apiNoToken.post("member/signUp", formData);

      if (response.status === 201) {
        navigate("/signIn", { state: { email: response.data } });
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  // 추가된 유효성 검사 함수들
  const validatePhoneNumber = (phone) => /^\d+$/.test(phone);
  const validatePassword = (password) =>
    /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.{8,20}$)/.test(password);
  const validateName = (name) => /^[a-zA-Z가-힣]+$/.test(name);
  const validateNickname = (nickName) =>
    nickName.length >= 3 && nickName.length <= 10;

  // formData 또는 confirmPassword가 변경될 때마다 유효성 검사를 수행합니다.
  useEffect(() => {
    setValidations({
      email: isEmailChecked, // 이메일 중복 체크 결과 사용
      pwd: validatePassword(formData.pwd),
      confirmPassword: formData.pwd === confirmPassword,
      phone: validatePhoneNumber(formData.phone),
      name: validateName(formData.name),
      nickName: isNickNameChecked, // 닉네임 중복 체크 결과 사용
    });
  }, [formData, confirmPassword, isEmailChecked, isNickNameChecked]);

  // 모든 유효성 검사가 통과되었는지 확인합니다.
  const isFormValid = Object.values(validations).every(Boolean);

  return (
    <div className="wrapper">
      <div className="login-container">
        <div className="heading">Sign In</div>
        <form onSubmit={onSubmitHandler} className="form">
          <div className="check-container">
            <InputField
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className="button"
              type="button"
              value="이메일 중복검사"
              onClick={checkEmail}
            />
          </div>
          {!validations.email && formData.email && (
            <p style={{ color: "red" }}>이메일 중복 검사를 해주세요.</p>
          )}
          <InputField
            type="password"
            name="pwd"
            placeholder="비밀번호"
            value={formData.pwd}
            onChange={handleChange}
          />
          {!validations.pwd && formData.pwd && (
            <p style={{ color: "red" }}>
              비밀번호는 8~20자 사이여야 하며 특수기호가 포함되어야 합니다.
            </p>
          )}
          <InputField
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={handlePasswordChange}
          />
          {!validations.confirmPassword && confirmPassword && (
            <p style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</p>
          )}
          {checkMessage && (
            <p style={{ color: messageColor }}>{checkMessage}</p>
          )}
          <InputField
            type="tel"
            name="phone"
            placeholder="전화번호"
            value={formData.phone}
            onChange={handleChange}
          />
          {!validations.phone && formData.phone && (
            <p style={{ color: "red" }}>
              핸드폰 번호는 숫자만 입력 가능합니다.
            </p>
          )}
          <InputField
            type="text"
            name="name"
            placeholder="이름"
            value={formData.name}
            onChange={handleChange}
          />
          {!validations.name && formData.name && (
            <p style={{ color: "red" }}>이름은 글자만 입력 가능합니다.</p>
          )}
          <div className="check-container">
            <InputField
              type="text"
              name="nickName"
              placeholder="닉네임"
              value={formData.nickName}
              onChange={handleChange}
            />
            <input
              className="button"
              type="button"
              value="닉네임 중복검사"
              onClick={checkNickName}
            />
          </div>
          {!validations.nickName && formData.nickName && (
            <p style={{ color: "red" }}>닉네임 중복 검사를 해주세요.</p>
          )}
          <InputField
            type="text"
            name="address"
            placeholder="주소"
            value={formData.address}
            onChange={handleChange}
          />

          <input
            className="button btn_sign"
            type="submit"
            value="Sign Up"
            disabled={!isFormValid}
          />
        </form>
        <div className="go-signUp">
          계정이 있으신가요? <Link to="/signIn">로그인하기</Link>
        </div>
        <SocialLogin />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message={duplicateMessage}
      />
    </div>
  );
};

export default SignUp;
