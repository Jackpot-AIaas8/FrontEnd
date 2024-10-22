import React from "react";
import styled from "styled-components";

const OrderDetails = ({ orderData }) => {
  // 받는 사람 정보는 첫 번째 아이템에서 가져옵니다.
  const receiver = orderData[0];
    console.log(receiver);

  return (
    <DetailsContainer>
      <h2>주문 상세</h2>
      <OrderHeader>
        <h3>주문 번호: {receiver.orderId}</h3>
        <h4>주문 날짜: {receiver.orderDate}</h4>
      </OrderHeader>
      <Section>
        <h3>받는 사람 정보</h3>
        <p>이름: {receiver.name}</p>
        <p>연락처: {receiver.phone}</p>
        <p>주소: {receiver.address}</p>
      </Section>
      <Section>
        <h3>상품 정보</h3>
        {orderData.map((product) => (
          <ProductDetail key={product.id}>
            <p>상품명: {product.shopName}</p>
            <p>수량: {product.quantity}</p>
            <p>가격: {product.shopPrice}원</p>
          </ProductDetail>
        ))}
      </Section>
      <Section>
        <h3>결제 정보</h3>
        <p>총 결제 금액: {receiver.shopPrice * receiver.quantity}원</p>
      </Section>
    </DetailsContainer>
  );
};

const DetailsContainer = styled.div`
  padding: 20px;
  background: #f9f9f9;
  margin-top: 20px;
`;

const OrderHeader = styled.div`
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const ProductDetail = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
`;

export default OrderDetails;
