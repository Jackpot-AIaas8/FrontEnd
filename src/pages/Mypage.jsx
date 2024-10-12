import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../static/newLogoverticalOrange.png";
import MockMypageData from "../myPage/MockMypageData";
import {
  StyledMypageWrapper,
  StyledNavBar,
  StyledProFileArea,
  StyledMypageMenu,
  StyeldRightSection,
  StyledProfileContainer,
  StyledProfileInfo,
  StyledImage,
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
                  <img className="logo-image" src={logoImage} alt="로고이미지" style={{ height: '50px', width: 'auto'}} />
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
                  </a>
                  <div className="profile">
                    <p className="name">{mockMypageData.member.name}</p>
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
                    />  
                  ))}
                </ul>
              </StyledMypageMenu>
            </div>
          </StyledNavBar>

          <StyeldRightSection className="right-section flex flex-column w-full ">
            <div className="section-mypage flex align-start justify-start w-full">
              <StyledProfileContainer className="flex flex-row justify-between w-full">
                <div className="profile-details flex align-center">
                  <a href="#2" onClick={() => alert("정보 수정")}>
                    <StyledImage className="flex w-full">
                      <img
                        src="https://static.nid.naver.com/images/web/user/default.png"
                        alt="프로필 이미지"
                      />
                    </StyledImage>
                  </a>
                  <StyledProfileInfo className="flex flex-column align-start">
                    <p>{mockMypageData.member.nickName} 님 안녕하세요.</p>
                    <p>
                      당신의 등급은{" "}
                      <span>
                        <b>{rank}</b>
                      </span>
                      입니다.
                    </p>
                  </StyledProfileInfo>
                </div>
                <div className="point-view text-center flex align-center">
                  <a href="/shop_mypage/?m2=point_list">
                    <p>누적금액</p>
                    <span>XXXX</span>
                  </a>
                </div>
              </StyledProfileContainer>
            </div>

            <div className="section-mypage flex w-full">
              구매내역
  <table>
    <thead>
      <tr>
        <th>상품 ID</th>
        <th>상품명</th>
        <th>디테일</th>
        <th>카테고리</th>
        <th>가격</th>
        <th>리뷰보기</th>
        <th>장바구니 담기</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>001</td>
        <td>강아지 사료</td>
        <td>디테일</td>
        <td>식자재</td>
        <td>30,000원</td>
        <td><a href="">리뷰보기</a></td>
        <td><button onClick={() => alert("장바구니에 담겼습니다.")}>장바구니 담기</button></td>
      </tr>
      {/* 아래 부분처럼 샵디티오에서 데이터 받아오면 될듯 */}
      {/* <tr key={shopDTO.shopId}>
            <td>{shopDTO.shopId}</td>
            <td>{shopDTO.name}</td>
           <td>{shopDTO.detail}</a></td>
           <td>{shopDTO.category}</td>
            <td>{shopDTO.price}</td>
            <td><Link
              to={`/mypage/${reviewDTO.reviewId}`}
              style={{ textDecoration: "none", color: "black" }}
                  >
                리뷰보기
            </Link>
        </td>
        <td><button onClick={() => alert("장바구니에 담겼습니다.")}>장바구니 담기</button></td>
      </tr> */}
           </tbody>
         </table>
        </div>
            <div className="section-mypage flex w-full"></div>
          </StyeldRightSection>
        </StyledMypageWrapper>
      </div>
    </>
  );
};
export default Mypage;
