import React, { useEffect, useState } from "react";
import styled from "styled-components";
import apiClient from "../token/AxiosConfig";
import Sidebar from "./Shop/SideBar";
import logo from "../static/newLogoverticalOrange.png";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      const response = await apiClient.get("cart/findAll");
      if (response.data.length === 0) {
        setCartItems([]);
      } else {
        const groupedItems = response.data.reduce((acc, item) => {
          const existingItem = acc.find((i) => i.shopId === item.shopId);
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            acc.push({ ...item, quantity: 1 });
          }
          return acc;
        }, []);
        setCartItems(groupedItems);
        calculateTotalPrice(groupedItems);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => {
      return acc + item.shopPrice * item.quantity;
    }, 0);
    setTotalPrice(total);
  };

  const updateQuantity = async (shopId, delta) => {
    const updatedItems = cartItems.map((item) => {
      if (item.shopId === shopId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedItems);
    calculateTotalPrice(updatedItems);

    const cartItemToUpdate = updatedItems.find(
      (item) => item.shopId === shopId
    );
    if (cartItemToUpdate) {
      await apiClient.put(`/cart/update/${cartItemToUpdate.cartId}`, {
        quantity: cartItemToUpdate.quantity,
      });
    }
  };

  const handleRemoveItem = async (cartId) => {
    try {
      await apiClient.delete(`cart/remove`, { params: { cartId: cartId } });
      alert("장바구니에서 상품이 삭제되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handlePurchase = () => {
    const productNames = cartItems.map((item) => ({
      name: item.shopName,
      productPrice: item.shopPrice,
      quantity: item.quantity,
      totalAmount: item.shopPrice * item.quantity,
      shopId: item.shopId,
    }));

    navigate("/Checkout", {
      state: {
        isFunding: false,
        productNames,
        totalAmount: totalPrice + 3000,
      },
    });
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>
        <DetailContentWrapper>
          <StyledWrapper>
            <div className="card">
              <div className="header">
                <h2 className="title">장바구니</h2>
              </div>
              <div className="content">
                <div className="left-section">
                {cartItems.length === 0 ? (
                  <div className="empty-cart" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "500px" }}>
                    <p className="p-2" style={{ fontSize: "20px", color: "#555", marginBottom: "20px", textAlign: "center" }}>
                      장바구니에 담긴 상품이 없습니다. 필요한 상품을 쇼핑몰에서 찾아보세요!
                    </p>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ backgroundColor: "#ff7043", fontSize: "16px", padding: "10px 20px" }}
                      onClick={() => navigate("/shop")}
                    >
                      쇼핑하러 가기 →
                    </Button>
                  </div>
                  ) : (
                  cartItems.map((item) => (
                    <div className="product" key={item.shopId}>
                      <img
                        src={logo}
                        alt="상품 이미지 대체 로고"
                        style={{ height: "80px", width: "80px" }}
                      />
                      <div className="product-details">
                        <span>{item.shopName}</span>
                        <p className="price">
                          {(item.shopPrice * item.quantity).toLocaleString()}원
                        </p>
                      </div>
                      <div className="quantity">
                        <button onClick={() => updateQuantity(item.shopId, -1)}>
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            height="14"
                            width="14"
                          >
                          <path
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth={2.5}
                            stroke="#47484b"
                            d="M20 12L4 12"
                          />
                        </svg>
                      </button>
                      <label>{item.quantity}</label>
                      <button onClick={() => updateQuantity(item.shopId, 1)}>
                        <svg
                          fill="none"
                          viewBox="0 0 24 24"
                          height="14"
                          width="14"
                        >
                          <path
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth={2.5}
                            stroke="#47484b"
                            d="M12 4V20M20 12H4"
                          />
                        </svg>
                      </button>
                    </div>
                    <CloseIcon
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        top: "10px",
                        right: "1px",
                      }}
                      onClick={() => handleRemoveItem(item.cartId)}
                    />
                  </div>
                ))
              )}

                </div>
                {cartItems.length > 0 && (
                  <div className="right-section">
                    <div className="checkout">
                      <label className="title">주문 예상 금액</label>
                      <div className="details">
                        <span>총 상품 가격</span>
                        <span>{totalPrice.toLocaleString()}원</span>
                        <span>총 할인</span>
                        <span>- 0원</span>
                        <span>총 배송비</span>
                        <span>+ 3000원</span>
                      </div>
                      <div className="checkout--footer">
                        <label>합계</label>
                        <span>{(totalPrice + 3000).toLocaleString()}원</span>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handlePurchase}
                        >
                          결제하기
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </StyledWrapper>
        </DetailContentWrapper>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Cart;

// 스타일 정의
const PageContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  padding: 20px;
  gap: 40px; /* 사이드바와 메인 콘텐츠 사이의 간격 */
  margin-top: 150px; /* NavBar와의 간격을 추가 */
`;

const SidebarContainer = styled.div`
  flex: 0 0 250px; /* 사이드바의 고정 너비 설정 */
`;

const DetailContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const StyledWrapper = styled.div`
  .card {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    margin-bottom: 20px;
    background: #ffffff;
    padding: 20px;
    box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01),
      0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09),
      0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    height: 600px; /* 원하는 높이값을 지정 */
  }

  .header {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }

  .title {
    font-size: 26px;
    font-weight: bold;
  }

  .content {
    display: flex;
    width: 100%;
  }

  .left-section {
    flex: 2;
    padding-right: 20px;
  }

  .right-section {
    flex: 1.5;
  }

  .product {
    position: relative;
    display: grid;
    grid-template-columns: 80px 2fr 1fr;
    gap: 10px;
    padding: 15px 0;
    border-bottom: 1px solid #efefef;
  }

  .product img {
    height: 80px;
    width: 80px;
  }

  .product-details {
    display: flex;
    flex-direction: column;
  }

  .price {
    font-size: 17px;
    font-weight: 600;
    color: #333;
  }

  .quantity {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
  }

  .checkout {
    padding: 30px;
    background-color: #f7f7f7;
    border-radius: 10px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  }

  .checkout .details {
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 15px 0;
    gap: 5px;
  }

  .checkout .details span {
    font-size: 22px;
    font-weight: 600;
  }

  .checkout--footer {
    display: flex;
    justify-content: space-between;
    padding: 15px 20px;
    background-color: #efeff3;
    border-radius: 8px;
  }
`;
