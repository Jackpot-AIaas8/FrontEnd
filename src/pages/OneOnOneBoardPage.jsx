import React, { useState } from "react";
import NavBar from "../components/Main/NavBar";
import Banner2 from "../components/Board/OneOnOneBoardBanner";
import BoardSearchBox from "../components/Board/BoardSearchBox";
import BoardList from "../components/Board/OneOnOneBoardList";
import MoveBoardRegisterButton from "../components/Board/MoveBoardRegisterButton";
import "../config/Utility.css";
import "../components/Board/css/FreeBoardBanner.css";

function OneOnOneBoardPage() {
  const [keyword, setKeyword] = useState("");

  const handleSearch = (newKeyword) => {
    setKeyword(newKeyword);
  };

  return (
    <>
      <NavBar />
      <div className="banner-spacing-top">
        <Banner2 />
      </div>
      <BoardSearchBox onSearch={handleSearch} />
      <div className="banner-spacing-top2">
        <BoardList keyword={keyword} />
      </div>
      <div className="MoveBoardRegisterButton">
      <MoveBoardRegisterButton />
      </div>
    </>
  );
}

export default OneOnOneBoardPage;
