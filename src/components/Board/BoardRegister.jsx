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
