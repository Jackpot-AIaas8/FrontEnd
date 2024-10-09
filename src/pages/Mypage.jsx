import React, { useState } from "react";

import { MypageWrapper, NavBar } from "../myPage/Mypage.styles";
const Mypage = () => {
  const [rank, setRank] = useState("브론즈");
  const [nickName, setNickName] = useState("jackpot");

  return (
    <>
      <div className="container flex">
        <MypageWrapper className="flex flex-row w-full">
          <NavBar className="left-section flex align-center justify-center">
            <div className="nav-section h-full flex flex-column">
              <div className="profile-area w-full"></div>
              <div className="navList-section">
                <ul className="nav-menu">
                  <li>
                    <a href="#section1">Section1</a>
                  </li>
                  <li>
                    <a href="#section2">Section2</a>
                  </li>
                  <li>
                    <a href="#section3">Section3</a>
                  </li>
                  <li>
                    <a href="#section4">Section4</a>
                  </li>
                </ul>
              </div>
            </div>
          </NavBar>

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
        </MypageWrapper>
      </div>
    </>
  );
};
export default Mypage;
