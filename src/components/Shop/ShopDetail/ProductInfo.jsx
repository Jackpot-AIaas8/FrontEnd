import React, { useState, useEffect } from "react";
import { Typography, Button, Popover, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import apiNoToken from "../../../token/AxiosConfig";
import apiClient from "../../../token/AxiosConfig";

const ProductInfo = ({ productId }) => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  // 상품 정보 가져오기
  const fetchProduct = async () => {
    try {
      const response = await apiNoToken.get(`/shop/findOne/${productId}`);
      setProduct(response.data);
      console.log("상품 정보:", response.data); // 데이터 확인

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

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => quantity > 1 && setQuantity(quantity - 1);
  const totalPrice = quantity * product.price;

  const handleAddToCart = async (event) => {
    setAnchorEl(event.currentTarget);
    setErrorMessage(null);

    try {

      const cartResponse = await apiClient.get("cart/findAll");
      const existingItem = cartResponse.data.find(item => item.shopId === product.shopId);

      if (existingItem) {
        await apiClient.put(`/cart/update/${existingItem.cartId}`, {
          quantity: existingItem.quantity + quantity
        });
      } else {
        await apiClient.post('/cart/register', {
          shopId: product.shopId,
          quantity: quantity,
          totalPrice: totalPrice
        });
      }

      console.log('장바구니 상태:', {

        shopId: product.shopId,
        quantity: quantity,
        totalPrice: totalPrice,
      });


    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("로그인을 해야 사용할 수 있습니다.");
      } else {
        console.error("장바구니 등록 중 오류 발생:", error);
      }
    }

    setTimeout(() => {
      setAnchorEl(null);
    }, 5000);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleBuyNow = () => {
    navigate("/Checkout", {
      state: {
        isFunding: false,
        productNames: [{
          shopId: product.shopId,
          name: product.name,
          productPrice: product.price,
          quantity: quantity,
          totalAmount: totalPrice,
        }],
        totalAmount: totalPrice + 3000,

      },
    });
  };

  const handleGoToCart = () => {
    navigate("/cart");
    handleClose();
  };

  return (
    <>
      <TopSection>
        <LeftSection>
          <img
            src={
              product.imageUrl ||
              "https://img.biteme.co.kr/product/750/2308ae4a580a9e017ad5b07084b8cc51.jpg"
            }
            alt={product.name}
          />
        </LeftSection>

        <RightSection>
          <Typography variant="h5" style={{ marginTop: "16px" }}>{product.name}</Typography>
          <Typography variant="body1" style={{ marginTop: "4px", color: "red", fontSize: "24px" }}>

            판매가: {product.price.toLocaleString()}원
          </Typography>

          <div
            style={{ display: "flex", alignItems: "center", marginTop: "16px" }}
          >
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

          <ButtonSection>
            <StyledButton 
              variant="contained" 
              startIcon={<FavoriteBorderIcon />} 
              onClick={handleAddToCart}

            >
              장바구니 담기
            </StyledButton>
            <StyledButton
              variant="contained"
              color="primary"
              startIcon={<ShareIcon />}
              onClick={handleBuyNow}
            >
              바로구매
            </StyledButton>
          </ButtonSection>
        </RightSection>
      </TopSection>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          style: { marginTop: '10px' },

        }}
      >
        <PopoverContent>
          <IconButton
            style={{ position: "absolute", top: "4px", right: "4px" }}
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          <Typography
            variant="body2"
            style={{ fontSize: "12px", paddingTop: "16px" }}
          >
            {errorMessage || "상품이 장바구니에 담겼습니다."}
          </Typography>
          {!errorMessage && (
            <StyledButton
              variant="contained"
              onClick={handleGoToCart}
              color="primary"
              style={{ marginTop: "8px", fontSize: "12px" }}
            >
              장바구니 바로가기
            </StyledButton>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ProductInfo;

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

const PopoverContent = styled.div`
  padding: 16px;
  position: relative;
  width: 150px;
  text-align: center;
  border-radius: 10px;
  background: #f9f9f9;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;

const StyledButton = styled(Button)`
  font-size: 12px;
  padding: 4px 8px;
  background-color: #ffa150 !important;
  &:hover {
    background-color: #ff7600 !important;
  }
`;
