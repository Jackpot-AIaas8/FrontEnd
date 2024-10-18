import React, { useEffect, useState } from "react";

import {
  StyledMypageWrapper,
  StyeldRightSection,
  StyledMypageSection,
  StyledOneBoard,
  StyledFundHistory,
} from "../myPage/Mypage.styles";

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

import apiClient from "../token/AxiosConfig";
import InquirySection from "../myPage/InquirySection";
import PurchaseHistorySection from "../myPage/ShopPurchaseSection";

const Mypage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState("all");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [address, setAddress] = useState("");

  const [infoData, setInfoData] = useState({
    name: "",
    email: "",
    phone: "",
    grade: "기본 회원",
  });

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
            <Typography variant="h5">{infoData.name}</Typography>
            <Typography variant="body2">Gold</Typography>
          </Grid2>

          {/* Right Section */}

          <CardContent className="w-full">
            <Typography variant="h6">Information</Typography>
            <Divider sx={{ my: 2 }} />
            <ul className="flex justify-around">
              <li>
                <h3 className="info-title">Email</h3>
                <span>{infoData.email}</span>
              </li>
              <li>
                <h3 className="info-title">Phone</h3>
                <span>{infoData.phone}</span>
              </li>

              <li>
                <h3 className="info-title">닉네임</h3>
                <span>{infoData.nickName}</span>
              </li>
              <li>
                <h3 className="info-title">{infoData.address}</h3>
                <span>집 주소</span>
              </li>
            </ul>
          </CardContent>
        </div>
      </StyledMypageSection>
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

  // useEffect(() => {
  //   const mockShopData = () => {
  //     const response = MockShopData;

  //     setShopData(response.data);
  //   };

  //   mockShopData();
  // }, []);

  useEffect(() => {
    const apiInfo = async () => {
      try {
        const response = await apiClient.get("member/myPage");
        console.log(response.data);

        // 가져온 데이터를 기반으로 grade를 판별해서 상태 업데이트
        const updatedData = {
          ...response.data,
          grade: response.data.grade === 1 ? "기본 회원" : "VIP",
        };
        setInfoData(updatedData);
      } catch (error) {
        console.log(error);
      }
    };
    apiInfo();
    console.log(infoData.grade);
  }, []);

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
            infoData={infoData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          {/* RightSection */}
          <StyeldRightSection className="right-section flex flex-column  w-full justify-around  ">
            {currentPage === "all" ? renderAllContent() : renderSingleContent()}
          </StyeldRightSection>
        </StyledMypageWrapper>
      </div>
    </>
  );
};
export default Mypage;

export const NoneContent = () => {
  return <p className="section-noneContent ">정보가 없습니다.</p>;
};
