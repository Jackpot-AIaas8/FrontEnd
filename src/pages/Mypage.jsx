import React from "react";

import { MypageWrapper } from "../myPage/Mypage.styles";
const Mypage = () => {
  return (
    <>
      <div className="container flex">
        <MypageWrapper className="flex flex-column w-full">
          <div className="membership-rank-section flex"></div>
          <div className="funding-details-section flex"></div>
          <div className="buying-details-section flex"></div>
        </MypageWrapper>
      </div>
    </>
  );
};
export default Mypage;
