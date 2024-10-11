import React, { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductInfo = ({ productId }) => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  // 상품 정보 가져오기
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8181/shop/findOne/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error("상품 정보를 불러오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>상품 정보를 불러오는 중입니다...</div>;
  }

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalPrice = quantity * product.price;

  const handlePurchase = async () => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (accessToken) {
      console.log("Access Token found:", accessToken);
      try {
        // 로그인된 경우 사용자 정보 가져오기
        const userResponse = await axios.get("http://localhost:8181/member/myPage", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });        
  
        const userData = userResponse.data;
        console.log("User Data:", userData);
  
        // 결제 페이지로 이동하며 사용자 정보 전달
        navigate("/checkout", {
          state: {
            name: product.name,
            price: product.price,
            totalPrice: totalPrice,
            userName: userData.name,
            userEmail: userData.email,
            userAddress: userData.address,
            userPhone: userData.phone,
          },
        });
      } catch (error) {
        console.error("사용자 정보를 불러오는 중 오류 발생:", error);
        alert("사용자 정보를 불러오지 못했습니다. 다시 시도해 주세요.");
      }
    } else {
      alert("로그인이 필요합니다.");
      navigate("/SignIn?redirect=/checkout", {
        state: {
          name: product.name,
          price: product.price,
          totalPrice: totalPrice,
        },
      });
    }
  };
  
  return (
    <TopSection className="flex flex-row justify-between">
      <LeftSection className="flex flex-column align-start">
        <img src={product.imageUrl || "https://img.biteme.co.kr/product/750/2308ae4a580a9e017ad5b07084b8cc51.jpg"} alt={product.name} />
      </LeftSection>

      <RightSection className="flex flex-column align-start justify-center">
        <Typography variant="h5" style={{ marginTop: "16px" }}>
          {product.name}
        </Typography>

        <Typography variant="body1" style={{ marginTop: "4px", color: "red", fontSize: "24px" }}>
          판매가: {product.price.toLocaleString()}원
        </Typography>

        <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
          <QuantityContainer>
            <Button onClick={handleDecrement} variant="outlined" size="small">
              -
            </Button>
            <Typography variant="body1" style={{ margin: "0 8px" }}>
              {quantity}
            </Typography>
            <Button onClick={handleIncrement} variant="outlined" size="small">
              +
            </Button>
          </QuantityContainer>

          <div style={{ marginLeft: "16px" }}>
            <Typography variant="body2">총 상품 금액</Typography>
            <TotalAmount>{totalPrice.toLocaleString()}원</TotalAmount>
          </div>
        </div>

        <Typography variant="body2" style={{ marginTop: "16px" }}>
          무료배송 (30,000원 이상 구매 시)
        </Typography>

        <ButtonSection>
          <Button variant="contained" sx={{ marginRight: 1 }} startIcon={<FavoriteBorderIcon />}>
            장바구니 담기
          </Button>
          <Button variant="contained" color="primary" startIcon={<ShareIcon />} onClick={handlePurchase}>
            바로구매
          </Button>
        </ButtonSection>
      </RightSection>
    </TopSection>
  );
};

// 스타일 정의
const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  gap: 32px;
`;

const LeftSection = styled.div`
  flex: 2;
  margin-right: 16px;
`;

const RightSection = styled.div`
  flex: 1;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 120px;
`;

const TotalAmount = styled.span`
  font-size: 24px;
  font-weight: bold;
  margin-top: 4px;
`;

const ButtonSection = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 16px;
`;

export default ProductInfo;
