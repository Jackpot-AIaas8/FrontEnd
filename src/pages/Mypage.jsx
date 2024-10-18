import React, { useEffect, useState } from "react";

import {
  StyledMypageWrapper,
  StyeldRightSection,
  StyledMypageSection,
  StyledOneBoard,
  StyledFundHistory,
} from "../myPage/Mypage.styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { MockShopData } from "../myPage/MockMypageData";

import Grid2 from "@mui/material/Grid2";
import {
  Avatar,
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import MypageSideBar from "../myPage/MyPageSideBar";
import PurchaseHistory from "../myPage/ShopPurchase";
import apiClient from "../token/AxiosConfig";
import getTimeAgo from "../detailComponent/GetTImeAgo";

const Mypage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState("all");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [address, setAddress] = useState("");

  const [shopData, setShopData] = useState([]) || {};
  const [boardData, setBoardData] = useState([]) || {};

  const renderSingleContent = () => {
    switch (currentPage) {
      case "info":
        return <InfoSection />;
      case "purchase":
        return <PurchaseHistorySection />;
      case "inquiry":
        return <InquirySection />;
      case "funding":
        return <FundHisotrySection />;
      default:
        return renderAllContent(); // 기본적으로 모든 섹션 렌더링
    }
  };

  const renderAllContent = () => (
    <>
      <InfoSection />
      <PurchaseHistorySection />

      <InquirySection />
      <FundHisotrySection />
    </>
  );

  const editUser = () => {
    return (
      <>
        <>
          <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>개인정보 수정</DialogTitle>
            <DialogContent>
              <input
                type="text"
                placeholder="이메일 수정"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button onClick={(e) => e.preventDefault()} color="primary">
                이메일 중복검사
              </Button>
              <input
                type="password"
                placeholder="비밀번호 수정"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="text"
                placeholder="전화번호 수정"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="text"
                placeholder="이름 수정"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="닉네임 수정"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <Button onClick={(e) => e.preventDefault()} color="primary">
                닉네임 중복검사
              </Button>
              <input
                type="text"
                placeholder="주소 수정"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                닫기
              </Button>
            </DialogActions>
          </Dialog>
        </>
      </>
    );
  };

  const InfoSection = () => {
    return (
      <StyledMypageSection className="w-full">
        <h4 className="text-left p-0 m-0">프로필</h4>

        <div className="section-mypage flex flex-row">
          {/* Left Section */}

          <Grid2
            onClick={handleMypage}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 5,
              backgroundColor: "#f5f5f5",
              borderRadius: ".5rem 0 0 .5rem",
            }}
          >
            <Avatar
              src="https://static.nid.naver.com/images/web/user/default.png"
              sx={{ width: 100, height: 100, mb: 2 }}
            />
            <Typography variant="h5">전세계</Typography>
            <Typography variant="body2">Gold</Typography>
          </Grid2>

          {/* Right Section */}

          <CardContent className="w-full">
            <Typography variant="h6">Information</Typography>
            <Divider sx={{ my: 2 }} />
            <ul className="flex justify-around">
              <li>
                <h3 className="info-title">Email</h3>
                <span>이메일 || *******처리</span>
              </li>
              <li>
                <h3 className="info-title">Phone</h3>
                <span>000-000-0000</span>
              </li>

              <li>
                <h3 className="info-title">닉네임</h3>
                <span>nickName</span>
              </li>
              <li>
                <h3 className="info-title">Address</h3>
                <span>집 주소</span>
              </li>
            </ul>
          </CardContent>
        </div>
      </StyledMypageSection>
    );
  };

  const InquirySection = () => {
    return (
      <StyledOneBoard>
        <h4 className="text-left p-0 m-0">나의 문의내역</h4>
        {boardData?.length ? (
          boardData.slice(0, 3).map((board) => (
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

  const PurchaseHistorySection = () => {
    return (
      <div>
        <h4 className="text-left p-0 m-0">구매내역</h4>
        {shopData?.length ? (
          shopData.map((shopDatum) => (
            <PurchaseHistory key={shopDatum.id} shopData={shopDatum} />
          ))
        ) : (
          <NoneContent />
        )}
      </div>
    );
  };

  const FundHisotrySection = () => {
    return (
      <StyledFundHistory>
        <h4 className="text-left p-0 m-0">펀딩내역</h4>
        <div className="section-fund flex w-full flex-column">
          <span>dogDTO가 될것</span>
        </div>
      </StyledFundHistory>
    );
  };

  const NoneContent = () => {
    return <p className="section-noneContent ">정보가 없습니다.</p>;
  };

  // useEffect(() => {
  //   const mockShopData = () => {
  //     const response = MockShopData;

  //     setShopData(response.data);
  //   };

  //   mockShopData();
  // }, []);

  useEffect(() => {
    const apiShopData = () => {
      try {
        const response = apiClient("order/findAll");
        console.log(response.data);
        setShopData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    apiShopData();
  }, []);

  useEffect(() => {
    const apiOnBoardData = async () => {
      try {
        const response = await apiClient.get("board/findAllAskMyPage", {
          params: { page: 1, size: 3 },
        });

        setBoardData(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    apiOnBoardData();
  }, []);

  // useEffect(() => {
  //   const apiInfo = () => {
  //     try {
  //       const response = apiClient("member/myPage");
  //       console.log(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   apiInfo();
  // }, []);

  const handleMypage = (e) => {
    e.preventDefault();
    // 조건이 눌렸을 경우 개인정보 수정 창이 떠야한다.
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="container flex justify-center">
        <StyledMypageWrapper className="flex flex-row">
          {/* leftSection */}
          <MypageSideBar
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          {/* RightSection */}
          <StyeldRightSection className="right-section flex flex-column  w-full justify-around  ">
            {/* <InfoSection />
            <PurchaseHistorySection />
            <InquirySection />
            <FundHisotrySection /> */}

            {currentPage === "all" ? renderAllContent() : renderSingleContent()}
          </StyeldRightSection>
        </StyledMypageWrapper>
      </div>
    </>
  );
};
export default Mypage;
