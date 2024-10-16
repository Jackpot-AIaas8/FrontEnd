import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import styled from "styled-components";

export function SuccessPage() {
  const [searchParams] = useSearchParams();
  const location = useLocation(); // CheckoutPage에서 넘어온 state를 받음
  const navigate = useNavigate();
  const [isConfirming, setIsConfirming] = useState(true);

  // location.state로 받은 데이터 출력
  useEffect(() => {
    console.log("location.state:", location.state);
  }, [location.state]);

  // searchParams로 받은 데이터 출력
  useEffect(() => {
    console.log("searchParams:", {
      orderId: searchParams.get("orderId"),
      amount: searchParams.get("amount"),
      paymentKey: searchParams.get("paymentKey"),
    });
  }, [searchParams]);

  const {
    orderName = "",
    quantity = 1,
    customerName = "",
    customerMobilePhone = "",
    userAddress = "",
    totalPrice = 0,
    deliveryFee = 3000,
    amount = 0,
  } = location.state || {};

  useEffect(() => {
    // 결제 확인 요청을 서버로 보냄
    const requestData = {
      orderId: searchParams.get("orderId"),
      amount: searchParams.get("amount"),
      paymentKey: searchParams.get("paymentKey"),
    };

    console.log("결제 확인 요청 데이터:", requestData); // 확인용 로그 추가

    async function confirm() {
      try {
        const response = await fetch("http://localhost:8181/api/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        const json = await response.json();

        console.log("결제 확인 응답 데이터:", json); // 응답 데이터 로그 출력

        if (!response.ok) {
          navigate(`/fail?message=${json.message}&code=${json.code}`);
          return;
        }

        // 결제 성공 후 확인 처리
        setIsConfirming(false);
      } catch (error) {
        console.error("결제 확인 중 오류 발생:", error);
        setIsConfirming(false);
      }
    }

    confirm();
  }, [searchParams, navigate]);

  if (isConfirming) {
    return <div>결제 확인 중...</div>; // 결제 확인 중 표시
  }

  return (
    <PageContainer>
      <h2>결제 성공</h2>
      <p>{`주문번호: ${searchParams.get("orderId")}`}</p>
      <p>{`결제 금액: ${Number(searchParams.get("amount")).toLocaleString()}원`}</p>
      <p>{`Payment Key: ${searchParams.get("paymentKey")}`}</p>

      <ProductDetails>
        <h3>상품 정보</h3>
        <p>{`상품명: ${orderName || "정보 없음"}`}</p>
        <p>{`수량: ${quantity}개`}</p>
      </ProductDetails>

      <UserDetails>
        <h3>받는 사람 정보</h3>
        <p>{`이름: ${customerName || "정보 없음"}`}</p>
        <p>{`전화번호: ${customerMobilePhone || "정보 없음"}`}</p>
        <p>{`주소: ${userAddress || "정보 없음"}`}</p>
      </UserDetails>

      <PaymentDetails>
        <h3>결제 정보</h3>
        <p>{`총 상품 가격: ${totalPrice.toLocaleString()}원`}</p>
        <p>{`배송비: ${deliveryFee.toLocaleString()}원`}</p>
        <p>{`총 결제 금액: ${amount.toLocaleString()}원`}</p>
      </PaymentDetails>
    </PageContainer>
  );
}

// 스타일 정의
const PageContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  margin-top: 200px;
`;

const ProductDetails = styled.div`
  margin-top: 20px;
  h3 {
    font-size: 18px;
  }
  p {
    font-size: 16px;
    margin: 5px 0;
  }
`;

const UserDetails = styled.div`
  margin-top: 20px;
  h3 {
    font-size: 18px;
  }
  p {
    font-size: 16px;
    margin: 5px 0;
  }
`;

const PaymentDetails = styled.div`
  margin-top: 20px;
  h3 {
    font-size: 18px;
  }
  p {
    font-size: 16px;
    margin: 5px 0;
  }
`;

export default SuccessPage;
