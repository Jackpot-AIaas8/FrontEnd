import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import apiNoToken from "../../token/AxiosConfig"; // apiNoToken을 import

const Card = ({ category, searchResults }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState("latest");
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 12;

  // URL의 쿼리 파라미터를 읽어와 정렬 순서와 페이지를 설정합니다.
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sortOrderFromUrl = queryParams.get("sortOrder");
    const pageFromUrl = queryParams.get("page");

    if (sortOrderFromUrl) setSortOrder(sortOrderFromUrl);
    if (pageFromUrl) setCurrentPage(parseInt(pageFromUrl, 10));
  }, [location]);

  // URL 파라미터를 업데이트하여 정렬 순서 및 페이지를 관리합니다.
  const updateUrlParams = (sortOrder, page) => {
    const queryParams = new URLSearchParams();

    if (category !== null) queryParams.set("category", category);
    if (sortOrder) queryParams.set("sortOrder", sortOrder);
    if (page) queryParams.set("page", page);

    navigate({
      search: queryParams.toString(),
    });
  };

  // 상품 데이터를 가져옵니다.
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const endpoint = category
          ? `/shop/category/${category}`
          : "/shop/findList";

        const response = await apiNoToken.get(endpoint, {
          params: {
            page: currentPage,
            size: itemsPerPage,
            sortOrder,
          },
        });

        console.log("API 응답 데이터:", response.data.dtoList); // 여기서 응답 데이터를 확인합니다.


        setProducts(response.data.dtoList || []);
        setTotalPages(Math.ceil(response.data.total / itemsPerPage));
      } catch (error) {
        console.error("상품 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category, currentPage, sortOrder]);

  console.log("현재 products 상태:", products); // 상태 업데이트 후 products 확인


  // 페이지 변경 처리
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    updateUrlParams(sortOrder, newPage);
  };

  // 정렬 순서 변경 처리
  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    updateUrlParams(newSortOrder, currentPage);
  };

  // 상품 클릭 시 상세 페이지로 이동
  const handleProductClick = (shopId) => {
    navigate(`/shop/${shopId}`);
  };

  if (isLoading) {
    return <StyledWrapper>로딩 중...</StyledWrapper>;
  }

  if (products.length === 0) {
    return (
      <StyledWrapper>
        <p className="no-products">해당 카테고리에 상품이 없습니다.</p>
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper>
      <div className="controls">
        <div className="sort-buttons">
          <button
            className={sortOrder === "latest" ? "active" : ""}
            onClick={() => handleSortChange("latest")}
          >
            최신순
          </button>
          <button
            className={sortOrder === "lowToHigh" ? "active" : ""}
            onClick={() => handleSortChange("lowToHigh")}
          >
            낮은 가격순
          </button>
          <button
            className={sortOrder === "highToLow" ? "active" : ""}
            onClick={() => handleSortChange("highToLow")}
          >
            높은 가격순
          </button>
        </div>
      </div>

      <div className="products-container">
        {products.map((product) => (
          <div
            className="card"
            key={product.shopId}
            onClick={() => handleProductClick(product.shopId)}
          >
            <div className="image-container">
            {console.log("Product 이미지 URL:", product.mainImage)} {/* 이미지 URL을 확인 */}
            <img
              src={product.mainImage || "기본이미지경로"}
              alt={product.name}
            />
            </div>
            <div className="card-content">
              <h3>{product.name}</h3>
            <p className="price">{product.price.toLocaleString()}원</p>
            </div>
          </div>
        ))}
      </div>
    </StyledWrapper>
  );
};


// 스타일 정의는 그대로 유지합니다.
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;

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
    width: 300px;
    max-width: 1200px;

    @media (max-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
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

  .pagination {
    display: flex;
    justify-content: center; /* 버튼들을 중앙에 배치 */
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    width: 100%; /* pagination 너비를 100%로 설정 */
  }

  .pagination button {
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .pagination button:hover {
    background-color: #0056b3;
  }

  .pagination .active {
    background-color: #0056b3;
  }
`;

export default Card;
