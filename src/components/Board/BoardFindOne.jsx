import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../token/AxiosConfig";
import Button from "@mui/material/Button";
import ReplyForm from "../Reply/ReplyRegister";
import ReplyList from "../Reply/ReplyFindAll";
import "./css/BoardFindOne.css";
import { useNavigate } from "react-router-dom";

const BoardFindOne = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await apiClient.get("board/findOne", {
          params: { boardId: boardId },
        });
        console.log("Board Data:", response);

        setBoard(response.data);
        setLoading(false);
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
        setLoading(false);
      }
    };

    fetchBoard();
  }, [boardId]);

  const handleReplySubmit = async () => {
    try {
      const response = await apiClient.get("board/findOne", {
        params: { boardId: boardId },
      });
      setBoard(response.data);
    } catch (error) {
      console.error("게시글 갱신 실패:", error);
    }
  };

  console.log("BoardFindOne boardId:", boardId);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!board) {
    return <div style={{marginTop: '140px', marginBottom: '140px'}}>게시글을 불러오는데 실패했습니다.<br/><br/> 혹은 로그인이 필요합니다.</div>;
  }

  return (
    <div className="board-read-container">
      <table className="board-read-table">
        <thead>
          <tr>
            <td>
              <b>{board.boardId}</b> <h1>{board.title}</h1>
              {board.memberId} | {board.regDate}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="board-content">{board.content}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <ReplyForm boardId={boardId} onReplySubmit={handleReplySubmit} />
            </td>
          </tr>
          <ReplyList boardId={boardId} />
        </tfoot>
      </table>
      <Button
        variant="text"
        style={{ color: "gray" }}
        onClick={() => {
          navigate(`/board/edit/${board.boardId}`);
        }}
      >
        수정하기
      </Button>
      <Button
        variant="text"
        style={{ color: "gray" }}
        onClick={() => {
          navigate(`/board/remove/${board.boardId}`);
        }}
      >
        삭제하기
      </Button>
    </div>
  );
};

export default BoardFindOne;
