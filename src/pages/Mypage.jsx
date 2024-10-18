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
  Card,
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

const Mypage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [address, setAddress] = useState("");
  const [shopDatas, setShopDatas] = useState([]) || {};
  const [boardData, setBoardData] = useState([]) || {};

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

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    const apiShopDatas = () => {
      const response = MockShopData;

      setShopDatas(response.data);
    };

    apiShopDatas();
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

  const handleMypage = (e) => {
    e.preventDefault();
    // 조건이 눌렸을 경우 개인정보 수정 창이 떠야한다.
  };

  return (
    <>
      <div className="container flex justify-center">
        <StyledMypageWrapper className="flex flex-row">
          {/* sidebar */}
          <MypageSideBar />
          {/* MainContent */}
          <StyeldRightSection className="right-section flex flex-column  w-full    ">
            <>
              <h4 className="text-left p-0 m-0">프로필</h4>
              <StyledMypageSection className="w-full">
                <Card sx={{ display: "flex", borderRadius: ".5rem" }}>
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
                </Card>
              </StyledMypageSection>
            </>

            <h4 className="text-left p-0 m-0">구매내역</h4>
            {shopDatas.slice(0, 3).map((shopData) => (
              <PurchaseHistory key={shopData.id} shopData={shopData} />
            ))}
            {boardData.map((board) => (
              <StyledOneBoard className="btn_section" key={board.boardId}>
                <h4 className="text-left p-0 m-0">1:1문의내역</h4>
                <div className="section-oneBoard flex flex-row justify-between">
                  <span className="left-oneBoard flex flex-row w-half ">
                    <LockOutlinedIcon />
                    1대1문의 내역입니다.
                  </span>

                  <span></span>
                  <span>몇 일전 </span>
                  <button className="btn_show">보러가기</button>
                </div>
              </StyledOneBoard>
            ))}
            <StyledFundHistory>
              <h4 className="text-left p-0 m-0">펀딩내역</h4>
              <div className="section-fund flex w-full flex-column">
                <span></span>
              </div>
            </StyledFundHistory>
          </StyeldRightSection>
        </StyledMypageWrapper>
      </div>
    </>
  );
};
export default Mypage;
