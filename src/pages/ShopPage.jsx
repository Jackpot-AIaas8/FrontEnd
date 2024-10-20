import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Search from "../components/Shop/Search";
import SideBar from "../components/Shop/SideBar";
import MainCarousel from "../components/Shop/ShopCarousel";
import Card from "../components/Shop/Card";
import styled from "styled-components";
import apiClient from "../token/AxiosConfig";
import { SERVER_URL } from "../config/Constants";

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
        ? `${SERVER_URL}shop/category/${category}`
        : `${SERVER_URL}shop/findList`;
      const response = await apiClient.get(endpoint, {
        params: { page, size: itemsPerPage, sortOrder },
      });
      console.log(response);

      // console.log("API 응답:", response);
      const allProducts = response.data.dtoList || [];
      // console.log(allProducts);
      setTotalPages(response.data.total);
      if (
        response.data &&
        Array.isArray(allProducts) &&
        allProducts.length > 0
      ) {
        setProducts(allProducts);

        // console.log(totalPages);
        // setTotalPages(Math.ceil(response.data.total / itemsPerPage)); // 총 페이지 수 계산
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

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      // console.log("페이지 변경:", newPage);
      setCurrentPage(newPage);
    }
  };

  // console.log(searchResults);
  return (
    <PageContainer>
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
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            이전
          </button>

          <span>
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            다음
          </button>
        </PaginationWrapper>
      </MainContentWrapper>
    </PageContainer>
  );
}

export default ShopPage;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Search from "../components/Shop/Search";
// import SideBar from "../components/Shop/SideBar";
// import MainCarousel from "../components/Shop/ShopCarousel";
// import Card from "../components/Shop/Card";
// import styled from "styled-components";
// import apiClient from "../token/AxiosConfig";
// import { SERVER_URL } from "../config/Constants";
// import PageComponent from "../dogList/PageComponent"; // 페이지네이션 컴포넌트 임포트

// function ShopPage() {
//   const [category, setCategory] = useState(null);
//   const [searchResults, setSearchResults] = useState([]);
//   const [sortOrder, setSortOrder] = useState("latest");
//   const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
//   const [totalPages, setTotalPages] = useState(1); // 총 페이지 상태 추가
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const itemsPerPage = 12;

//   // 정렬 순서 초기화
//   useEffect(() => {
//     setSortOrder("latest");
//   }, [location]);

//   // URL에서 카테고리 쿼리 파라미터 가져오기
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const categoryParam = params.get("category");

//     if (categoryParam) {
//       setCategory(categoryParam);
//     } else {
//       setCategory(null);
//     }
//   }, [location]);

//   // 카테고리나 정렬 순서 변경 시 URL 업데이트
//   useEffect(() => {
//     if (category !== null) {
//       navigate(`/shop?category=${category}&sortOrder=${sortOrder}`, {
//         replace: true,
//       });
//     } else {
//       navigate(`/shop?sortOrder=${sortOrder}`, { replace: true });
//     }
//   }, [category, sortOrder, navigate]);

//   // 상품 데이터 가져오기
//   const fetchProducts = async (page = 1) => {
//     try {
//       const endpoint = category
//         ? `${SERVER_URL}shop/category/${category}`
//         : `${SERVER_URL}shop/findList`;
//       const response = await apiClient.get(endpoint, {
//         params: { page, size: itemsPerPage, sortOrder },
//       });
//       console.log(response);

//       const allProducts = response.data.dtoList || [];
//       setTotalPages(response.data.total);
//       if (
//         response.data &&
//         Array.isArray(allProducts) &&
//         allProducts.length > 0
//       ) {
//         setProducts(allProducts);
//       } else {
//         setProducts([]);
//       }
//     } catch (error) {
//       console.error("상품 데이터를 가져오는 중 오류 발생:", error);
//     }
//   };

//   // 상품 데이터 가져오기와 URL 변경을 구분
//   useEffect(() => {
//     if (category !== null && sortOrder !== null) {
//       fetchProducts(currentPage); // 페이지 값 추가
//     }
//   }, [category, sortOrder, currentPage]);

//   // 정렬 순서 변경
//   const handleSortChange = (newSortOrder) => {
//     setSortOrder(newSortOrder);
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   return (
//     <PageContainer>
//       <MainContentWrapper>
//         <SearchWrapper>
//           <Search setSearchResults={setSearchResults} />
//         </SearchWrapper>
//         <CarouselWrapper>
//           <MainCarousel />
//         </CarouselWrapper>
//         <ContentWrapper>
//           <SideBarWrapper>
//             <SideBar setCategory={setCategory} fetchProducts={fetchProducts} />
//           </SideBarWrapper>
//           <CardSection>
//             <CardWrapper>
//               <Card
//                 products={products}
//                 category={category}
//                 searchResults={searchResults}
//               />
//             </CardWrapper>
//           </CardSection>
//         </ContentWrapper>

//         {/* PageComponent로 페이지네이션 사용 */}
//         <PaginationWrapper>
//           <PageComponent
//             pageInfo={{ page: currentPage }} // 현재 페이지 정보 전달
//             totalPages={totalPages} // 총 페이지 수 전달
//             onPageChange={handlePageChange} // 페이지 변경 함수 전달
//             onPrev={() => handlePageChange(currentPage - 1)} // 이전 버튼
//             onNext={() => handlePageChange(currentPage + 1)} // 다음 버튼
//           />
//         </PaginationWrapper>
//       </MainContentWrapper>
//     </PageContainer>
//   );
// }

// export default ShopPage;

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

// // 페이지네이션 스타일 정의
// const PaginationWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 10px;
//   margin-top: 20px;

//   button {
//     padding: 5px 10px;
//     background-color: #007bff;
//     color: white;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
//   }

//   .active {
//     background-color: #0056b3;
//   }
// `;

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

    /* 호버 시 색상 변화 */
    &:hover {
      background-color: #d64229; /* 호버 시 어두운 주황색으로 변경 */
    }

    /* 비활성 버튼 색상 */
    &:disabled {
      background-color: gray; /* 비활성 버튼 색상 */
      cursor: not-allowed; /* 비활성 버튼 시 커서 모양 변경 */
    }
  }

  .active {
    background-color: #0056b3; /* 활성화된 페이지의 배경색 */
  }
`;
