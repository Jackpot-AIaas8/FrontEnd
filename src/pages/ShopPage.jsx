import React, { useState } from "react";
import Search from "../components/Shop/Search";
import SideBar from "../components/Shop/SideBar";
import MainCarousel from "../components/Shop/ShopCarousel";
import Card from "../components/Shop/Card";
import styled from "styled-components";

function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchResults, setSearchResults] = useState([]); // 검색된 결과를 저장

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    setSearchResults([]); // 카테고리 변경 시 검색 결과 초기화
  };

  return (
    <PageContainer>
      <MainContentWrapper>
        <SearchWrapper>
          <Search setSearchResults={setSearchResults} /> {/* 전달 */} 
        </SearchWrapper>
        <CarouselWrapper>
          <MainCarousel />
        </CarouselWrapper>
        <ContentWrapper>
          <SideBarWrapper>
            <SideBar setSelectedCategory={handleCategoryChange} />
          </SideBarWrapper>
          <CardSection>
            <CardWrapper>
              <Card category={selectedCategory} products={searchResults} /> {/* 검색 결과 전달 */}
            </CardWrapper>
          </CardSection>
        </ContentWrapper>
      </MainContentWrapper>
    </PageContainer>
  );
}


export default ShopPage;





const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
`;

const MainContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 1900px;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const SearchWrapper = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: center;
`;

const CarouselWrapper = styled.div`
  width: 1200px;
  height: auto;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1820px;
  padding: 20px;
  justify-content: flex-start;
  align-items: flex-start;
    gap: 40px; /* 사이드바와 카드 사이에 여백 추가 */
   
`;

const SideBarWrapper = styled.div`
  flex: 0 0 250px; /* 사이드바 너비를 고정 */
  margin-right: 20px;
`;

const CardSection = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 300px);
  justify-items: center;
  width: 100%;
  gap: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    overflow-x: auto;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;

  button {
    background-color: #ff7600; /* 주황색 배경 */
    color: white; /* 흰색 글자 */
    border: none; /* 테두리 없애기 */
    padding: 0.5rem 1rem; /* 패딩 추가 */
    margin: 0 1rem; /* 버튼 사이의 간격 */
    cursor: pointer; /* 커서 모양 변경 */
    transition: background-color 0.3s; /* 배경색 변화 시 전환 효과 */
    border-radius: 0.5rem; /* 모서리를 둥글게 설정 (값을 조절 가능) */

    &:hover {
      background-color: #d64229; /* 호버 시 어두운 주황색으로 변경 */
    }

    &:disabled {
      background-color: gray;
      cursor: not-allowed;
    }
  }

  .active {
    background-color: #0056b3;
  }
`;
  