import React, { useEffect, useState } from "react";
import styled from "styled-components";
import apiClient from "../token/AxiosConfig";
import Sidebar from "./Shop/SideBar";
import Grid from "@mui/material/Grid2";
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
        const itemsWithQuantity = response.data.map((item) => ({
          ...item,
          quantity: 1,
        }));
        setCartItems(itemsWithQuantity);
        calculateTotalPrice(itemsWithQuantity);
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

  // x자 표시를 누르면 카트에서 상품이 삭제되는데 여기에 삭제 컨트롤러 메서드 연결됨
  const handleRemoveItem = async (cartId) => {
    try {
      await apiClient.delete(`cart/remove`, { params: { cartId: cartId } });
      // console.log(`${cartId}번 상품이 삭제되었습니다.`);
      alert("장바구니에서 상품이 삭제되었습니다.");
      navigate("/cart"); // 새로고침 대신 카트에서 카트로 이동 안그러면 삭제된게 안없어지는거같음
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const updateQuantity = (id, delta) => {
    const updatedItems = cartItems.map((item) => {
      if (item.cartId === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedItems);
    calculateTotalPrice(updatedItems);
  };

  const removeItem = async (cartId) => {
    try {
      await apiClient.delete(`cart/remove/${cartId}`);
      setCartItems((prevItems) => prevItems.filter((item) => item.cartId !== cartId));
      calculateTotalPrice(cartItems.filter((item) => item.cartId !== cartId));
    } catch (error) {
      console.error("Error removing cart item:", error);
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
    <div className="container">
      <Sidebar />
      <Grid
        container
        style={{ marginTop: "50px", justifyContent: "flex-start" }}
      >
        <Grid size={{ xs: 6, md: 7 }} style={{ marginLeft: "200px" }}>
          <StyledWrapper>
            <div className="master-container">
              {cartItems.length === 0 ? (
                <div className="empty-cart">
                  <p>장바구니에 상품이 없습니다</p>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/shop")}
                  >
                    쇼핑몰로 이동 →
                  </Button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div className="card cart" key={item.cartId}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <label className="title">장바구니 물품</label>
                      <CloseIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRemoveItem(item.cartId)}
                      />
                    </div>
                    <div className="products">
                      <div className="product">
                        <img
                          src={logo}
                          alt="상품 이미지 대체 로고"
                          style={{ height: "80px", width: "80px" }}
                        ></img>
                        <div className="product-details">
                          <span>{item.shopName}</span>
                          <p className="price">
                            {(item.shopPrice * item.quantity).toLocaleString()}원
                          </p>
                        </div>
                        <div className="quantity">
                          <button onClick={() => updateQuantity(item.cartId, -1)}>
                            <svg fill="none" viewBox="0 0 24 24" height="14" width="14">
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
                          <button onClick={() => updateQuantity(item.cartId, 1)}>
                            <svg fill="none" viewBox="0 0 24 24" height="14" width="14">
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
                        <Button
                          variant="text"
                          color="secondary"
                          onClick={() => removeItem(item.cartId)}
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                          }}
                        >
                          삭제
                        </Button>
                      </div>
                    ))
                  )}
                </div>
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
                      <Button variant="contained" color="primary" onClick={handlePurchase}>
                        결제하기
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </StyledWrapper>
        </Grid>
        {cartItems.length > 0 && (
          <Grid size={{ xs: 4, md: 3 }} sx={{ margin: 10 }}>
            <StyledWrapper>
              <div className="card checkout">
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
            </StyledWrapper>
          </Grid>
        )}

      </Grid>
    </div>
  );
};

export default Cart;

const StyledWrapper = styled.div`
  .master-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    
  }

  .card {
    display: flex;
    flex-direction: column;
    width: 90%; /* 박스의 너비를 늘림 */
    margin-bottom: 20px;
    background: #ffffff;
    padding: 20px;
    box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01),
      0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09),
      0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
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
    flex: 2; /* 왼쪽 섹션의 비율 */
    padding-right: 20px;
  }

  .right-section {
    flex: 1; /* 오른쪽 섹션의 비율 */
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
