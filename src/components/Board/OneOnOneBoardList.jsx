import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../config/Constants.js";
import "./css/BoardList.css";

const OneOnOneBoardList = () => {
  const [type1Boards, setType1Boards] = useState([]); // 공지글 목록 상태
  const [type2Boards, setType2Boards] = useState([]); // 문의글 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}board/findAllAsk`, {
          params: { page, size: 10 }, // 페이지와 페이지 사이즈 요청
        });
        const allBoards = response.data.dtoList || [];
        console.log(allBoards);

        // 공지글과 문의글 분리
        const filteredType1 = allBoards.filter(
          (boardDTO) => boardDTO.type === 1
        );
        const filteredType2 = allBoards.filter(
          (boardDTO) => boardDTO.type === 3
        );
        console.log(filteredType1);
        console.log(filteredType2);

        setType1Boards(filteredType1); // 공지글 설정
        setType2Boards(filteredType2); // 문의글 설정

        setTotalPages(response.data.total); // 전체 페이지 수 설정
        setLoading(false);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        setLoading(false);
      }
    };

    fetchBoards();
  }, [page]); // 페이지가 바뀔 때마다 새로운 데이터 요청

  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 한 페이지에 공지글 + 문의글 합쳐서 10개 표시
  const totalItemsPerPage = 10;
  const remainingSlots = totalItemsPerPage - type1Boards.length; // 공지글을 뺀 나머지 공간
  const displayedBoards = [
    ...type1Boards,
    ...type2Boards.slice(0, remainingSlots),
  ]; // 공지글과 문의글을 합친 배열

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="board-list">
      <table className="board-table">
        <thead>
          <tr>
            <th>글유형</th>
            <th>글번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {/* 공지글과 문의글을 합친 배열을 렌더링 */}
          {displayedBoards.length > 0 ? (
            displayedBoards.map((boardDTO) => (
              <tr key={boardDTO.boardId}>
                <td>{boardDTO.type === 1 ? "공지" : "문의"}</td>
                <td>{boardDTO.boardId}</td>
                <td>
                  <Link
                    to={`/board/${boardDTO.boardId}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {boardDTO.title}
                  </Link>
                </td>
                <td>
                  {boardDTO.memberId ? boardDTO.memberId : "작성자 정보 없음"}
                </td>
                <td>{boardDTO.regDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">게시글이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 페이지네이션 버튼 */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          이전
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default OneOnOneBoardList;
