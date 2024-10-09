import React from "react";
import BoardCustomerCenterMoveButton from "./BoardCustomerCenterMoveButton";
import Banner1 from "../../static/Banner2mod.png";
import "../../config/Utility.css";
import "./css/FreeBoardBanner.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const FreeBoardBanner = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-column">
      <Button
        className="oneOnOneButton fixed"
        variant="text"
        onClick={() => {
          navigate("/freeBoard");
        }}
      >
        자유게시판으로 가기 →
      </Button>
      <div className="relative banner-margin-0">
        <img src={Banner1} alt="1:1 문의 게시판 배너 이미지" />
        {/* <h2 className="banner-text absolute">1:1 문의 게시판</h2>
        <span className="banner-description absolute">
          문의사항을 작성하는 곳입니다.
        </span> */}
        <section>
          <BoardCustomerCenterMoveButton />
        </section>
      </div>
    </div>
  );
};

export default FreeBoardBanner;
