import React, { useEffect, useState } from "react";
import { Typography, Button, Grid2 } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import Categories from "./Categories";
import styled from "styled-components";
import MainImage from "./MainImage";

const getTimeAgo = (regDate) => {
  const seconds = Math.floor((new Date() - new Date(regDate)) / 1000);

  const intervals = [
    { label: "일", seconds: 86400 },
    { label: "시간", seconds: 3600 },
    { label: "분", seconds: 60 },
    { label: "초", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count > 0) {
      return `${count}${interval.label} 전`;
    }
  }

  return "방금 전";
};

const DogInfo = (props) => {
  const [dogData, setDogData] = useState("");

  useEffect(() => {
    setDogData(props.dogData);
  }, [props]);

  const infoItems = [
    // { label: "달성률", value: "223%", extra: "목표금액 50,002,000원" },
    {
      label: "등록시간",
      value: getTimeAgo(dogData.regDate),
      extra: `${dogData.regDate.slice(0, 10)}에 등록됨`,
    },
    { label: "참여자 수", value: `${dogData.fundMemberNum}` },
  ];

  const categories = [
    `${dogData.name}`, // 이름 추가
    ...(dogData.gender === 1 ? ["남성"] : ["여성"]), // 성별이 남성일 때만 추가
    `${dogData.age}세`, // 나이 추가
  ]; // '채권형', '소득공제가능', '선착순' 카테고리
  const title = "증액 예정 | 소득공제 | 전환 사채 주거 구독";
  const imgSrc =
    "//image-se.ycrowdy.com/20240909/CROWDY_202409091318250233_oSBCe.jpg/ycrowdy/resize/!740x!417";

  const WarningMessage = () => {
    return (
      <Typography
        variant="caption"
        className="flex"
        sx={{
          marginTop: 2,
          display: "block",
          color: "gray",
          borderRadius: "6px",
          backgroundColor: "#fef1f1",
          fontSize: "12px",
          padding: "5px 12px",
          lineHeight: "18px",
          textAlign: "start",
        }}
      >
        크라우드펀딩 투자는 <b>투자금액 전부</b>를 잃을 수 있는 <b>높은 위험</b>
        을 가지고 있습니다. 투자위험에 대해 이해가 있는 경우에만 투자에
        참여하세요.
      </Typography>
    );
  };

  return (
    <TopSection className="flex flex-row justify-between">
      {/* 왼쪽 영역 */}
      <LeftSection className="flex flex-column align-start">
        <Title>{title}</Title>
        {/* 이미지 영역 */}
        <MainImage imgSrc={imgSrc} />
      </LeftSection>

      {/* 오른쪽 영역 */}
      <RightSection className="flex flex-column align-start justify-center">
        {/* 카테고리 텍스트 */}
        <Categories categories={categories} />

        {/* 펀딩 금액 */}
        <div className="flex align-center">
          <FundingAmount>{dogData.fundCollection}원</FundingAmount>
          <span className="flex text-small">펀딩중</span>
        </div>

        {/* 달성률, 남은기간, 투자자수 등 */}
        <Grid2
          className="flex align-start"
          container
          spacing={2}
          flexDirection="column"
          textAlign="start"
          sx={{ marginTop: 2 }}
        >
          {infoItems.map((item, index) => (
            <Grid2 className="flex flex-row" key={index} xs={12} sm={6}>
              <Typography variant="body2">
                {item.label}: <strong>{item.value}</strong>{" "}
                {item.extra && `| ${item.extra}`}
              </Typography>
            </Grid2>
          ))}
        </Grid2>
        {/* 버튼들 */}
        <Grid2 sx={{ marginTop: 2 }} xs={12}>
          <Button
            variant="outlined"
            sx={{ marginRight: 1 }}
            startIcon={<FavoriteBorderIcon />}
          >
            {dogData.heart}
            명이 관심있어요
          </Button>
          <Button variant="outlined" startIcon={<ShareIcon />}>
            공유하기
          </Button>
        </Grid2>

        {/* 경고 메시지 */}
        <WarningMessage />
      </RightSection>
    </TopSection>
  );
};

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  gap: 32px;
`;
const LeftSection = styled.div`
  flex: 2;
  margin-right: 16px;
`;
const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  letter-spacing: -1px;
  line-height: 50px;
`;

const RightSection = styled.div`
  flex: 1;
`;
const FundingAmount = styled.span`
  font-size: 24px;
  font-weight: bold;
  margin-right: 8px;
`;

export default DogInfo;
