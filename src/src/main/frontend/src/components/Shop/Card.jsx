import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Card = ({ category, searchResults }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState("latest");
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 12;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sortOrderFromUrl = queryParams.get("sortOrder");
    const pageFromUrl = queryParams.get("page");

    if (sortOrderFromUrl) {
      setSortOrder(sortOrderFromUrl);
    }

    if (pageFromUrl) {
      setCurrentPage(parseInt(pageFromUrl));
    }
  }, [location]);

  const updateUrlParams = (sortOrder, page) => {
    const queryParams = new URLSearchParams();

    if (category !== null) queryParams.set("category", category);
    if (sortOrder) queryParams.set("sortOrder", sortOrder);
    if (page) queryParams.set("page", page);

    navigate({
      search: queryParams.toString(),
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let response;
        if (category !== null) {
          response = await axios.get(
            `http://localhost:8181/shop/category/${category}`,
            {
              params: { page: currentPage, size: itemsPerPage, sortOrder: sortOrder },
            }
          );
        } else {
          response = await axios.get("http://localhost:8181/shop/findList", {
            params: { page: currentPage, size: itemsPerPage, sortOrder: sortOrder },
          });
        }

        if (Array.isArray(response.data.dtoList)) {
          setProducts(response.data.dtoList);
        } else {
          setProducts([]);
        }

        setTotalPages(Math.ceil(response.data.total / itemsPerPage));
      } catch (error) {
        console.error("상품 데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category, searchResults, currentPage, sortOrder]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    updateUrlParams(sortOrder, newPage);
  };

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    updateUrlParams(newSortOrder, currentPage);
  };

  const handleProductClick = (shopId) => {
    navigate(`/shop/${shopId}`);
  };

  if (isLoading) {
    return null;
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
        {products.map((product, index) => (
          <div
            className="card"
            key={index}
            onClick={() => handleProductClick(product.shopId)}
          >
            <div className="image-container">
              <img src={product.imageUrl || "기본이미지경로"} alt={product.name} />
            </div>
            <div className="card-content">
              <h3>{product.name}</h3>
              <p>{product.detail}</p>
              <p className="price">{product.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>
        )}
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={currentPage === pageNumber ? "active" : ""}
            >
              {pageNumber}
            </button>
          );
        })}
        {currentPage < totalPages && (
          <button onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;

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
    gap: 50px;

    @media (max-width: 1200px) {
      grid-template-columns: repeat(3, 1fr); /* 3열 */
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(3, 1fr); /* 3열 */
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
    width: 300px; /* 고정된 카드 크기 */
    height: 400px;
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

  /* 페이지네이션 스타일 */
  .pagination {
    display: flex;
    justify-content: center; /* 버튼을 수평 중앙으로 정렬 */
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    width: 100%; /* 부모 컨테이너의 너비 */
    text-align: center; /* 중앙 정렬 */
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
