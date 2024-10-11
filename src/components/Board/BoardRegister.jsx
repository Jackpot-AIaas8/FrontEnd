// import React, { useState, useEffect } from "react";
// import apiClient from "../../token/AxiosConfig"; // apiClient 임포트
// import { useNavigate } from "react-router-dom";
// import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid"; // Grid 임포트
// import Container from "@mui/material/Container"; // Container 임포트
// import Typography from "@mui/material/Typography"; // Typography 임포트
// import "./css/BoardRegister.css"; // 필요 시 CSS 파일 추가

// const BoardRegister = () => {
//   const [title, setTitle] = useState(""); // 게시글 제목 상태
//   const [content, setContent] = useState(""); // 게시글 내용 상태
//   const [type, setType] = useState("2"); // 글 유형 상태 (2: 자유, 3: 문의)
//   const [currentDateTime, setCurrentDateTime] = useState(""); // 현재 시간 상태
//   const navigate = useNavigate(); // 페이지 이동을 위한 navigate

//   // 현재 시간과 날짜를 가져오는 함수
//   useEffect(() => {
//     const now = new Date();
//     const formattedDateTime = now.toISOString(); // 현재 시간을 ISO 형식으로 변환
//     setCurrentDateTime(formattedDateTime); // 상태 업데이트
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // 기본 폼 제출 방지

//     try {
//       const response = await apiClient.post("/board/register", {
//         title: title,
//         content: content,
//         type: type, // 글 유형 ('자유' -> 2, '문의' -> 3)
//         regDate: currentDateTime, // 현재 시간
//       });

//       console.log("게시글 작성 성공:", response.data);
//       alert("게시글이 저장되었습니다.");
//       if (response.data.status === 200) {
//         navigate("/freeBoard");
//       }
//     } catch (error) {
//       console.error(error.response ? error.response.data : error.message);
//     }
//   };

//   return (
//     <Container maxWidth="md">
//       {" "}
//       {/* Container로 감싸서 레이아웃 조정 */}
//       <Grid container spacing={2} alignItems="center" direction="column">
//         {" "}
//         {/* Grid 컨테이너 설정 */}
//         <Grid item>
//           <Typography variant="h4" gutterBottom>
//             게시글 작성
//           </Typography>{" "}
//           {/* 제목 설정 */}
//         </Grid>
//         <Grid item xs={12} sm={8}>
//           {" "}
//           {/* 게시글 폼의 너비 조정 */}
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={2}>
//               {" "}
//               {/* 내부 Grid 설정 */}
//               <Grid item xs={12}>
//                 <label>제목:</label>
//                 <input
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <label>내용:</label>
//                 <textarea
//                   value={content}
//                   onChange={(e) => setContent(e.target.value)}
//                   required
//                   style={{ width: "100%", minHeight: "100px" }} // 스타일 조정
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <label>글 유형:</label>
//                 <select
//                   value={type}
//                   onChange={(e) => setType(e.target.value)} // 글 유형 상태 업데이트
//                   required
//                 >
//                   <option value="2">자유</option>
//                   <option value="3">문의</option>
//                 </select>
//               </Grid>
//               <Grid item xs={12}>
//                 <Button type="submit" variant="contained" color="primary">
//                   게시글 등록
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default BoardRegister;

import React, { useState, useEffect } from "react";
import apiClient from "../../token/AxiosConfig";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button"; // Material-UI의 Button 컴포넌트
import "./css/BoardRegister.css";

const BoardRegister = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("2");
  const [currentDateTime, setCurrentDateTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date();
    const formattedDateTime = now.toISOString();
    setCurrentDateTime(formattedDateTime);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.post("/board/register", {
        title: title,
        content: content,
        type: type,
        regDate: currentDateTime,
      });

      console.log("게시글 작성 성공:", response.data);
      alert("게시글이 저장되었습니다.");
      if (response.data.status === 200) {
        navigate("/freeBoard");
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex flex-column align-center">
      <h2 className="text-left w-half">게시판 글 작성</h2>
      <form onSubmit={handleSubmit}>
        <div className="w-half m-auto"> {/* 부모 요소의 width 설정 */}
          <table className="board-table w-full"> {/* 테이블의 width 설정 */}
            <thead>
              <tr>
                <td style={{ width: "70%", borderTopLeftRadius: "8px" }}>
                  <input
                    className="w-eighty"
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </td>
                <td className='w-thirty' style={{ padding: "10px", borderTopRightRadius: "8px" }}>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                    style={{ width: "90%", height: "40px" }}
                  >
                    <option value="2">자유</option>
                    <option value="3">문의</option>
                  </select>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2} className="content-row">
                  <div className="text-left">아래에 글 작성</div>
                  <div className="text-right">
                    <Button
                      type="submit"
                      variant="contained"
                      className="save-button"
                    >
                      저장하기
                    </Button>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>
                  <textarea
                    className="w-full no-border-textarea"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    placeholder="내용"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default BoardRegister;
