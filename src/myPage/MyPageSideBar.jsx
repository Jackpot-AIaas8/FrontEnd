import { useContext, useState } from "react";
import logoImage from "../static/newLogoverticalOrange.png";
import { AuthContext } from "../token/AuthContext";

import { StyledNavBar } from "./Mypage.styles";

const MypageLeftSection = () => {
  const { logout } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState("all");
  const sections = [
    { id: "info", label: "개인정보수정" },
    { id: "purchase", label: "구매 내역" },
    { id: "cancel", label: "취소/반품/환불 내역" },
    { id: "inquiry", label: "1:1 문의 내역" },
    { id: "funding", label: "펀딩내역" },
  ];

  const handleSectionChange = (section) => {
    if (section === "logout") {
      logout();
    } else {
      setCurrentPage(section); // 현재 페이지 상태 업데이트
    }
  };

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

          <>
            <div className="profile_inner flex flex-column align-center justify-center">
              <div className="btn_photo photo w-full">
                <img
                  src="https://static.nid.naver.com/images/web/user/default.png"
                  alt="프로필 이미지"
                />
              </div>
              <div className="profile">
                <p className="name">name</p>
                <p className="usemail">get Email@naver.com</p>
              </div>
            </div>
          </>

          <>
            <ul className="menu_list">
              {/* nav바 버튼 반복 */}
              {sections.map((section) => (
                <li
                  key={section.id}
                  className={`btn_menu menu_item ${
                    currentPage === section.id ? "active" : ""
                  }`}
                  onClick={() => handleSectionChange(section.id)}
                >
                  <h2>{section.label}</h2>
                </li>
              ))}
              <li
                className="btn_menu menu_item"
                onClick={() => {
                  handleSectionChange("logout");
                }}
              >
                <h2>로그아웃</h2>
              </li>
            </ul>
          </>
        </div>
      </StyledNavBar>
    </>
  );
};

export default MypageLeftSection;