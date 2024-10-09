import React from 'react';
import BoardFindOne from "../components/Board/BoardFindOne";
import Banner3 from "../static/Banner3mod.png";
import "../components/Board/css/FreeBoardBanner.css";
 
const BoardFindOnePage = () => {
  return (
    <>
    <div className='banner-spacing-top'>
    <img src={Banner3} alt="글 조회하기 배너" style={{ width: '50%', margin:'0 auto', position: 'relative' }} /> 
    </div>
    <div className='banner-spacing-below'>
      <BoardFindOne />
      </div>
      </>
  );
};
  
export default BoardFindOnePage;
