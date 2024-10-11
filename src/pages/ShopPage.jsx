import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Search from "../components/Shop/Search";
import NavBar from "../components/Main/NavBar";
import SideBar from "../components/Shop/SideBar";
import MainCarousel from "../components/Shop/ShopCarousel";
import Card from "../components/Shop/Card";
import styled from "styled-components";
import axios from "axios";

function ShopPage() {
  const [category, setCategory] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest");
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const itemsPerPage = 12;

  // 정렬 순서 초기화
  useEffect(() => {
    setSortOrder("latest");
  }, [location]);

  // URL에서 카테고리 쿼리 파라미터 가져오기
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");

    if (categoryParam) {
      setCategory(categoryParam);
    } else {
      setCategory(null);
    }
  }, [location]);

  // 카테고리나 정렬 순서 변경 시 URL 업데이트
  useEffect(() => {
    if (category !== null) {
      navigate(`/shop?category=${category}&sortOrder=${sortOrder}`, { replace: true });
    } else {
      navigate(`/shop?sortOrder=${sortOrder}`, { replace: true });
    }
  }, [category, sortOrder, navigate]);

  // 상품 데이터 가져오기
  const fetchProducts = async () => {
    try {
      const endpoint = category
        ? `http://localhost:8181/shop/category/${category}`
        : `http://localhost:8181/shop/findList`;

      const response = await axios.get(endpoint, {
        params: { page: 1, size: itemsPerPage, sortOrder },
      });

      if (response.data && Array.isArray(response.data.dtoList)) {
        setProducts(response.data.dtoList);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("상품 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  // 카테고리나 정렬 순서 변경 시 상품 데이터 갱신
  useEffect(() => {
    fetchProducts();
  }, [category, sortOrder]);

  // 정렬 순서 변경
  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
  };

  return (
    <PageContainer>
      <NavBar />
      <MainContentWrapper>
        <SearchWrapper>
          <Search setSearchResults={setSearchResults} />
        </SearchWrapper>
        <CarouselWrapper>
          <MainCarousel />
        </CarouselWrapper>
        <ContentWrapper>
          <SideBarWrapper>
            <SideBar setCategory={setCategory} fetchProducts={fetchProducts} />
          </SideBarWrapper>
          <CardSection>
            <CardWrapper>
              <Card
                products={products}
                category={category}
                searchResults={searchResults}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
              />
            </CardWrapper>
          </CardSection>
        </ContentWrapper>
      </MainContentWrapper>
    </PageContainer>
  );
}

// 스타일 정의
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
  max-width: 1200px;
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
  padding: 20px;
  justify-content: space-between;
  align-items: flex-start;
`;

const SideBarWrapper = styled.div`
  flex-basis: 20%;
  max-width: 250px;
  min-width: 200px;
`;

const CardSection = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  max-width: 1000px;
  margin: 0 auto;
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 300px);
  gap: 20px;
  justify-content: center;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 300px);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 300px);
    overflow-x: auto;
  }
`;

export default ShopPage;
