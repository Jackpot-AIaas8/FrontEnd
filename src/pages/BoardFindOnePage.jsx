import React from 'react';
import BoardFindOne from "../components/Board/BoardFindOne";
import Banner3 from "../components/Board/BoardFindOneBanner";
import "../components/Board/css/FreeBoardBanner.css";
 
const BoardFindOnePage = () => {
  return (
    <>
    <div className='banner-spacing-top'>
    <Banner3/>
    </div>
    <div className='banner-spacing-below'>
      <BoardFindOne /> {/* 게시글 상세 컴포넌트 호출 */}
      </div>
      </>
  );
};
  
export default BoardFindOnePage;
