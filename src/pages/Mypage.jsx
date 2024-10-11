import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../static/newLogoHorizontalOrange.png";
import MockMypageData from "../myPage/MockMypageData";
import {
  StyledMypageWrapper,
  StyledNavBar,
  StyledProFileArea,
  StyledMypageMenu,
  StyeldRightSection,
} from "../myPage/Mypage.styles";

import MenuItem from "../myPage/MenuItem";
import { AuthContext } from "../token/AuthContext";
import mockMypageData from "../myPage/MockMypageData";

const Mypage = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [rank, setRank] = useState("브론즈");
  const [nickName, setNickName] = useState();
  // MenuItems.section
  const [currentPage, setCurrentPage] = useState("내프로필");
  const menuItems = [
    { href: "#1", text: "개인정보수정" },
    { href: "#2", text: "구매 내역" },
    { href: "#3", text: "취소/ 반품 / 환불 내역" },
    { href: "#4", text: "1:1 문의 내역" },
    { href: "#5", text: "펀딩내역" },
    { href: "/signOut", text: "로그아웃", onClick: logout }, // 로그아웃 항목에 onClick 설정
  ];

  const handleMenuClick = (item) => {
    if (item.onClick) {
      item.onClick(); // 로그아웃 함수 호출
    } else {
      navigate(item.href); // 해당 페이지로 이동
      setCurrentPage(item.text); // 현재 페이지 상태 업데이트
    }
  };
  return (
    <>
      <div className="container flex justify-center">
        <StyledMypageWrapper className="flex flex-row">
          <StyledNavBar className="left-section flex align-center justify-center flex-column">
            <div className="section-nav h-full flex flex-column">
              <div className="logoArea flex flex-row justify-start align-center">
                <a href="/" className="logo flex">
                  <img className="logo-image" src={logoImage} alt="" />
                </a>
                <a href="/myPage" className="logo_title flex">
                  <h1 className="text">
                    <span className="blind">MyPage</span>
                  </h1>
                </a>
              </div>

              <StyledProFileArea className="flex flex-column w-full align-center justify-center">
                <div className="profile_inner">
                  <a href="#" className="photo">
                    <img
                      src="https://static.nid.naver.com/images/web/user/default.png"
                      alt="프로필 이미지"
                    />
                    <span className="photo_edit"></span>
                  </a>
                  <div className="profile">
                    <p className="nickName">{mockMypageData.member.nickName}</p>
                    <p className="usemail">get Email@naver.com</p>
                  </div>
                </div>
              </StyledProFileArea>

              <StyledMypageMenu
                role="menu"
                className="flex flex-column align-start justify-center "
              >
                <ul className="menu_list flex flex-column">
                  {/* nav바 버튼 반복 */}
                  {menuItems.map((item) => (
                    <MenuItem
                      key={item.text}
                      href={item.href}
                      text={item.text}
                      isActive={currentPage === item.text}
                      onClick={() => handleMenuClick(item)}
                    ></MenuItem>
                  ))}
                </ul>
              </StyledMypageMenu>
            </div>
          </StyledNavBar>

          <StyeldRightSection className="right-section flex flex-column ">
            <div className="section-mypage flex align-start justify-start w-full">
              <div className="flex flex-column align-start w-full">
                <a href="#1" className="title">
                  <h2 className="title_text">내프로필</h2>
                </a>

                <ul className="div-section flex flex-column align-start w-full">
                  <li>
                    <h2>
                      {nickName}님의 회원 등급은 {rank}입니다.{" "}
                    </h2>
                  </li>
                  <li>
                    <h3>마일리지는getMilage원입니다.</h3>
                  </li>
                  {Object.entries(mockMypageData.member).map(([key, value]) => (
                    <li
                      key={key}
                      className="div_list flex flex-row justify-between w-full"
                    >
                      <div className="row_item flex flex-row justify-between w-full">
                        <span className="item_text">{`${key}: ${value}`}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex"></div>
            </div>
            <div className="section-mypage flex w-full"></div>
            <div className="section-mypage flex w-full"></div>
          </StyeldRightSection>
        </StyledMypageWrapper>
      </div>
    </>
  );
};
export default Mypage;
