import { useContext, useEffect, useState } from "react";
import logoImage from "../static/newLogoverticalOrange.png";
import { AuthContext } from "../token/AuthContext";
import MenuItem from "../myPage/MenuItem";
import { useNavigate } from "react-router-dom";
import {
  StyledNavBar,
  StyledProFileArea,
  StyledMypageMenu,
} from "./Mypage.styles";
import mockMypageData from "../myPage/MockMypageData";

const MypageLeftSection = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const { logout } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState("내프로필");
  const menuItems = [
    { href: "#1", text: "개인정보수정" },
    { href: "/shop/findList", text: "구매 내역" },
    { href: "#3", text: "취소/ 반품 / 환불 내역" },
    { href: "#4", text: "1:1 문의 내역" },
    { href: "#5", text: "펀딩내역" },
    { href: "/signOut", text: "로그아웃", onClick: logout }, // 로그아웃 항목에 onClick 설정
  ];
  const [member, setMember] = useState(
    {
      email: "",
      pwd: "",
      name: "",
      phone: "",
      nickName: "",
      address: "",
    } || {}
  );

  const handleMenuClick = (item) => {
    if (item.onClick) {
      item.onClick(); // 로그아웃 함수 호출
    } else {
      navigate(item.href); // 해당 페이지로 이동
      setCurrentPage(item.text); // 현재 페이지 상태 업데이트
    }
  };

  useEffect(() => {
    setMember(mockMypageData.member); // mock 데이터 불러오기
  }, []);
  return (
    <>
      <StyledNavBar className="left-section flex align-center justify-center flex-column">
        <div className="section-nav h-full flex flex-column">
          <div className="logoArea flex flex-row justify-start align-center">
            <a href="/" className="logo flex">
              <img
                className="logo-image"
                src={logoImage}
                alt="로고이미지"
                style={{ height: "50px", width: "auto" }}
              />
            </a>
            <a href="/myPage" className="logo_title flex">
              <h1 className="text">
                <span className="blind">MyPage</span>
              </h1>
            </a>
          </div>

          <StyledProFileArea className="flex flex-column w-full align-center justify-center">
            <div className="profile_inner">
              <div className="btn_photo photo">
                <img
                  src="https://static.nid.naver.com/images/web/user/default.png"
                  alt="프로필 이미지"
                />
              </div>
              <div className="profile">
                <p className="name">{member.name}</p>
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
    </>
  );
};

export default MypageLeftSection;
