import React, { useEffect, useState } from "react";
import styled from "styled-components";
import apiClient from "../token/AxiosConfig";
import NavBar from "./Main/NavBar";
import Container from "@mui/material/Container";
import Footer from "./Main/Footer";
import Sidebar from "./Shop/SideBar";
import Grid from "@mui/material/Grid2";
import logo from "../static/newLogoverticalOrange.png";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트 수정
import CloseIcon from "@mui/icons-material/Close";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // 총 금액 상태 추가
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      const response = await apiClient.get("cart/findAll");
      if (response.data.length === 0) {
        setCartItems([]);
      } else {
        // 같은 shopId를 가진 아이템들을 그룹화하여 수량을 합산
        const groupedItems = response.data.reduce((acc, item) => {
          const existingItem = acc.find(i => i.shopId === item.shopId);
          if (existingItem) {
            existingItem.quantity += 1; // 수량 증가
          } else {
            acc.push({ ...item, quantity: 1 }); // 새로운 항목 추가
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
      return acc + item.shopPrice * item.quantity; // 가격과 수량을 곱하여 누적
    }, 0);
    setTotalPrice(total);
  };

  const updateQuantity = async (shopId, delta) => {
    const updatedItems = cartItems.map((item) => {
      if (item.shopId === shopId) { // shopId를 사용하여 수량 업데이트
        const newQuantity = Math.max(1, item.quantity + delta);

        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedItems);
    calculateTotalPrice(updatedItems);

    // 서버에 수량 업데이트 요청
    const cartItemToUpdate = updatedItems.find(item => item.shopId === shopId);
    if (cartItemToUpdate) {
      await apiClient.put(`/cart/update/${cartItemToUpdate.cartId}`, {
        quantity: cartItemToUpdate.quantity,
      });
    }
  };

  const removeItem = async (shopId) => {
    try {
      await apiClient.delete(`cart/remove/${shopId}`);
      setCartItems((prevItems) => prevItems.filter((item) => item.shopId !== shopId));
      calculateTotalPrice(cartItems.filter((item) => item.shopId !== shopId));
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };


  useEffect(() => {
    fetchCartItems();
  }, []);

  // 결제 페이지로 상품 정보 및 총 결제 금액 전달
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
        productNames, // 구매 상품 리스트 전달
        totalAmount: totalPrice + 3000, // 총 결제 금액 (배송비 포함)
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
                          <p>{item.shopId}번 상품</p>
                          <p>{item.shopPrice}원</p>
                        </div>
                        <div className="quantity">
                          <button onClick={() => updateQuantity(item.shopId, -1)}>
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
                          <button onClick={() => updateQuantity(item.shopId, 1)}>
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
                          onClick={() => removeItem(item.shopId)}
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                          }}
                        >
                          삭제
                        </Button>

                      </div>
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
              <div className="card checkout flex-wrap">
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


  .card {
    width: 50%;
    height: auto;
    margin-bottom: 20px;
    background: #ffffff;
    box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01),
      0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09),
      0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  }

  .title {
    width: 100%;
    height: 40px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 20px;
    border-bottom: 1px solid #efeff3;
    font-weight: 700;
    font-size: 20px;
    color: #63656b;
  }

  .cart {
    border-radius: 19px 19px 7px 7px;
  }

  .cart .products {
    display: flex;
    flex-direction: column;
    padding: 10px;
  }

  .cart .products .product {
    display: grid;
    grid-template-columns: 60px 1fr 80px 1fr;
    gap: 10px;
  }

  .cart .products .product span {
    font-size: 13px;
    font-weight: 600;
    color: #47484b;
    margin-bottom: 8px;
    display: block;
  }

  .cart .products .product p {
    font-size: 11px;
    font-weight: 600;
    color: #7a7c81;
  }

  .cart .quantity {
    height: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: auto;
    background-color: #ffffff;
    border: 1px solid #e5e5e5;
    border-radius: 7px;
    filter: drop-shadow(0px 1px 0px #efefef)
      drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  }

  .cart .quantity label {
    width: 20px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 2px;
    font-size: 15px;
    font-weight: 700;
    color: #47484b;
  }

  .cart .quantity button {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    outline: none;
    background-color: transparent;
    padding-bottom: 2px;
  }

  .card .small {
    font-size: 15px;
    margin: 0 0 auto auto;
  }

  .card .small sup {
    font-size: px;
  }

  /* Checkout */
  .checkout {
    border-radius: 9px 9px 19px 19px;
    width: 80%;
    margin-top: -80px;
    margin-left: -300px;
  }

  .checkout .details {
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 60px;
    gap: 5px;
  }

  .checkout .details span {
    font-size: 20px;
    font-weight: 600;
  }

  .checkout .details span:nth-child(odd) {
    font-size: 20px;
    font-weight: 700;
    color: #707175;
    margin: auto auto auto 0;
  }

  .checkout .details span:nth-child(even) {
    font-size: 20px;
    font-weight: 600;
    color: #47484b;
    margin: auto 0 auto auto;
  }

  .checkout .checkout--footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px 10px 20px;
    background-color: #efeff3;
  }

  .price {
    position: relative;
    font-size: 30px;
    color: #2b2b2f;
    font-weight: 900;
  }

  .price sup {
    font-size: 13px;
  }

  .price sub {
    width: fit-content;
    position: absolute;
    font-size: 11px;
    color: #5f5d6b;
    bottom: 5px;
    display: inline-block;
  }

  .checkout .checkout-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 36px;
    background: linear-gradient(180deg, #4480ff 0%, #115dfc 50%, #0550ed 100%);
    box-shadow: 0px 0.5px 0.5px #efefef, 0px 1px 0.5px rgba(239, 239, 239, 0.5);
    border-radius: 7px;
    border: 0;
    outline: none;
    color: #ffffff;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
  }
`;
