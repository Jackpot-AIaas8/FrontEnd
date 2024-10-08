// import React, { useState } from "react";
// import NavBar from "../components/Main/NavBar";
// import Banner1 from "../components/Board/FreeBoardBanner";
// import BoardSearchBox from "../components/Board/BoardSearchBox";
// import BoardList from "../components/Board/FreeBoardList";
// import MoveBoardRegisterButton from "../components/Board/MoveBoardRegisterButton";
// import "../config/Utility.css";
// import "../components/Board/css/FreeBoardBanner.css";


// function FreeBoardPage() {
//   const [keyword, setKeyword] = useState("");

//   const handleSearch = (newKeyword) => {
//     setKeyword(newKeyword);
//   };  

//     const [searchResults, setSearchResults] = useState([]);

//   return (
//     <>
//       <NavBar />
//       <div className="banner-spacing-top">
//         <Banner1 />
//       </div>
//       {/* <BoardSearchBox onSearch={handleSearch} /> */}
//       <BoardSearchBox setSearchResults={setSearchResults}/> 
//       <div className="banner-spacing-top2">
//         {/* <BoardList keyword={keyword} /> */}
//         <BoardList boards={searchResults} />
//       </div>
//       <div className="MoveBoardRegisterButton">
//       <MoveBoardRegisterButton />
//       </div>
//     </>
//   );
// }

// export default FreeBoardPage;


import React, { useState } from "react";
import NavBar from "../components/Main/NavBar";
import Banner1 from "../components/Board/FreeBoardBanner";
import BoardSearchBox from "../components/Board/BoardSearchBox";
import BoardList from "../components/Board/FreeBoardList";
import MoveBoardRegisterButton from "../components/Board/MoveBoardRegisterButton";
import "../config/Utility.css";
import "../components/Board/css/FreeBoardBanner.css";

function FreeBoardPage() {
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태

  return (
    <>
      <NavBar />
      <div className="banner-spacing-top">
        <Banner1 />
      </div>
      <BoardSearchBox setSearchResults={setSearchResults}/> 
      <div className="banner-spacing-top2">
        <BoardList boards={searchResults} /> {/* 검색 결과를 BoardList로 전달 */}
      </div>
      <div className="MoveBoardRegisterButton">
        <MoveBoardRegisterButton />
      </div>
    </>
  );
}

export default FreeBoardPage;
