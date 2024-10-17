import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Search from "../components/Shop/Search";
import NavBar from "../components/Main/NavBar";
import SideBar from "../components/Shop/SideBar";
import MainCarousel from "../components/Shop/ShopCarousel";
import Card from "../components/Shop/Card";
import styled from "styled-components";
import apiClient from "../token/AxiosConfig";

function ShopPage() {
  const [category, setCategory] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 상태 추가
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
      navigate(`/shop?category=${category}&sortOrder=${sortOrder}`, {
        replace: true,
      });
    } else {
      navigate(`/shop?sortOrder=${sortOrder}`, { replace: true });
    }
  }, [category, sortOrder, navigate]);

  // 상품 데이터 가져오기
  const fetchProducts = async (page = 1) => {
    try {
      const endpoint = category
        ? `http://localhost:8181/shop/category/${category}`
        : `http://localhost:8181/shop/findList`;

      const response = await apiClient.get(endpoint, {
        params: { page, size: itemsPerPage, sortOrder },
      });

      if (response.data && Array.isArray(response.data.dtoList)) {
        setProducts(response.data.dtoList);
        setTotalPages(Math.ceil(response.data.total / itemsPerPage)); // 총 페이지 수 계산
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("상품 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  // 상품 데이터 가져오기와 URL 변경을 구분
  useEffect(() => {
    // URL 변경 후 상품 데이터 가져오기 실행
    if (category !== null && sortOrder !== null) {
      fetchProducts(currentPage); // 페이지 값 추가
    }
  }, [category, sortOrder, currentPage]);

  // 정렬 순서 변경
  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
  };

  // 페이지 변경 처리
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
              />
            </CardWrapper>
          </CardSection>
        </ContentWrapper>

        {/* 페이지네이션 추가 */}
        <PaginationWrapper>
          {currentPage > 1 && (
            <button onClick={() => handlePageChange(currentPage - 1)}>
              &lt;
            </button>
          )}
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          {currentPage < totalPages && (
            <button onClick={() => handlePageChange(currentPage + 1)}>
              &gt;
            </button>
          )}
        </PaginationWrapper>
      </MainContentWrapper>
    </PageContainer>
  );
}

export default ShopPage;

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
  width: 1200px;
  padding: 20px;
  justify-content: center;
  align-items: center;
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
  max-width: 1200px;
  margin: 0 auto;
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 300px);
  justify-items: center;
  width: 1200px;
  gap: 50px;
  margin-right: 250px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 300px);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 300px);
    overflow-x: auto;
  }
`;

// 페이지네이션 스타일 정의
const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;

  button {
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .active {
    background-color: #0056b3;
  }
`;
