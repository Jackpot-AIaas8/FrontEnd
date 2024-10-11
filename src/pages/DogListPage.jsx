import Dog from "../dogList/Dog";
import React, { useEffect, useState } from "react";

import { Box, Container } from "@mui/material";

// import MOCKDATA from "./MockData";
import SortSelector from "../dogList/SortSelector";
import PageComponent from "../dogList/PageComponent";
import apiClient from "../token/AxiosConfig";
import styled from "styled-components";
import image from "../static/fundingBanner.jpg"

const DogListPage = () => {
  const [dogsData, setDogsData] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    sort: "heart",
    page: 1,
    size: 9,
  });
  const [totalPages, setTotalPages] = useState();
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    dogListAPI(pageInfo);
  }, [pageInfo]);

  const handleSortChange = (e, newSort) => {
    e.preventDefault();
    if (newSort !== null) {
      setPageInfo((prevInfo) => ({
        ...prevInfo,
        sort: newSort,
        page: 1,
      }));
    }
  };

  const handlePageChange = (page) => {
    setPageInfo((prevInfo) => ({
      ...prevInfo,
      page,
    }));
  };

  const dogListAPI = async () => {
    try {
      const response = await apiClient.get("dog/dogList", {
        params: pageInfo,
      });
      console.log(response.data);

      setDogsData(response.data);

      setTotalPages(Math.ceil(response.data.totalDogNum / pageInfo.size));

      setLoading(false);
      setDogsData(response.data.dogList);
    } catch (err) {
      console.error(err);
    }
  };

  const handleHeartToggle = () => {
    // setPageInfo((prevInfo) => ({
    //   ...prevInfo,
    //   page: 1,
    // }));
    dogListAPI();
  };

  return (
    <div className="container">
      
    <Container>
      <ImageBanner className="flex align-center justify-center w-full m-0 m-auto relative">
        <img src={image} alt="펀딩 배너 사진" style={{width: '100%'}}/>
      </ImageBanner>
      {/* 여기 스타일코드 인라인으로 넣어놓은거 없애보려고 클래스네임에 넣었는데 안먹히는거같음 */}

      {loading ? (
        <div>Loading...</div> // 로딩 중일 때는 로딩 메시지 표시
      ) : (
        <>
          <SortSelector value={pageInfo.sort} onChange={handleSortChange} />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 8,
            }}
          >
            {dogsData.map((dog) => (
              <Box key={dog.dogId}>
                <Dog dog={dog} onHeartToggle={handleHeartToggle} />
              </Box>
            ))}
          </Box>
          <PageComponent
            pageInfo={pageInfo}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onPrev={() => handlePageChange(Math.max(pageInfo.page - 1, 1))}
            onNext={() =>
              handlePageChange(Math.min(pageInfo.page + 1, totalPages))
            }
          />
        </>
      )}
    </Container>
    </div>
  );
};

const ImageBanner = styled.div`
  margin:20px;
`;
export default DogListPage;
