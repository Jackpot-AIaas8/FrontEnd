import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import apiNoToken from "../../token/AxiosConfig";

const Card = ({ name }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState("latest");
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 12;

  // URL에서 현재 페이지와 정렬 순서, 선택된 카테고리 가져오기
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sortOrderFromUrl = queryParams.get("sortOrder") || "latest";
    const pageFromUrl = parseInt(queryParams.get("page"), 10) || 1;
    const categoryFromUrl = queryParams.get("category");

    setSortOrder(sortOrderFromUrl);
    setCurrentPage(pageFromUrl);
    fetchProducts(categoryFromUrl || null, pageFromUrl, sortOrderFromUrl);
  }, [location.search]);

  // 상품 목록 가져오기
  const fetchProducts = async (category, page, sortOrder) => {
    setIsLoading(true);
    try {
      let endpoint;
      const params = { page, size: itemsPerPage, sortOrder };

      if (name) {
        endpoint = `/shop/search`;
        params.name = name;
      } else if (category) {
        endpoint = `/shop/category/${category}`;
      } else {
        endpoint = "/shop/findList";
      }

      const response = await apiNoToken.get(endpoint, { params });
      setFetchedProducts(response.data.dtoList || []);
      setTotalPages(Math.ceil(response.data.total / itemsPerPage));
    } catch (error) {
      console.error("상품 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 페이지 변경 처리
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      navigate({ search: `?page=${newPage}&sortOrder=${sortOrder}` }, { replace: true });
    }
  };

  // 상품 클릭 시 상세 페이지로 이동
  const handleProductClick = (shopId) => {
    navigate(`/shop/${shopId}`);
  };

  if (isLoading) {
    return <StyledWrapper>로딩 중...</StyledWrapper>;
  }

  if (fetchedProducts.length === 0) {
    return (
      <StyledWrapper>
        <p className="no-products">해당 이름에 대한 상품이 없습니다.</p>
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper>
      <div className="products-container">
        {fetchedProducts.map((product) => (
          <div
            className="card"
            key={product.shopId}
            onClick={() => handleProductClick(product.shopId)}
          >
            <div className="image-container">
              <img src={product.mainImage || "기본이미지경로"} alt={product.name} />
            </div>
            <div className="card-content">
              <h3>{product.name}</h3>
              <p>{product.price ? product.price.toLocaleString() : "가격 정보 없음"} 원</p>
            </div>
          </div>
        ))}
      </div>

      <PaginationWrapper>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          이전
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          다음
        </button>
      </PaginationWrapper>
    </StyledWrapper>
  );
};

export default Card;



const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  grid-column: 1 / -1; /* 전체 그리드를 차지하게 함 */

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

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  position: relative;

  .controls {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
  }

  .sort-buttons {
    display: flex;
    gap: 10px;
    button {
      padding: 5px 10px;
      font-size: 12px;
      cursor: pointer;
    }
  }

  .products-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 45px;
    width: 100%;
    max-width: 1200px;
    margin-bottom: 20px; /* 카드 리스트 하단 여백 추가 */

    @media (max-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .no-products {
    text-align: center;
    font-size: 18px;
    color: #666;
  }

  .card {
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 266px;
    height: 355px;
    align-items: center;
    transition: transform 0.2s;
    cursor: pointer;
  }

  .card:hover {
    transform: scale(1.05);
  }

  .image-container {
    width: 100%;
    height: 250px;
    background-color: #ddd;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card-content {
    padding: 10px;
    text-align: center;
  }

  .card-content h3 {
    margin: 10px 0;
    font-size: 16px;
  }

  .card-content p {
    margin: 5px 0;
    color: #555;
  }

  .price {
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }
`;

