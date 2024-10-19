import React, { useEffect, useState } from "react";
import { Typography, Button, Grid2, TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Categories from "./Categories";
import styled from "styled-components";
import MainImage from "./MainImage";
import getTimeAgo from "./GetTImeAgo";

import { useNavigate } from "react-router-dom";

const DogInfo = ({ dogData }) => {
  const [data, setData] = useState({});

  // const onHeartToggle = () => {
  //   setData((prevData) => ({
  //     ...prevData,
  //     heart: prevData.heart + (isHeart ? -1 : 1),
  //   }));
  // };

  // const { isHeart, updateHeart } = useHeart(data, onHeartToggle);

  useEffect(() => {
    if (dogData) {
      setData({
        ...dogData, // dogData의 모든 속성을 복사
        gender: dogData.gender === 1 ? "남성" : "여성", // gender 변환
        age: `${dogData.age}세`, // age 형식 변환
      });
    }
  }, [dogData]);

  const infoItems = data.regDate
    ? [
        {
          label: "등록시간",
          value: getTimeAgo(data.regDate),
          extra: `${data.regDate.slice(0, 10)}에 등록됨`,
        },
        { label: "참여자 수", value: `${data.fundMemberNum}` },
      ]
    : [];

  const categories = [data.name, data.gender, data.age]; // '이름', '성별', '나이' 카테고리

  const title = "길을 잃어 죽기 직전인 뽀삐를 살려주세요";

  const imgSrc = data.mainImage;

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

  const [inputValue, setInputValue] = useState(""); // 입력된 값 (항상 문자열)
  const [selectedOption, setSelectedOption] = useState(""); // 드롭다운에서 선택된 값 (항상 문자열)

  const priceOptions = ["10000", "20000", "30000", "직접 입력"]; // 드롭다운 옵션

  // 드롭다운에서 선택 시 처리
  const handleSelectChange = (event, newValue) => {
    if (newValue === "직접 입력") {
      setSelectedOption("직접 입력"); // '직접 입력' 모드로 전환
      setInputValue(""); // 입력 필드 초기화
    } else if (newValue) {
      setSelectedOption(newValue); // 선택된 값 설정
      setInputValue(newValue); // 입력 필드에 값 설정
    } else {
      // newValue가 null인 경우 처리
      setSelectedOption("");
      setInputValue("");
    }
  };

  // 입력 값 변경 시 처리
  const handleInputChange = (event, newInputValue) => {
    if (selectedOption === "직접 입력") {
      // 숫자만 입력되도록 제한
      if (/^\d*$/.test(newInputValue)) {
        setInputValue(newInputValue);
      }
    } else {
      // '직접 입력'이 아닐 때는 입력 불가 (읽기 전용)
      setInputValue(selectedOption);
    }
  };

  const navigate = useNavigate();

  const handleFundNow  = () => {
    if (!inputValue || parseInt(inputValue, 10) <= 0) {
      alert("가격을 입력해 주세요."); // 알림 표시
      return;
    }

    const parsedPrice = parseInt(inputValue, 10);
    console.log(data.name);

    navigate("/Checkout", {
      state: {
        isFunding: true,  
        name: data.name,  
        totalAmount: parsedPrice, 
        
      },
    });
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
          <FundingAmount>{data.fundCollection}원</FundingAmount>
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
        <StyledPriceContainer>
          <Autocomplete
            className="w-full"
            freeSolo
            options={priceOptions}
            value={selectedOption}
            inputValue={inputValue}
            onChange={handleSelectChange}
            onInputChange={handleInputChange}
            openOnFocus
            renderInput={(params) => (
              <TextField
                {...params}
                label="가격 선택 또는 입력"
                placeholder="가격을 선택하거나 입력하세요"
                slotProps={{
                  ...params.InputProps,
                  readOnly: selectedOption !== "직접 입력", // '직접 입력'일 때만 입력 가능
                  inputMode:
                    selectedOption === "직접 입력" ? "numeric" : "none",
                  pattern:
                    selectedOption === "직접 입력" ? "[0-9]*" : undefined,
                  onKeyPress: (event) => {
                    if (
                      selectedOption === "직접 입력" &&
                      !/[0-9]/.test(event.key)
                    ) {
                      event.preventDefault(); // 숫자가 아닌 입력 차단
                    }
                  },
                }}
              />
            )}
          />
        </StyledPriceContainer>
        {/* 버튼들 */}
        <Grid2 sx={{ marginTop: 2 }} xs={12}>
          <Button
            variant="outlined"
            sx={{ marginRight: 1 }}
            startIcon={
              data.isHeart === 1 ? <FavoriteIcon /> : <FavoriteBorderIcon />
            }
            onClick={(e) => {
              e.stopPropagation(); // 부모 요소로 이벤트 전파 방지
              // updateHeart(); // 하트 업데이트 함수 호출
            }}
          >
            {data.heart}명이 관심있어요
          </Button>
          <Button
            variant="outlined"
            startIcon={<ShareIcon />}
            onClick={handleFundNow }
          >
            결제하기
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
const StyledPriceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 10px 0;
`;

export default DogInfo;
