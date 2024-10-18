import { useEffect, useState } from "react";
import getTimeAgo from "../detailComponent/GetTImeAgo";
import { NoneContent } from "../pages/Memeber/Mypage";
import { StyledOneBoard } from "./Mypage.styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import apiClient from "../token/AxiosConfig";

const InquirySection = () => {
  const [inquiry, setInquiry] = useState([]) || {};

  useEffect(() => {
    const apiOninquiry = async () => {
      try {
        const response = await apiClient.get("board/findAllAskMyPage", {
          params: { page: 1, size: 3 },
        });

        setInquiry(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    apiOninquiry();
  }, []);

  return (
    <StyledOneBoard>
      <h4 className="text-left p-0 m-0">나의 문의내역</h4>
      {inquiry?.length ? (
        inquiry.slice(0, 3).map((board) => (
          <div
            key={board.boardId}
            className="section-oneBoard flex flex-row justify-between align-center"
          >
            <span className="left-oneBoard flex flex-row w-half ">
              <LockOutlinedIcon />
              1대1문의 내역입니다.
            </span>

            <span>{board.regDate.slice(0, 10)}</span>
            <span>{getTimeAgo(board.regDate)} </span>
            <button className="btn_show">보러가기</button>
          </div>
        ))
      ) : (
        <NoneContent />
      )}
    </StyledOneBoard>
  );
};

export default InquirySection;
