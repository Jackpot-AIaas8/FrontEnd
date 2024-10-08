import React, { useState, useEffect } from "react";
import apiClient from "../../token/AxiosConfig"; // apiClient 임포트
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid"; // Grid 임포트
import Container from "@mui/material/Container"; // Container 임포트
import Typography from "@mui/material/Typography"; // Typography 임포트
// import "./css/BoardEdit.css";

const BoardEdit = () => {
  const { boardId } = useParams(); // URL에서 게시글 ID를 받아옴
  const [title, setTitle] = useState(""); // 게시글 제목 상태
  const [content, setContent] = useState(""); // 게시글 내용 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate
  const [currentDateTime, setCurrentDateTime] = useState(""); // 현재 시간 상태

  // 현재 시간과 날짜를 가져오는 함수
  useEffect(() => {
    const now = new Date();
    const formattedDateTime = now.toISOString(); // 현재 시간을 ISO 형식으로 변환
    setCurrentDateTime(formattedDateTime); // 상태 업데이트
  }, []);

  // 기존 게시글 데이터를 가져오는 함수
  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await apiClient.get("board/findOne", {
          params: { boardId: boardId },
        });
        const board = response.data;
        setTitle(board.title); // title 값을 설정
        setContent(board.content); // content 값을 설정
      } catch (error) {
        console.error("게시글 데이터를 가져오는 중 에러:", error);
      }
    };

    fetchBoardData();
  }, [boardId]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지

    try {
      const response = await apiClient.post(`/board/edit/${boardId}`, {
        title: title,
        content: content,
        regDate: currentDateTime, // 현재 시간
      });

      console.log("게시글 수정 성공:", response.data);
      if (response.status === 200) {
        navigate(`/board/findOne/${boardId}`); // 수정 후 해당 게시글로 이동
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  return (
    <Container maxWidth="md">
      {" "}
      {/* Container로 감싸서 레이아웃 조정 */}
      <Grid container spacing={2} alignItems="center" direction="column">
        {" "}
        {/* Grid 컨테이너 설정 */}
        <Grid item>
          <Typography variant="h4" gutterBottom>
            게시글 수정
          </Typography>{" "}
          {/* 제목 설정 */}
        </Grid>
        <Grid item xs={12} sm={8}>
          {" "}
          {/* 게시글 폼의 너비 조정 */}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {" "}
              {/* 내부 Grid 설정 */}
              <Grid item xs={12}>
                <label>제목:</label>
                <input
                  type="text"
                  value={title} // 기존 제목을 표시
                  onChange={(e) => setTitle(e.target.value)} // 새로운 제목 입력 시 상태 업데이트
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <label>내용:</label>
                <textarea
                  value={content} // 기존 내용을 표시
                  onChange={(e) => setContent(e.target.value)} // 새로운 내용 입력 시 상태 업데이트
                  required
                  style={{ width: "100%", minHeight: "100px" }} // 스타일 조정
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  게시글 수정
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BoardEdit;
