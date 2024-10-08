import React, {useEffect, useState} from "react";

import "../login/CSS/Login.css";
import {Snackbar} from "@mui/material";
import InputField from "../login/components/InputField";
import SocialLogin from "../login/components/SocialLogin";
import {Link, useNavigate} from "react-router-dom";
import {apiNoToken} from "../token/AxiosConfig";

const SignUp = () => {
    const navigate = useNavigate();

    const [confirmPassword, setConfirmPassword] = useState("");
    const [checkMessage, setCheckMessage] = useState("");
    const [messageColor, setMessageColor] = useState("");

    const [duplicateMessage, setDuplicateMessage] = useState("");

    const [isEmailChecked, setIsEamilChecked] = useState(false);
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

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    };

    const handlePasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    useEffect(() => {
        if (confirmPassword && formData.pwd !== confirmPassword) {
            setCheckMessage("비밀번호가 일치하지 않습니다.");
            setMessageColor("red");
        } else if (confirmPassword && formData.pwd === confirmPassword) {
            setCheckMessage("비밀번호가 일치합니다.");
            setMessageColor("green");
        } else {
            setCheckMessage("");
        }
    }, [confirmPassword, formData.pwd]);

    const checkNickName = async (event) => {
        event.preventDefault();
        if (!formData.nickName) {
            return alert("닉네임을 입력해주세요");
        }
        try {
            const response = await apiNoToken.get(`member/checkNickName`, {
                params: {nickName: formData.nickName},
            });

            // 200 OK 응답일 경우 처리
            const nickNameIsDuplicate = response.data.isDuplicate;
            setIsNickNameChecked(!nickNameIsDuplicate);
            setDuplicateMessage("사용 가능한 닉네임입니다.");
            setOpen(true);
        } catch (error) {
            // 409 Conflict 에러일 경우 처리
            if (error.response && error.response.status === 409) {
                const isDuplicate = error.response.data.isDuplicate; // 서버로부터 받은 isDuplicate 값 확인
                if (isDuplicate) {
                    setDuplicateMessage("이미 사용 중인 닉네임입니다.");
                } else {
                    setDuplicateMessage("오류가 발생했습니다. 다시 시도해주세요.");
                }
                setIsNickNameChecked(false); // 중복된 닉네임이므로 false로 설정
                setOpen(true); // Snackbar 열기
            } else {
                // 기타 오류 처리
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
                params: {email: formData.email},
            });

            const emailIsDuplicate = response.data.isDuplicate;
            setIsEamilChecked(!emailIsDuplicate);
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
                setIsEamilChecked(false);
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
                navigate("/signIn", {state: {email: response.data}});
            }
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

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
                    <InputField
                        type="password"
                        name="pwd"
                        placeholder="비밀번호"
                        value={formData.pwd}
                        onChange={handleChange}
                    />
                    <InputField
                        type="password"
                        name="confirmPassword"
                        placeholder="비밀번호 확인"
                        value={confirmPassword}
                        onChange={handlePasswordChange}
                    />
                    {checkMessage && (
                        <p style={{color: messageColor}}>{checkMessage}</p>
                    )}
                    <InputField
                        type="tel"
                        name="phone"
                        placeholder="전화번호"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        name="name"
                        placeholder="이름"
                        value={formData.name}
                        onChange={handleChange}
                    />
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
                    <InputField
                        type="test"
                        name="address"
                        placeholder="주소"
                        value={formData.address}
                        onChange={handleChange}
                    />

                    <input
                        className="button btn_sign"
                        type="submit"
                        value="Sign Up"
                        disabled={!isEmailChecked || !isNickNameChecked}
                    />
                </form>
                <div className="go-signUp">
                    계정이 있으신가요?{""}
                    <Link to="/signIn">로그인하기</Link>
                </div>
                <SocialLogin/>
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
