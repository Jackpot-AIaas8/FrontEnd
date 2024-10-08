import React from 'react';
import Banner1 from "../components/Board/FreeBoardBanner"
import BoardEdit from "../components/Board/BoardEdit"; 
// import "../components/Board/css/BoardEdit.css";
import "../components/Board/css/FreeBoardBanner.css";
 
const BoardEditting = () => {
  return (
    <>
    <div className="banner-spacing-top">
      <Banner1 />
    </div>
    <div className='register-spacing-top'>
      <BoardEdit /> 
    </div>
    </>
  );
};
  
export default BoardEditting;
