import React from 'react';
import BoardRegister from "../components/Board/BoardRegister"; 
import Banner4 from "../static/Banner4mod.png";
import "../components/Board/css/BoardRegister.css";
import "../components/Board/css/FreeBoardBanner.css";
 
const BoardRegistering = () => {
  return (
    <>
    <div className="banner-spacing-top">
    <img src={Banner4} alt="글 조회하기 배너" style={{ width: '60%', margin:'0 auto', position: 'relative' }} /> 
    </div>
    <div className='register-spacing-top'>
      <BoardRegister /> 
    </div>
    </>
  );
};
  
export default BoardRegistering;
