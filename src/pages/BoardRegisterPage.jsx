import React from 'react';
import Banner1 from "../components/Board/FreeBoardBanner"
import BoardRegister from "../components/Board/BoardRegister"; 
import "../components/Board/css/BoardRegister.css";
import "../components/Board/css/FreeBoardBanner.css";
 
const BoardRegistering = () => {
  return (
    <>
    <div className="banner-spacing-top">
      <Banner1 />
    </div>
    <div className='register-spacing-top'>
      <BoardRegister /> 
    </div>
    </>
  );
};
  
export default BoardRegistering;
