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

  useEffect(() => {
    setSortOrder("latest");
  }, [location]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');

    if (categoryParam) {
      setCategory(categoryParam); 
    } else {
      setCategory(null);  
    }
  }, [location]);

  useEffect(() => {
    if (category !== null) {
      navigate(`/shop?category=${category}&sortOrder=${sortOrder}`, { replace: true });
    } else {
      navigate(`/shop?sortOrder=${sortOrder}`, { replace: true });
    }
  }, [category, sortOrder, navigate]);

  const fetchProducts = async () => {
    try {
      let response;
      if (category !== null) {
        response = await axios.get(`http://localhost:8181/shop/category/${category}`, {
          params: { page: 1, size: itemsPerPage, sortOrder: sortOrder },
        });
      } else {
        response = await axios.get("http://localhost:8181/shop/findList", {
          params: { page: 1, size: itemsPerPage, sortOrder: sortOrder },
        });
      }

      if (Array.isArray(response.data.dtoList)) {
        setProducts(response.data.dtoList);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("상품 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

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
`;

const SearchWrapper = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: center;
`;

const CarouselWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
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
  width: 60%; /* 너비를 60%로 설정 */
  max-width: 1000px;
  margin: 0 auto;
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 300px); /* 기본적으로 4개 */
  gap: 20px;
  justify-content: center; /* 카드들을 중앙으로 정렬 */

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 300px); /* 화면이 줄면 3개 */
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 300px); /* 화면이 더 줄어들면 2개 */
    overflow-x: auto; /* 스크롤 가능 */
  }
`;

export default ShopPage;
