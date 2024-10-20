import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Info from "../../detailComponent/Info";
import YouTubeContainer from "../../detailComponent/YoutubeContainer";
import DogHistory from "../../detailComponent/DogHistory";
import FundStory from "../../detailComponent/FundStory";
import styled from "styled-components";
import apiClient from "../../token/AxiosConfig";

const DogDetail = () => {
  const { dogId } = useParams();
  const [dogData, setDogData] = useState({});

  useEffect(() => {
    apiDogDetail();
  }, [dogId]);
  console.log(dogData.isHeart);

  const apiDogDetail = async () => {
    try {
      const response = await apiClient.get("dog/findOne", {
        params: { dogId: dogId },
      });
      const transformedData = {
        ...response.data, // API에서 받은 데이터를 복사
        gender: response.data.gender === 1 ? "여성" : "남성", // gender 변환
        age: `${response.data.age}세`, // age 형식 변환
      };

      setDogData(transformedData);
      console.log(transformedData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {dogData?.dogId && (
        <StyledContainer>
          <div className="section-dogDetail">
            <Info dogData={dogData} />

            <div className="flex flex-column align-center justify-center w-full">
              {dogData.videoUrl && (
                <YouTubeContainer youtubeLink={dogData.videoUrl} />
              )}
              <FundStory />
            </div>
            <DogHistory dogData={dogData} />
          </div>
        </StyledContainer>
      )}
    </>
  );
};
export default DogDetail;

const StyledContainer = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 100px;
  min-height: 100vh;
  @media (min-width: 600px) {
    padding-left: 24px;
    padding-right: 24px;
  }
  @media (min-width: 1200px) {
    max-width: 1200px;
  }

  .detail-wrapper {
    box-shadow: 5px 5px 10px 2px #3333;
    border-radius: 8px;
    padding: 20px;
  }
`;
