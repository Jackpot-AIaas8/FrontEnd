import { Container } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { SERVER_URL } from "../config/Constants";
import axios from "axios";
import Info from "../detailComponent/Info";
import YouTubeContainer from "../detailComponent/YoutubeContainer";
import DogHistory from "../detailComponent/DogHistory";
import FundStory from "../detailComponent/FundStory";
import styled from "styled-components";
import { apiNoToken } from "../token/AxiosConfig";

const DogDetail = () => {
  const { dogId } = useParams();
  const [dogDetail, setDogDetail] = useState(null);
  const [dogData, setDogData] = useState({});
  const [price, setPrice] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const options = [50000, 100000, 150000, "직접입력"]; // 옵션 리스트

  useEffect(() => {
    fetchDogDetail();
  }, [dogId]);

  const fetchDogDetail = async () => {
    try {
      const response = await apiNoToken.get("dog/findOne", {
        params: { dogId: dogId },
      });
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectValue(selectedValue);
    if (selectedValue === "직접입력") {
      setPrice("");
    } else {
      setPrice(selectedValue);
    }
  };

  const handleInputChange = (event) => {
    setPrice(event.target.value);
  };

  return (
    <StyledContainer className="container flex justify-center align-center">
      <div className=" flex flex-column justify-center align-center detail-wrapper w-full">
        <Info className="flex" />

        {/* <Grid2 container spacing={2} direction="column">
        {" "}
        <Grid2 xs={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              가격을 선택하세요.
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectValue}
              label="가격을 선택하세요."
              onChange={handleSelectChange}
            >
              {options.map((option) => (
                <MenuItem value={option} key={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
        {selectValue === "직접입력" && (
        <Grid2 xs={6}>
            <Input
              type="text"
              value={price}
              onChange={handleInputChange}
              placeholder="가격 입력"
              autoFocus
              fullWidth
            />
          </Grid2>
        )}
        <Grid2 xs={12}>
          <Box sx={{ mt: 2, p: 2, border: "1px solid black" }}>
            <Typography>선택한 가격: {price}</Typography>
          </Box>
        </Grid2>
      </Grid2> */}
        <div className="flex flex-column align-center justify-center w-full">
          <YouTubeContainer youtubeLink={dogData.videoUrl} />
          <FundStory />
        </div>
        <DogHistory />
      </div>
    </StyledContainer>
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
