import React, { useEffect, useState } from "react";
import { Typography, Button, Grid2 } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import Categories from "./Categories";
import styled from "styled-components";
import MainImage from "./MainImage";
import getTimeAgo from "./GetTImeAgo";

const DogInfo = ({ dogData: initialDogData }) => {


  const [data, setData] = useState({
    name: "",
    gender: "",
    age: "",
    regDate: "",
    fundCollection: 0,
    fundMemberNum: 0,
    heart: 0,
  });

  useEffect(() => {
    if (initialDogData) {
      const {
        name,
        gender,
        age,
        regDate,
        fundCollection,
        fundMemberNum,
        heart,
      } = initialDogData;

      setData({
        name,
        gender: gender === 1 ? "남성" : "여성",
        age: `${age}세`,
        regDate,
        fundCollection,
        fundMemberNum,
        heart,
      });
    }
  }, [initialDogData]);

  const { name, gender, age, regDate, fundCollection, fundMemberNum, heart } =
    data;

    const infoItems = regDate
    ? [
        {
          label: "등록시간",
          value: getTimeAgo(regDate),
          extra: `${regDate.slice(0, 10)}에 등록됨`,
        },
        { label: "참여자 수", value: `${fundMemberNum}` },
      ]
    : [];

  

  const categories = [
    name, 
    gender,  
    age, 
  ]; // '이름', '성별', '나이' 카테고리

  const title = "길을 잃어 죽기 직전인 뽀삐를 살려주세요";

  const imgSrc =
    "https://newsimg.hankookilbo.com/2017/11/14/201711141165118317_1.jpg";

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
          <FundingAmount>{fundCollection}원</FundingAmount>
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
            {heart}
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
