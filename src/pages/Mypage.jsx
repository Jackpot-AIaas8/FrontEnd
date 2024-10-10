import React, { useState } from "react";
import logoImage from "../static/newLogoHorizontalOrange.png";
import {
  StyledMypageWrapper,
  StyledNavBar,
  StyledProFileArea,
  StyledMypageMenu,
} from "../myPage/Mypage.styles";
import MenuItem from "../myPage/MenuItem";
const Mypage = () => {
  const [rank, setRank] = useState("브론즈");
  const [nickName, setNickName] = useState("jackpot");
  // MenuItems.section
  const [currentPage, setCurrentPage] = useState('내프로필');
  const menuItems = [
    { href: '#1', text: '펀딩 내역' },
    { href: '#2', text: '구매 내역' },
    { href: '#3', text: '취소/ 반품 / 환불 내역' },
    { href: '#4', text: '1:1 문의 내역' },
    { href: '#5', text: '개인정보수정' },
    { href: '#6', text: '로그아웃' },   

  ];

  const handleMenuClick = (pageName) => {
    setCurrentPage(pageName);
  }

  return (
    <>
      <div className="container flex">
        <StyledMypageWrapper className="flex flex-row w-full">
          <StyledNavBar className="left-section flex align-center justify-center flex-column">
            <div className="nav-section h-full flex flex-column">
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
                    <p className="nickName">get NincName</p>
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
                  {menuItems.map((item) =>
                    <MenuItem 
                      key={item.text}
                      href={item.href}
                      text={item.text}
                      isActive={currentPage === item.text}
                      onClick={() => handleMenuClick(item.text)}
                      >
                    </MenuItem>
                  )}
                </ul>
              </StyledMypageMenu>
            </div>
          </StyledNavBar>

          <div className="right-section flex flex-column">
            <div className="membership-rank-section flex align-start  justify-center">
              <div className="flex flex-column align-start">
                <h2>
                  {nickName}님의 회원 등급은 {rank}입니다.{" "}
                </h2>
                <h3>마일리지는XXXX원입니다.</h3>
              </div>
              <div className="flex"></div>
            </div>
            <div className="funding-details-section flex"></div>
            <div className="buying-details-section flex"></div>
          </div>
        </StyledMypageWrapper>
      </div>
    </>
  );
};
export default Mypage;
