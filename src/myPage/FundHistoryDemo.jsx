import React from "react";
import { Box, Typography, Avatar, Paper } from "@mui/material";
import Grid2 from "@mui/material/Grid2"; // Grid2 임포트
import styled from "styled-components";
import { ProgressBar } from "./ProgressBar";

const DogProfile = () => {
  const dog = {
    name: "뽀삐",
    breed: "리트리버",
    age: "3살",
    gender: "남성",
    owner: "홍길동",
    email: "owner@example.com",
    phone: "010-1234-5678",
    address: "서울시 강남구",
    membership: "Gold",
    profileImage:
      "data:image/jpeg;base64,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", // 이미지 URL
  };

  return (
    <StyledFundingSection
      className="flex flex-row"
    >
      {/* 왼쪽: 이미지와 이름 */}
      <div className="flex flex-column align-center">
        <Avatar
          alt={dog.name}
          src={dog.profileImage}
          sx={{ width: 150, height: 150, marginBottom: 2, boxShadow: 3 }}
        />
        <p style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>
          {dog.name}
        </p>
      </div>

      {/* 오른쪽: 개 정보 (두 개의 열로 구성) */}
     
      <StyledFundDetailSection>
        <div>
          <p style={{ fontWeight: 'bold' }}>Owner:</p>
          <p>{dog.owner}</p>

          <p style={{ fontWeight: 'bold', marginTop: '16px' }}>Email:</p>
          <p>{dog.email}</p>

          <p style={{ fontWeight: 'bold', marginTop: '16px' }}>Phone:</p>
          <p>{dog.phone}</p>
        </div>

        <div>
          <p style={{ fontWeight: 'bold' }}>Address:</p>
          <p>{dog.address}</p>

          <p style={{ fontWeight: 'bold', marginTop: '16px' }}>Breed:</p>
          <p>{dog.breed}</p>

          <p style={{ fontWeight: 'bold', marginTop: '16px' }}>Age:</p>
          <p>{dog.age}</p>

          <p style={{ fontWeight: 'bold', marginTop: '16px' }}>Gender:</p>
          <p>{dog.gender}</p>
        </div>
        
      </StyledFundDetailSection>
    </StyledFundingSection>
  );
};

export default DogProfile;

const StyledFundingSection = styled.div`
  border-radius: 8px;
  width: 100%;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 30px 0;
  align-items: center;
  justify-content: space-around;
`;
const StyledFundDetailSection = styled.div`
display: grid;
  grid-template-columns: repeat(2, 1fr); /* 두 개의 열로 나눔 */
  gap: 20px;

  p {
    margin: 0;

    strong {
      font-weight: bold;
    }
  }
`;
