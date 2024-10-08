import React from "react";
import BoardCustomerCenterMoveButton from "./BoardCustomerCenterMoveButton";
import Banner1 from "../../static/Banner1.png";
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
          navigate("/oneOnOneBoard");
        }}
      >
        1:1 문의 게시판으로 가기 →
      </Button>
      <div className="banner-container relative banner-margin-0">
        <img
          src={Banner1}
          alt="자유게시판 배너 이미지"
          className="banner-img"
        />
        <h2 className="banner-text absolute">자유게시판</h2>
        <span className="banner-description absolute">
          자유롭게 글을 쓰는 곳입니다.
        </span>
        <section>
          <BoardCustomerCenterMoveButton />
        </section>
      </div>
    </div>
  );
};

export default FreeBoardBanner;
