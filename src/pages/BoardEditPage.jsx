import React from 'react';
import Banner5 from "../static/Banner5mod.png";
import BoardEdit from "../components/Board/BoardEdit"; 
// import "../components/Board/css/BoardEdit.css";
import "../components/Board/css/FreeBoardBanner.css";
 
const BoardEditting = () => {
  return (
    <>
    <div className="banner-spacing-top">
    <img src={Banner5} alt="글 조회하기 배너" style={{ width: '60%', margin:'0 auto', position: 'relative' }} /> 
    </div>
    <div className='register-spacing-top'>
      <BoardEdit /> 
    </div>
    </>
  );
};
  
export default BoardEditting;
